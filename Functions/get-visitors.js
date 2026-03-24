const { neon } = require('@neondatabase/serverless');

exports.handler = async function () {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const visitors = await sql`SELECT * FROM visitors ORDER BY visited_at DESC`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitors),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};