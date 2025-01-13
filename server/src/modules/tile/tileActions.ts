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

const validate: RequestHandler = async (req, res, next) => {
  try {
    const tile_coord_x = req.body.coord_x;
    const tile_coord_y = req.body.coord_y;

    tile_coord_x >= 0 &&
    tile_coord_x <= 11 &&
    tile_coord_y >= 0 &&
    tile_coord_y <= 5
      ? // put your validation rules here
        next()
      : res.sendStatus(422);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
