import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.send(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = Number.parseInt(req.body.coord_x);
    const coord_y = Number.parseInt(req.body.coord_y);

    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (tiles.length) {
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
    res.status(400).json({ err });
  }
};

export default {
  browse,
  validate,
};
