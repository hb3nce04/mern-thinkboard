import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { limiter } from "./config/limiter.js";
import router from "./router.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();

if (process.env.NODE_ENV === "dev") {
	app.use(cors({ origin: "http://localhost:3000" }));
}
app.use(helmet());
app.use(limiter);
app.use(morgan(process.env.NODE_ENV === "prod" ? "combined" : "dev"));
app.use(express.json());

app.use("/api", router);

if (process.env.NODE_ENV === "prod") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

app.use((err, req, res, next) => {
	console.error("Global: " + err.stack);
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
	});
});

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
