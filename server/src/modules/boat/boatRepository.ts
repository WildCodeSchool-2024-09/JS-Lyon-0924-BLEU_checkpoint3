import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

type Where = {
  name?: string | null;
};

class BoatRepository {
  async readAll(where: Where = { name: null }) {
    if (where.name != null) {
      const [rows] = await databaseClient.query<Rows>(
        "select boat.id, boat.name, boat.coord_x, boat.coord_y,tile.type, tile.has_treasure from boat join tile on tile.coord_x=boat.coord_x and tile.coord_y=boat.coord_y where boat.name=?",
        [where.name],
      );

      // Return the array of tiles
      return rows as Boat[];
    }
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select boat.id, boat.name, boat.coord_x, boat.coord_y,tile.type, tile.has_treasure from boat join tile on tile.coord_x=boat.coord_x and tile.coord_y=boat.coord_y order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y=? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new BoatRepository();
