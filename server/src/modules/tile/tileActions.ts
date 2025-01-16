import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const coordinate = { coord_x: req.body.coord_x, coord_y: req.body.coord_y };
    if (
      coordinate.coord_x >= 0 &&
      11 >= coordinate.coord_x &&
      coordinate.coord_y >= 0 &&
      5 >= coordinate.coord_y
    ) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
  validate,
};
