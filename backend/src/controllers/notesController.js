import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
	const notes = await Note.find().sort({ createdAt: -1 });
	res.status(StatusCodes.OK).json(notes);
};

export const getNoteById = async (req, res) => {
	const { id } = req.params;
	const note = await Note.findById(id);
	if (!note) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Note not found" });
	}
	res.status(StatusCodes.OK).json(note);
};

export const createNote = async (req, res) => {
	const { title, content } = req.body;
	const newNote = new Note({
		title: title,
		content: content
	});
	const savedNote = await newNote.save();
	res.status(StatusCodes.CREATED).json(savedNote);
};

export const updateNote = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	const updatedNote = await Note.findByIdAndUpdate(
		id,
		{
			title,
			content
		},
		{ new: true }
	);
	if (!updatedNote) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Note not found" });
	}
	res.status(StatusCodes.OK).json(updatedNote);
};

export const deleteNote = async (req, res) => {
	const { id } = req.params;
	const deletedNote = await Note.findByIdAndDelete(id);
	if (!deletedNote) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Note not found" });
	}
	res.status(StatusCodes.OK).json({
		message: "Note deleted successfully"
	});
};
