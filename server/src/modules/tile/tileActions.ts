import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const tile = {
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };

  const answer = await tileRepository.readByCoordinates(
    tile.coord_x,
    tile.coord_y,
  );
  // put your validation rules here
  if (answer.length === 0) {
    res.sendStatus(422);
  } else {
    next();
  }
};

export default {
  browse,
  validate,
};
