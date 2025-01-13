import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", boatActions.edit);

import gameActions from "./modules/game/gameActions";

import tileActions from "./modules/tile/tileActions";

router.get("/api/tiles", tileActions.browse);

router.post("/api/games", gameActions.add);

/* ************************************************************************* */

export default router;
