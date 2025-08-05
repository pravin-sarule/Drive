


const File = require('../models/File');
const { uploadFileToGCS, checkStorageLimit, getSignedUrlForFile } = require('../utils/storage');
const { bucket } = require('../config/gcs');
const path = require('path');
const { Readable } = require('stream');
const archiver = require('archiver');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

// Upload single file
const uploadFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { folderPath = '' } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const file = req.file;

    // Check storage limits
    const isAllowed = await checkStorageLimit(userId, file.size);
    if (!isAllowed) {
      return res.status(403).json({ message: 'Storage limit exceeded.' });
    }

    // Clean folder path
    const cleanFolderPath = folderPath ? folderPath.replace(/^\/+|\/+$/g, '') : '';
    
    // Construct GCS path
    const gcsPath = cleanFolderPath 
      ? `${userId}/${cleanFolderPath}/${file.originalname}`
      : `${userId}/${file.originalname}`;

    const blob = bucket.file(gcsPath);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    await new Promise((resolve, reject) => {
      blobStream.on('error', reject);
      blobStream.on('finish', resolve);
      blobStream.end(file.buffer);
    });

    // Save metadata to database
    const savedFile = await File.create({
      user_id: userId,
      originalname: file.originalname,
      gcs_path: gcsPath,
      folder_path: cleanFolderPath || null,
      mimetype: file.mimetype,
      size: file.size,
    });

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile,
    });
  } catch (error) {
    console.error('❌ Error uploading file:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Upload multiple files (folder upload)
const uploadFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { folderPath = '' } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const totalSize = req.files.reduce((acc, file) => acc + file.size, 0);

    const isAllowed = await checkStorageLimit(userId, totalSize);
    if (!isAllowed) {
      return res.status(403).json({ message: 'Storage limit exceeded.' });
    }

    const uploadedFiles = [];
    const cleanBaseFolderPath = folderPath ? folderPath.replace(/^\/+|\/+$/g, '') : '';

    for (const file of req.files) {
      // Handle webkitRelativePath for folder uploads
      const relativePath = file.webkitRelativePath || file.originalname;
      
      // Construct the full path
      const fullPath = cleanBaseFolderPath 
        ? `${cleanBaseFolderPath}/${relativePath}`
        : relativePath;
      
      const gcsPath = `${userId}/${fullPath}`;
      
      // Extract folder path from the full path
      const fileDir = path.dirname(fullPath);
      const fileFolderPath = fileDir === '.' ? cleanBaseFolderPath : fileDir;

      // Upload to GCS
      const blob = bucket.file(gcsPath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', reject);
        blobStream.on('finish', resolve);
        blobStream.end(file.buffer);
      });

      // Save metadata to DB
      const dbFile = await File.create({
        user_id: userId,
        originalname: path.basename(relativePath),
        gcs_path: gcsPath,
        folder_path: fileFolderPath || null,
        mimetype: file.mimetype,
        size: file.size,
      });

      uploadedFiles.push(dbFile);
    }

    return res.status(201).json({
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('❌ Error uploading folder:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Create a new folder
const createFolder = async (req, res) => {
  try {
    const { folderName, parentPath = '' } = req.body;
    const userId = req.user.id;

    if (!folderName) {
      return res.status(400).json({ message: 'Folder name required.' });
    }

    // Clean paths
    const cleanParentPath = parentPath ? parentPath.replace(/^\/+|\/+$/g, '') : '';
    const cleanFolderName = folderName.replace(/^\/+|\/+$/g, '');
    
    // Construct folder path
    const folderPath = cleanParentPath 
      ? `${cleanParentPath}/${cleanFolderName}`
      : cleanFolderName;
    
    const gcsPath = `${userId}/${folderPath}/`;

    // Create placeholder file in GCS to represent the folder
    const file = bucket.file(gcsPath + '.keep');
    await file.save('', { resumable: false });

    // Save folder metadata to database
    await File.create({
      user_id: userId,
      originalname: cleanFolderName,
      gcs_path: gcsPath,
      folder_path: cleanParentPath || null,
      mimetype: 'folder',
      size: 0,
      is_folder: true,
    });

    return res.status(201).json({ 
      message: 'Folder created successfully', 
      path: folderPath 
    });
  } catch (error) {
    console.error('❌ Error creating folder:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

// List user files with folder structure
const listUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await File.findByUserId(userId);

    // Build folder structure
    const buildFolderStructure = (fileList) => {
      const root = { name: 'root', type: 'folder', children: [] };
      const nodeMap = new Map();
      nodeMap.set('', root);

      // Sort files to process folders first
      const sortedFiles = fileList.sort((a, b) => {
        if (a.is_folder && !b.is_folder) return -1;
        if (!a.is_folder && b.is_folder) return 1;
        return 0;
      });

      sortedFiles.forEach(file => {
        const folderPath = file.folder_path || '';
        let currentNode = root;

        // Navigate to the correct parent folder
        if (folderPath) {
          const pathParts = folderPath.split('/').filter(p => p);
          let currentPath = '';
          
          pathParts.forEach(part => {
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            
            if (!nodeMap.has(currentPath)) {
              const folderNode = {
                name: part,
                type: 'folder',
                folder_path: currentPath,
                children: [],
                documentCount: 0,
                isFolder: true
              };
              currentNode.children.push(folderNode);
              nodeMap.set(currentPath, folderNode);
            }
            currentNode = nodeMap.get(currentPath);
          });
        }

        // Add the file or folder
        if (file.is_folder) {
          const fullPath = folderPath ? `${folderPath}/${file.originalname}` : file.originalname;
          if (!nodeMap.has(fullPath)) {
            const folderNode = {
              id: file.id,
              name: file.originalname,
              type: 'folder',
              folder_path: fullPath,
              children: [],
              documentCount: 0,
              isFolder: true
            };
            currentNode.children.push(folderNode);
            nodeMap.set(fullPath, folderNode);
          }
        } else {
          currentNode.children.push({
            id: file.id,
            name: file.originalname,
            type: 'file',
            gcs_path: file.gcs_path,
            folder_path: file.folder_path,
            mimetype: file.mimetype,
            size: file.size,
            created_at: file.created_at,
            isFolder: false
          });
        }
      });

      // Calculate document counts
      const calculateDocumentCounts = (node) => {
        let count = 0;
        if (node.children) {
          node.children.forEach(child => {
            if (child.type === 'file') {
              count++;
            } else if (child.type === 'folder') {
              count += calculateDocumentCounts(child);
            }
          });
          if (node.type === 'folder') {
            node.documentCount = count;
          }
        }
        return count;
      };

      calculateDocumentCounts(root);
      return root.children;
    };

    // Add signed URLs for files
    const filesWithSignedUrls = await Promise.all(files.map(async (file) => {
      if (!file.is_folder && file.gcs_path) {
        try {
          const signedUrl = await getSignedUrlForFile(file.gcs_path);
          return { ...file, signedUrl };
        } catch (error) {
          console.error('Error generating signed URL:', error);
          return file;
        }
      }
      return file;
    }));

    const structuredFiles = buildFolderStructure(filesWithSignedUrls);

    res.status(200).json(structuredFiles);
  } catch (error) {
    console.error('Error listing user files:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List contents of a specific folder
const listFolderContents = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderPath = req.query.path || '';
    
    // Clean the folder path
    const cleanFolderPath = folderPath.replace(/^\/+|\/+$/g, '');
    
    // Get files from database for this specific folder
    const files = await File.findByUserIdAndFolderPath(userId, cleanFolderPath);
    
    const folderItems = [];

    // Add signed URLs and format response
    for (const file of files) {
      if (file.is_folder) {
        folderItems.push({
          id: file.id,
          name: file.originalname,
          isFolder: true,
          path: cleanFolderPath ? `${cleanFolderPath}/${file.originalname}` : file.originalname,
          size: null,
          type: 'folder',
          url: null
        });
      } else {
        try {
          const signedUrl = await getSignedUrlForFile(file.gcs_path);
          folderItems.push({
            id: file.id,
            name: file.originalname,
            isFolder: false,
            path: file.gcs_path,
            size: file.size,
            type: file.mimetype,
            url: signedUrl,
            created_at: file.created_at
          });
        } catch (error) {
          console.error('Error generating signed URL:', error);
          folderItems.push({
            id: file.id,
            name: file.originalname,
            isFolder: false,
            path: file.gcs_path,
            size: file.size,
            type: file.mimetype,
            url: null,
            created_at: file.created_at
          });
        }
      }
    }

    res.json({
      folderPath: cleanFolderPath,
      items: folderItems,
    });
  } catch (error) {
    console.error('Error listing folder contents:', error);
    res.status(500).json({ message: 'Failed to list folder contents' });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;

    const file = await File.findById(fileId);
    if (!file || file.user_id !== userId) {
      return res.status(404).json({ message: 'File not found or unauthorized' });
    }

    // Delete from GCS
    if (file.gcs_path) {
      try {
        await bucket.file(file.gcs_path).delete();
      } catch (gcsError) {
        console.error('Error deleting from GCS:', gcsError);
        // Continue with database deletion even if GCS deletion fails
      }
    }

    // Delete from database
    await File.delete(fileId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user files (simple list)
const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await File.findByUserId(userId);

    // Filter only actual files (not folders)
    const actualFiles = files.filter(file => !file.is_folder);

    // Generate signed URLs
    const signedFiles = await Promise.all(
      actualFiles.map(async (file) => {
        try {
          const signedUrl = await getSignedUrlForFile(file.gcs_path);
          return {
            id: file.id,
            name: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            created_at: file.created_at,
            folder_path: file.folder_path,
            url: signedUrl,
          };
        } catch (error) {
          console.error('Error generating signed URL:', error);
          return {
            id: file.id,
            name: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            created_at: file.created_at,
            folder_path: file.folder_path,
            url: null,
          };
        }
      })
    );

    return res.status(200).json({ files: signedFiles });
  } catch (error) {
    console.error('Error fetching user files:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Upload files to specific folder
const uploadToFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { folderPath = '' } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const cleanFolderPath = folderPath ? folderPath.replace(/^\/+|\/+$/g, '') : '';
    const uploaded = [];

    for (const file of req.files) {
      const gcsPath = cleanFolderPath 
        ? `${userId}/${cleanFolderPath}/${file.originalname}`
        : `${userId}/${file.originalname}`;

      const blob = bucket.file(gcsPath);
      
      await new Promise((resolve, reject) => {
        const stream = blob.createWriteStream({ 
          resumable: false, 
          metadata: { contentType: file.mimetype } 
        });
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });

      const dbFile = await File.create({
        user_id: userId,
        originalname: file.originalname,
        gcs_path: gcsPath,
        folder_path: cleanFolderPath || null,
        mimetype: file.mimetype,
        size: file.size,
      });

      uploaded.push({ 
        id: dbFile.id,
        name: file.originalname, 
        path: gcsPath,
        folder_path: cleanFolderPath
      });
    }

    res.status(201).json({ 
      message: 'Files uploaded successfully', 
      files: uploaded 
    });
  } catch (error) {
    console.error('❌ Error uploading to folder:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

module.exports = { 
  uploadFile, 
  uploadFolder, 
  listUserFiles, 
  deleteFile, 
  getUserFiles, 
  createFolder,
  uploadToFolder,
  listFolderContents
};

