import postgres from "postgres";

const sql = postgres("postgres://postgres:password@localhost:5432/memobox", {
  onnotice: (notice) => console.warn(notice),
});

async function checkDatabaseConnection() {
  try {
    await sql`SELECT 1`;
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export { sql, checkDatabaseConnection };
