import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name } = req.body;

  // put your validation rules here

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

export default {
  browse,
  validate,
};
