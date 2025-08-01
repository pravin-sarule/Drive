const pool = require('../config/db');

class File {
  static async create({ user_id, originalname, gcs_path, folder_path, mimetype, size }) {
    const result = await pool.query(
      `INSERT INTO user_files (user_id, originalname, gcs_path, folder_path, mimetype, size)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, originalname, gcs_path, folder_path, mimetype, size]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query('SELECT * FROM user_files WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM user_files WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM user_files WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getTotalStorageUsed(user_id) {
    const result = await pool.query(
      'SELECT COALESCE(SUM(size), 0) AS total_size FROM user_files WHERE user_id = $1',
      [user_id]
    );
    return parseInt(result.rows[0].total_size, 10);
  }
}

module.exports = File;