import "dotenv/config";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import userController from "./routes/user.mjs";
import { checkDatabaseConnection } from "./db/postgresql.mjs";
// import { runMigrations } from "./db/migrate.mjs";

const app = express();
const port = process.env.PORT || 3080;

const __dirname = path.resolve(path.dirname(""));
const options = {
  root: path.join(__dirname),
};

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Works fine!");
});
app.post("/api/login", (req, res) => {
  userController.login(req, res);
});
app.post("/api/verify-otp", (req, res) => {
  userController.verifyOtp(req, res);
});

app.listen(port, async () => {
  await checkDatabaseConnection();
  console.log(`App listening on port ${port}`);
});
