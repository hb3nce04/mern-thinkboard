import express from "express";
import {
	createNote,
	deleteNote,
	getAllNotes,
	getNoteById,
	updateNote
} from "../controllers/notesController.js";
import { wrapper } from "../utils/wrapper.js";

const router = express.Router();

router.route("/").get(wrapper(getAllNotes)).post(wrapper(createNote));

router
	.route("/:id")
	.get(wrapper(getNoteById))
	.put(wrapper(updateNote))
	.delete(wrapper(deleteNote));

export default router;
