import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = Number.parseInt(req.body.coord_x);
    const coord_y = Number.parseInt(req.body.coord_y);
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (tile.length === 0) {
      res.sendStatus(422);
      return;
    }
    if (coord_x < 0 || coord_x > 11) {
      res.sendStatus(422);
      return;
    }
    if (coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }
    next();
  } catch (err) {
    next();
  }
};

export default {
  browse,
  validate,
};
