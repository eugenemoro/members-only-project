const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query(
    'SELECT * FROM messages INNER JOIN users ON author_id = user_id ORDER BY added ASC'
  );
  return rows;
}

async function addNewMessage(title, message, authorId, date) {
  await pool.query(
    'INSERT INTO messages (title, text, author_id, added) VALUES ($1, $2, $3, $4)',
    [title, message, authorId, date]
  );
}

async function getMessage(id) {
  const { rows } = await pool.query(
    'SELECT * FROM messages INNER JOIN users ON author_id = user_id WHERE messages.id = $1',
    [id]
  );
  return rows[0];
}

async function updateMessage(id, title, message) {
  await pool.query('UPDATE messages SET title = $1, text = $2 WHERE id = $3', [
    title,
    message,
    id,
  ]);
}

async function deleteMessage(id) {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

module.exports = {
  getAllMessages,
  addNewMessage,
  getMessage,
  updateMessage,
  deleteMessage
};
