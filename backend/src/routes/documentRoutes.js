// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const controller = require('../controllers/documentController');

// const upload = multer({ storage: multer.memoryStorage() });

// router.post('/upload', upload.single('file'), controller.uploadDocument);
// router.post('/analyze', controller.analyzeDocument);
// router.post('/chat', controller.chatWithDocument);
// router.post('/save', controller.saveEditedDocument);
// router.get('/download/:document_id/:format', controller.downloadDocument);
// router.get('/chat-history/:document_id', controller.getChatHistory);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/documentController');
const authenticateToken = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticateToken,upload.single('file'), controller.uploadDocument);
router.post('/analyze', authenticateToken,controller.analyzeDocument);
router.post('/chat', authenticateToken,controller.chatWithDocument);
router.post('/save', authenticateToken,controller.saveEditedDocument);
router.get('/download/:document_id/:format',authenticateToken, controller.downloadDocument);
router.get('/chat-history/:document_id', authenticateToken, controller.getChatHistory);

module.exports = router;