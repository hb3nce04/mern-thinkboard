import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const wrapper = (func) => {
	return async (req, res, next) => {
		try {
			await func(req, res, next);
		} catch (error) {
			console.error("Wrapper: ", error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		}
	};
};
