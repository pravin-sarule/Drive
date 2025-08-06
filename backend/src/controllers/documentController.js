

// backend/controllers/documentController.js
const DocumentModel = require('../models/documentModel');
const { uploadToGCS } = require('../../services/gcsService');
const { convertHtmlToDocx, convertHtmlToPdf } = require('../../services/conversionService');
const { askGemini, analyzeWithGemini } = require('../../services/aiService');
const { extractText } = require('../utils/textExtractor');

exports.uploadDocument = async (req, res) => {
  const file = req.file;
  const userId = req.user.id;
  let documentText = await extractText(file.buffer, file.mimetype);
  if (!documentText || typeof documentText !== 'string') {
    documentText = ''; // Ensure it's an empty string if null or invalid
  }

  const { url: gcs_path, path: folder_path } = await uploadToGCS(file.originalname, file.buffer);
  const documentId = await DocumentModel.saveFileMetadata(
    userId,
    file.originalname,
    gcs_path,
    folder_path,
    file.mimetype,
    file.size,
    documentText // Store the extracted plain text
  );

  res.json({ document_id: documentId, html_content: documentText, docx_download_url: gcs_path });
};

exports.analyzeDocument = async (req, res) => {
  const { document_id } = req.body;
  const file = await DocumentModel.getFileById(document_id);
  // Pass the extracted text (stored in html_content column) to Gemini
  const insights = await analyzeWithGemini(file.html_content);
  res.json(insights);
};

exports.chatWithDocument = async (req, res) => {
  const { document_id, question } = req.body;
  const file = await DocumentModel.getFileById(document_id);
  // Pass the extracted text (stored in html_content column) to Gemini
  const answer = await askGemini(file.html_content, question);
  await DocumentModel.saveChat(document_id, question, answer);
  res.json({ answer });
};

exports.saveEditedDocument = async (req, res) => {
  const { document_id, edited_html } = req.body;
  const docxBuffer = await convertHtmlToDocx(edited_html);
  const pdfBuffer = await convertHtmlToPdf(edited_html);
  const { url: docxUrl } = await uploadToGCS(`edited_${document_id}.docx`, docxBuffer, 'edited');
  const { url: pdfUrl } = await uploadToGCS(`edited_${document_id}.pdf`, pdfBuffer, 'edited');
  await DocumentModel.saveEditedVersions(document_id, docxUrl, pdfUrl);
  res.json({ docx_download_url: docxUrl, pdf_download_url: pdfUrl });
};

// exports.downloadDocument = async (req, res) => {
//   const { document_id, format } = req.params;
//   const file = await DocumentModel.getFileById(document_id);

//   // Ensure user owns the file
//   if (file.user_id !== req.user.id) {
//     return res.status(403).json({ error: 'Access denied' });
//   }

//   const url = format === 'docx' ? file.edited_docx_path : file.edited_pdf_path;
//   res.redirect(url);
// };
const { getSignedUrl } = require('../../services/gcsService');

exports.downloadDocument = async (req, res) => {
  const { document_id, format } = req.params;
  const file = await DocumentModel.getFileById(document_id);

  // Ensure user owns the file
  if (file.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Determine GCS path
  const gcsPath = format === 'docx'
    ? file.edited_docx_path?.split('/').slice(-2).join('/')
    : file.edited_pdf_path?.split('/').slice(-2).join('/');

  if (!gcsPath) {
    return res.status(404).json({ error: 'File not found or not yet generated' });
  }

  // Generate new signed URL
  try {
    const signedUrl = await getSignedUrl(gcsPath);
    return res.redirect(signedUrl);
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return res.status(500).json({ error: 'Failed to generate signed download link' });
  }
};

exports.getChatHistory = async (req, res) => {
  const { document_id } = req.params;
  const file = await DocumentModel.getFileById(document_id);

  // Ensure user owns the file
  if (file.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const chats = await DocumentModel.getChatHistory(document_id);
  res.json(chats);
};
