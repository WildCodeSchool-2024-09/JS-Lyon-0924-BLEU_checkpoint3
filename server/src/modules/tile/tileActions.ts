import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const doExist = {
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };

  try {
    const tileExist = await tileRepository.readByCoordinates(
      doExist.coord_x,
      doExist.coord_y,
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
