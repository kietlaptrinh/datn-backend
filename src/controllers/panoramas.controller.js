import models from "../models/index.js";

export const createPanorama = async (req, res) => {
  try {
    const { roomId, title, camX, camY, camZ, targetX, targetY, targetZ } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const filePath = req.file.path.replace(/\\/g, "/");
    const imageUrl = `${req.protocol}://${req.get("host")}/${filePath}`;

    const pano = await models.Panorama.create({
      roomId,
      title,
      imageUrl,
      camX,
      camY,
      camZ,
      targetX,
      targetY,
      targetZ,
    });

    res.status(201).json(pano);
  } catch (e) {
    console.error("Error creating panorama:", e);
    res.status(400).json({ error: e.message });
  }
};

export const listPanoramas = async (req, res) => {
  const list = await models.Panorama.findAll({ include: ["hotspots"] });
  res.json(list);
};

export const getPanorama = async (req, res) => {
  const pano = await models.Panorama.findByPk(req.params.id, {
    include: [{ model: models.Hotspot, as: "hotspots" }],
  });
  if (!pano) return res.status(404).json({ error: "Not found" });
  res.json(pano);
};

export const updatePanorama = async (req, res) => {
  const pano = await models.Panorama.findByPk(req.params.id);
  if (!pano) return res.status(404).json({ error: "Not found" });

  if (req.file) {
    req.body.imageUrl = `${process.env.PUBLIC_BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
  }

  if (req.body.isStart === 'true' || req.body.isStart === true) {
      await models.Panorama.update(
        { isStart: false }, 
        { where: {} }
      );
      req.body.isStart = true;
    }

  await pano.update(req.body);
  res.json(pano);
};

export const deletePanorama = async (req, res) => {
  const pano = await models.Panorama.findByPk(req.params.id);
  if (!pano) return res.status(404).json({ error: "Not found" });
  await pano.destroy();
  res.json({ message: "Panorama deleted" });
};

// Lấy danh sách panorama theo Room
export const listByRoom = async (req, res) => {
  const list = await models.Panorama.findAll({ where: { roomId: req.params.roomId } });
  res.json(list);
};
