import { readdir } from "fs/promises";
import path from "path";
import { sql } from "./postgresql.mjs";

export async function runMigrations() {
  const __dirname = path.resolve(path.dirname(""));

  const migrationsDir = path.join(__dirname, "migrations");
  const files = await readdir(migrationsDir);
  const sortedFiles = files.sort();

  try {
    await sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;

    for (const file of sortedFiles) {
      try {
        const migration = await import(path.join(migrationsDir, file));
        console.log(`Running migration: ${file}`);
        await migration.up(sql);
      } catch (error) {
        console.error(`Error running migration ${file}:`, error);
      }
    }

    console.log("All migrations have been run.");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  }
}

runMigrations();
