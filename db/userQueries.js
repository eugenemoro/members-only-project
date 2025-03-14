const pool = require('./pool');

async function addUser(formBody, password) {
  pool.query(
    'insert into users (username, password, first_name, last_name, membership) values ($1, $2, $3, $4, $5)',
    [formBody.username, password, formBody.firstName, formBody.lastName, false]
  );
}

async function setMembership(id) {
  await pool.query('UPDATE users SET membership = true WHERE user_id = $1', 
    [id]
  );
}

module.exports = {
  addUser,
  setMembership
};
