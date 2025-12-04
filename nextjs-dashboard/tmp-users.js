require('dotenv').config({ path: '.env' });
const postgres = require('postgres');
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });
(async () => {
  const users = await sql.unsafe('SELECT id, email, password FROM users');
  console.log(users);
  await sql.end();
})();
