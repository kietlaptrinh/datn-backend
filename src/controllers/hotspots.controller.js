import models from "../models/index.js";

export const createHotspot = async (req, res) => {
  try {
    const { fromPanoramaId, type, toPanoramaId, artifactId, x, y, z, label, instruction, knowledge } = req.body;

    const hs = await models.Hotspot.create({
        fromPanoramaId,
        type,
        toPanoramaId: type === 'nav' ? toPanoramaId : null,
        artifactId: type === 'info' ? artifactId : null,
        x, y, z,
        label,
        instruction: type === 'chat' ? instruction : null,
        knowledge: type === 'chat' ? knowledge : null
    });
    res.status(201).json(hs);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


export const listHotspots = async (req, res) => {
  const list = await models.Hotspot.findAll();
  res.json(list);
};


export const listForPanorama = async (req, res) => {
  const list = await models.Hotspot.findAll({ 
      where: { fromPanoramaId: req.params.panoId },
      include: [
          { model: models.Artifact, as: "artifact" }
      ]
  });
  res.json(list);
};


export const updateHotspot = async (req, res) => {
  const hs = await models.Hotspot.findByPk(req.params.id);
  if (!hs) return res.status(404).json({ error: "Not found" });
  await hs.update(req.body);
  res.json(hs);
};


export const deleteHotspot = async (req, res) => {
  const hs = await models.Hotspot.findByPk(req.params.id);
  if (!hs) return res.status(404).json({ error: "Not found" });
  await hs.destroy();
  res.json({ message: "Hotspot deleted" });
};
