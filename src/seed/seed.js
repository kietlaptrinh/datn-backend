import { sequelize } from "../models/index.js";
import models from "../models/index.js";

await sequelize.sync({ force: true });

const room = await models.Room.create({ name: "Gallery A", floor: 1 });

const p1 = await models.Panorama.create({
  roomId: room.id,
  title: "View 1",
  imageUrl: "http://localhost:4000/uploads/pano1.jpg",
  camY: 0, camZ: 0,
});

const p2 = await models.Panorama.create({
  roomId: room.id,
  title: "View 2",
  imageUrl: "http://localhost:4000/uploads/pano2.jpg",
});

await models.Hotspot.bulkCreate([
  { fromPanoramaId: p1.id, toPanoramaId: p2.id, x: 0, y: -1.499, z: -2.2, label: "Go to View 2" },
  { fromPanoramaId: p2.id, toPanoramaId: p1.id, x: 0.8, y: -1.499, z: -1.8, label: "Back View 1" },
]);

console.log("Seeded.");
process.exit(0);
