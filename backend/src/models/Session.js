const pool = require('../config/db');

class Session {
  static async create({ user_id, token }) {
    const result = await pool.query(
      `INSERT INTO user_sessions (user_id, token)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, token]
    );
    return result.rows[0];
  }

  static async logout(sessionId) {
    return pool.query(
      `UPDATE user_sessions
       SET logout_time = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [sessionId]
    );
  }
}

module.exports = Session;
