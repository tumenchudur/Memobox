import { readdir } from "fs/promises";
import path, { join } from "path";
import { sql } from "./postgresql.mjs";

export async function runMigrations() {
  const __dirname = path.resolve(path.dirname(""));

  const migrationsDir = join(__dirname, "migrations");
  const files = await readdir(migrationsDir);
  const sortedFiles = files.sort();

  for (const file of sortedFiles) {
    const migration = await import(join(migrationsDir, file));
    console.log(`Running migration: ${file}`);
    await migration.up(sql);
  }

  console.log("All migrations have been run.");
}

runMigrations().catch((error) => {
  console.error("Error running migrations:", error);
  process.exit(1);
});
