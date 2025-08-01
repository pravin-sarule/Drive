const express = require('express');
const multer = require('multer');
const { uploadFile, uploadFolder, listUserFiles, deleteFile, getUserFiles, createFolder, uploadToFolder,listFolderContents  } = require('../controllers/fileController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// router.post('/upload', authenticateToken, upload.single('file'), uploadFile);
router.post('/upload', authenticateToken,upload.single('files'), uploadFile);
// router.post('/upload-folder', authenticateToken, upload.single('zipFile'), uploadFolder);
router.post(
  '/upload-folder',
  authenticateToken,
  upload.array('files'), // 👈 Accept multiple files named "files"
  uploadFolder
);
router.post('/create-folder', authenticateToken, createFolder);
router.post('/upload-to-folder', authenticateToken, upload.array('files'), uploadToFolder);
router.get('/list', authenticateToken, listFolderContents);
router.get('/', authenticateToken, listUserFiles);
router.delete('/:id', authenticateToken, deleteFile);
router.get('/', authenticateToken, getUserFiles);

module.exports = router;