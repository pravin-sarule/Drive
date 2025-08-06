// const pool = require('../db');

// const DocumentModel = {
//   async saveFileMetadata(userId, originalName, gcsPath, htmlContent) {
//     const res = await pool.query(`
//       INSERT INTO user_files (user_id, original_name, file_path, html_content)
//       VALUES ($1, $2, $3, $4)
//       RETURNING id
//     `, [userId, originalName, gcsPath, htmlContent]);
//     return res.rows[0].id;
//   },

//   async getFileById(documentId) {
//     const res = await pool.query(`SELECT * FROM user_files WHERE id = $1`, [documentId]);
//     return res.rows[0];
//   },

//   async saveEditedVersions(documentId, docxUrl, pdfUrl) {
//     await pool.query(`
//       UPDATE user_files
//       SET edited_docx_path = $1, edited_pdf_path = $2
//       WHERE id = $3
//     `, [docxUrl, pdfUrl, documentId]);
//   },

//   async saveChat(documentId, question, answer) {
//     await pool.query(`
//       INSERT INTO chat_history (document_id, question, answer)
//       VALUES ($1, $2, $3)
//     `, [documentId, question, answer]);
//   },

//   async getChatHistory(documentId) {
//     const res = await pool.query(`
//       SELECT question, answer FROM chat_history
//       WHERE document_id = $1
//     `, [documentId]);
//     return res.rows;
//   }
// };

// module.exports = DocumentModel;

const pool = require('../config/db');

const DocumentModel = {
  async saveFileMetadata(userId, originalname, gcs_path, folder_path, mimetype, size, htmlContent) {
    const res = await pool.query(`
      INSERT INTO user_files (user_id, originalname, gcs_path, folder_path, mimetype, size, html_content)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [userId, originalname, gcs_path, folder_path, mimetype, size, htmlContent]);
    return res.rows[0].id;
  },

  async getFileById(documentId) {
    const res = await pool.query(`SELECT * FROM user_files WHERE id = $1`, [documentId]);
    return res.rows[0];
  },

  async saveEditedVersions(documentId, docxUrl, pdfUrl) {
    await pool.query(`
      UPDATE user_files
      SET edited_docx_path = $1, edited_pdf_path = $2
      WHERE id = $3
    `, [docxUrl, pdfUrl, documentId]);
  },

  async saveChat(documentId, question, answer) {
    await pool.query(`
      INSERT INTO chat_history (document_id, question, answer)
      VALUES ($1, $2, $3)
    `, [documentId, question, answer]);
  },

  async getChatHistory(documentId) {
    const res = await pool.query(`
      SELECT question, answer FROM chat_history
      WHERE document_id = $1
    `, [documentId]);
    return res.rows;
  }
};

module.exports = DocumentModel;