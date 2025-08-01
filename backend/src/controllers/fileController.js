const File = require('../models/File');
const { uploadFileToGCS, checkStorageLimit, getSignedUrlForFile } = require('../utils/storage');
const { bucket } = require('../config/gcs'); // For deleting files from GCS
const path = require('path');
const { Readable } = require('stream');
const archiver = require('archiver'); // For handling zip uploads
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();


// Helper function to recursively upload files from a zip stream
const uploadZipStream = async (userId, zipStream, baseFolderPath = '') => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', reject);

    const filesToProcess = [];

    zipStream.pipe(archive);

    archive.on('entry', (entry) => {
      const entryPath = entry.name;
      if (entry.type === 'file') {
        filesToProcess.push({ entryPath, entry });
      }
    });

    archive.on('end', async () => {
      try {
        for (const { entryPath, entry } of filesToProcess) {
          const folderPath = path.dirname(entryPath);
          const originalname = path.basename(entryPath);

          // Create a buffer from the entry stream
          const chunks = [];
          for await (const chunk of entry) {
            chunks.push(chunk);
          }
          const fileBuffer = Buffer.concat(chunks);

          const isAllowed = await checkStorageLimit(userId, fileBuffer.length);
          if (!isAllowed) {
            throw new Error('Storage limit exceeded for one or more files.');
          }

          await uploadFileToGCS(
            { originalname, buffer: fileBuffer, mimetype: 'application/octet-stream', size: fileBuffer.length },
            userId,
            path.join(baseFolderPath, folderPath)
          );
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    // This is a placeholder. In a real scenario, the zipStream would be the incoming request stream.
    // For now, we'll assume `zipStream` is a readable stream of the zip file content.
    // If `zipStream` is actually `req.file.buffer` for a single zip file, you'd need to adjust.
    // For simplicity, this assumes `zipStream` is already a stream of the zip content.
    // If using multer for zip upload, `req.file.buffer` would be the zip content.
    // You'd then create a Readable stream from it: `Readable.from(req.file.buffer)`.
  });
};


// const uploadFile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { folderPath = '' } = req.body; // Optional folder path for organization

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     const isAllowed = await checkStorageLimit(userId, req.file.size);
//     if (!isAllowed) {
//       return res.status(403).json({ message: 'Storage limit exceeded.' });
//     }

//     const newFile = await uploadFileToGCS(req.file, userId, folderPath);
//     res.status(201).json({ message: 'File uploaded successfully', file: newFile });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// const uploadFolder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { baseFolderPath = '' } = req.body; // Base folder path for the uploaded folder structure

//     if (!req.file || req.file.mimetype !== 'application/zip') {
//       return res.status(400).json({ message: 'Please upload a zip file containing your folder.' });
//     }

//     const zipBuffer = req.file.buffer;
//     const zipStream = Readable.from(zipBuffer);

//     await uploadZipStream(userId, zipStream, baseFolderPath);

//     res.status(201).json({ message: 'Folder (zip) uploaded and extracted successfully.' });
//   } catch (error) {
//     console.error('Error uploading folder:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
// const uploadFile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { folderPath = '' } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     const file = req.file;
//     const isAllowed = await checkStorageLimit(userId, file.size);
//     if (!isAllowed) {
//       return res.status(403).json({ message: 'Storage limit exceeded.' });
//     }

//     // Construct GCS path
//     const gcsPath = `${userId}/${folderPath ? `${folderPath}/` : ''}${file.originalname}`;

//     const blob = bucket.file(gcsPath);
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     await new Promise((resolve, reject) => {
//       blobStream.on('error', reject);
//       blobStream.on('finish', resolve);
//       blobStream.end(file.buffer);
//     });

//     // Save file metadata to DB (example)
//     const newFile = await saveFileMetadataToDB({
//       userId,
//       name: file.originalname,
//       size: file.size,
//       path: gcsPath,
//       mimetype: file.mimetype,
//     });

//     res.status(201).json({ message: 'File uploaded successfully', file: newFile });

//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// const uploadFile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { folderPath = '' } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     const file = req.file;
//     const isAllowed = await checkStorageLimit(userId, file.size);

//     if (!isAllowed) {
//       return res.status(403).json({ message: 'Storage limit exceeded.' });
//     }

//     // Construct GCS path like: "userId/folder/file.pdf"
//     const gcsPath = `${userId}/${folderPath ? `${folderPath}/` : ''}${file.originalname}`;
//     const blob = bucket.file(gcsPath);
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     // Upload file buffer
//     await new Promise((resolve, reject) => {
//       blobStream.on('error', reject);
//       blobStream.on('finish', resolve);
//       blobStream.end(file.buffer);
//     });

//     // Save file metadata to database
//     const savedFile = await saveFileMetadataToDB({
//       userId,
//       name: file.originalname,
//       size: file.size,
//       path: gcsPath,
//       mimetype: file.mimetype,
//     });

//     return res.status(201).json({
//       message: 'File uploaded successfully',
//       file: savedFile,
//     });

//   } catch (error) {
//     console.error('❌ Error uploading file:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name,
//       cause: error.cause || null,
//     });

//     res.status(500).json({
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

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

    // Construct GCS path like: "userId/folder/file.pdf"
    const gcsPath = `${userId}/${folderPath ? `${folderPath}/` : ''}${file.originalname}`;
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

    // ✅ Save metadata using the correct model method
    const savedFile = await File.create({
      user_id: userId,
      originalname: file.originalname,
      gcs_path: gcsPath,
      folder_path: folderPath || null,
      mimetype: file.mimetype,
      size: file.size,
    });

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile,
    });
  } catch (error) {
    console.error('❌ Error uploading file:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause || null,
    });

    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
// const uploadFolder = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded.' });
//     }

//     // Calculate total size of all uploaded files
//     const totalSize = req.files.reduce((acc, file) => acc + file.size, 0);

//     // Check if user is allowed to upload (based on size)
//     const isAllowed = await checkStorageLimit(userId, totalSize);
//     if (!isAllowed) {
//       return res.status(403).json({ message: 'Storage limit exceeded.' });
//     }

//     const uploadedFiles = [];

//     for (const file of req.files) {
//       const relativePath = file.originalname; // includes nested folder like: "project/css/style.css"
//       const gcsPath = `${userId}/${relativePath}`; // Prefix with user ID

//       const blob = bucket.file(gcsPath);
//       const blobStream = blob.createWriteStream({
//         resumable: false,
//         metadata: {
//           contentType: file.mimetype,
//         },
//       });

//       await new Promise((resolve, reject) => {
//         blobStream.on('error', reject);
//         blobStream.on('finish', resolve);
//         blobStream.end(file.buffer);
//       });

//       uploadedFiles.push({
//         name: file.originalname,
//         size: file.size,
//         path: gcsPath,
//         mimetype: file.mimetype,
//       });
//     }

//     res.status(201).json({
//       message: 'Folder and files uploaded successfully to Cloud Storage.',
//       files: uploadedFiles,
//     });
//   } catch (error) {
//     console.error('Error uploading folder:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

const uploadFolder = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const totalSize = req.files.reduce((acc, file) => acc + file.size, 0);

    const isAllowed = await checkStorageLimit(userId, totalSize);
    if (!isAllowed) {
      return res.status(403).json({ message: 'Storage limit exceeded.' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const relativePath = file.originalname; // e.g., "project/css/style.css"
      const gcsPath = `${userId}/${relativePath}`;

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
        originalname: file.originalname,
        gcs_path: gcsPath,
        folder_path: relativePath.substring(0, relativePath.lastIndexOf('/')) || '',
        mimetype: file.mimetype,
        size: file.size,
      });

      uploadedFiles.push(dbFile);
    }

    return res.status(201).json({
      message: 'Folder uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('❌ Error uploading folder:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const listUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await File.findByUserId(userId);

    // Function to build a nested folder structure
    const buildFolderStructure = (fileList) => {
      const root = { name: 'root', type: 'folder', children: [] };
      const nodes = { 'root': root };

      fileList.forEach(file => {
        const parts = file.folder_path ? file.folder_path.split(path.sep).filter(p => p) : [];
        let currentParent = root;
        let currentPath = '';

        parts.forEach(part => {
          currentPath = currentPath ? path.join(currentPath, part) : part;
          if (!nodes[currentPath]) {
            const newNode = { name: part, type: 'folder', children: [] };
            currentParent.children.push(newNode);
            nodes[currentPath] = newNode;
          }
          currentParent = nodes[currentPath];
        });

        currentParent.children.push({
          id: file.id,
          name: file.originalname,
          type: 'file',
          gcs_path: file.gcs_path,
          mimetype: file.mimetype,
          size: file.size,
          created_at: file.created_at,
          signedUrl: file.signedUrl,
        });
      });
      return root.children; // Return children of the root to represent top-level folders/files
    };

    const filesWithSignedUrls = await Promise.all(files.map(async (file) => {
      const signedUrl = await getSignedUrlForFile(file.gcs_path);
      return { ...file, signedUrl };
    }));

    const structuredFiles = buildFolderStructure(filesWithSignedUrls);

    res.status(200).json(structuredFiles);
  } catch (error) {
    console.error('Error listing user files:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;

    const file = await File.findById(fileId);
    if (!file || file.user_id !== userId) {
      return res.status(404).json({ message: 'File not found or unauthorized' });
    }

    // Delete from GCS
    await bucket.file(file.gcs_path).delete();

    // Delete from database
    await File.delete(fileId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// const getUserFiles = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const files = await File.findByUserId(userId);

//     const signedUrls = await Promise.all(
//       files.map(async (file) => {
//         const [url] = await bucket
//           .file(file.gcs_path)
//           .getSignedUrl({
//             action: 'read',
//             expires: Date.now() + 60 * 60 * 1000, // 1 hour
//           });

//         return {
//           id: file.id,
//           name: file.originalname,
//           size: file.size,
//           mimetype: file.mimetype,
//           uploadedAt: file.created_at,
//           url,
//         };
//       })
//     );

//     res.json({ files: signedUrls });
//   } catch (error) {
//     console.error('Error fetching user files:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// const getUserFiles = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const files = await File.findByUserId(userId);

//     // Generate signed URLs for each file (valid for 1 hour)
//     const signedFiles = await Promise.all(
//       files.map(async (file) => {
//         const [url] = await bucket
//           .file(file.gcs_path)
//           .getSignedUrl({
//             action: 'read',
//             expires: Date.now() + 60 * 60 * 1000, // 1 hour
//           });

//         return {
//           id: file.id,
//           name: file.originalname,
//           size: file.size,
//           mimetype: file.mimetype,
//           created_at: file.created_at,
//           url,
//         };
//       })
//     );

//     res.json({ files: signedFiles });
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch files belonging to the authenticated user
    const files = await File.findByUserId(userId); // Ensure this method exists

    // Generate signed URLs (valid for 1 hour)
    const signedFiles = await Promise.all(
      files.map(async (file) => {
        const [signedUrl] = await bucket
          .file(file.gcs_path) // This should be the path within the bucket (e.g., "user123/folder/file.pdf")
          .getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour from now
          });

        return {
          id: file.id,
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          created_at: file.created_at,
          url: signedUrl,
        };
      })
    );

    return res.status(200).json({ files: signedFiles });
  } catch (error) {
    console.error('Error fetching user files:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// const createFolder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { folderPath } = req.body;

//     if (!folderPath) {
//       return res.status(400).json({ message: 'Folder name/path is required.' });
//     }

//     // Ensure the folder path ends with '/'
//     const gcsFolderPath = `${userId}/${folderPath.replace(/\/?$/, '/')}`;

//     const file = bucket.file(gcsFolderPath); // Create a zero-byte object
//     await file.save('', {
//       metadata: { contentType: 'application/x-directory' },
//     });

//     res.status(201).json({ message: 'Folder created successfully', folderPath: gcsFolderPath });
//   } catch (error) {
//     console.error('❌ Error creating folder:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

const createFolder = async (req, res) => {
  const { folderName, parentPath = '' } = req.body;
  const userId = req.user.id;

  if (!folderName) return res.status(400).json({ message: 'Folder name required.' });

  const folderPath = `${userId}/${parentPath}${folderName}/`;

  const file = bucket.file(folderPath);
  await file.save('', { resumable: false }); // create placeholder

  return res.status(201).json({ message: 'Folder created successfully', path: folderPath });
};

// Upload to folder
const uploadToFolder = async (req, res) => {
  const userId = req.user.id;
  const targetFolder = req.body.folderPath || '';

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const uploaded = [];

  for (const file of req.files) {
    const relativePath = file.originalname;
    const gcsPath = `${userId}/${targetFolder}${relativePath}`;
    const blob = bucket.file(gcsPath);

    await new Promise((resolve, reject) => {
      const stream = blob.createWriteStream({ resumable: false, metadata: { contentType: file.mimetype } });
      stream.on('error', reject);
      stream.on('finish', resolve);
      stream.end(file.buffer);
    });

    await File.create({
      user_id: userId,
      originalname: file.originalname,
      gcs_path: gcsPath,
      folder_path: `${targetFolder}`, // so we can fetch files inside a folder
      mimetype: file.mimetype,
      size: file.size,
    });

    uploaded.push({ name: file.originalname, path: gcsPath });
  }

  res.status(201).json({ message: 'Files uploaded successfully', files: uploaded });
};
// // List folder contents
// const listFolderContents = async (req, res) => {
//   const userId = req.user.id;
//   const folderPath = req.query.path || '';

//   const [files] = await bucket.getFiles({ prefix: `${userId}/${folderPath}`, delimiter: '/' });
//   const objects = files.map(f => ({
//     name: f.name.replace(`${userId}/${folderPath}`, ''),
//     url: `https://storage.googleapis.com/${bucket.name}/${f.name}`,
//     size: f.metadata.size,
//     type: f.metadata.contentType,
//     path: f.name,
//     isFolder: f.name.endsWith('/'),
//   }));

//   res.json({ folderPath, items: objects });
// };
const listFolderContents = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderPath = req.query.path || ''; // e.g. 'docs/', 'projects/subfolder/'

    const prefix = `${userId}/${folderPath}`.replace(/\/+$/, '') + '/';

    const [files] = await bucket.getFiles({
      prefix,
      delimiter: '/',
    });

    const folderItems = [];

    // Folders first (prefixes)
    const [fileObjects] = await bucket.getFiles({ prefix });
    const prefixes = new Set();

    fileObjects.forEach((file) => {
      const relativePath = file.name.replace(prefix, '');
      if (relativePath.includes('/')) {
        const subfolder = relativePath.split('/')[0] + '/';
        prefixes.add(subfolder);
      }
    });

    prefixes.forEach((folder) => {
      folderItems.push({
        name: folder.replace(/\/$/, ''),
        isFolder: true,
        path: prefix + folder,
        url: null,
        size: null,
        type: 'folder',
      });
    });

    // Files
    for (const file of files) {
      if (file.name.endsWith('/')) continue; // Skip folders

      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
      });

      folderItems.push({
        name: file.name.replace(prefix, ''),
        isFolder: false,
        path: file.name,
        size: file.metadata.size,
        type: file.metadata.contentType,
        url: signedUrl,
      });
    }

    res.json({
      folderPath: prefix,
      items: folderItems,
    });
  } catch (error) {
    console.error('Error listing folder contents:', error);
    res.status(500).json({ message: 'Failed to list folder contents' });
  }
};

module.exports = { uploadFile, uploadFolder, listUserFiles, deleteFile, getUserFiles , createFolder,uploadToFolder,
  listFolderContents};