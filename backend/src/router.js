import express from "express";
import notesRoutes from "./routes/notesRoute.js";

const router = express.Router();

router.use("/notes", notesRoutes);

export default router;
