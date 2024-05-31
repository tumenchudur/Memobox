import "dotenv/config";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import userController from "./routes/user.mjs";
import { checkDatabaseConnection } from "./db/postgresql.mjs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = process.env.PORT || 3080;

const __dirname = path.resolve(path.dirname(""));
const options = {
  root: path.join(__dirname),
};

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Memobox ",
      version: "1.0.0",
      description: "API documentation Memobox",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "API Support",
        url: "",
        email: "@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3080/",
      },
    ],
  },
  apis: ["./server.mjs"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: User related operations
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the server is running
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Works fine!
 */
app.get("/", (req, res) => {
  res.send("Works fine!");
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Bad request
 */
app.post("/api/login", (req, res) => {
  userController.login(req, res);
});

/**
 * @swagger
 * /api/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               otp_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP or request
 */
app.post("/api/verify-otp", (req, res) => {
  userController.verifyOtp(req, res);
});

app.listen(port, async () => {
  await checkDatabaseConnection();
  console.log(`App listening on port ${port}`);
});
