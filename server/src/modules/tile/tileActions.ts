import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const allTiles = await tileRepository.readAll();

    res.send(allTiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const existingTile = {
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };

  try {
    const tileExist = await tileRepository.readByCoordinates(
      existingTile.coord_x,
      existingTile.coord_y,
    );

    if (tileExist.length === 0) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
};
