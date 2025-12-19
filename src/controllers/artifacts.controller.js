import models from "../models/index.js";

export const createArtifact = async (req, res) => {
  try {
    const { roomId, name, description } = req.body;
    
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
    }

    const artifact = await models.Artifact.create({
      roomId,
      name,
      description,
      imageUrl
    });

    res.status(201).json(artifact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


export const listByRoom = async (req, res) => {
  try {
    const list = await models.Artifact.findAll({ 
      where: { roomId: req.params.roomId },
      order: [['createdAt', 'DESC']]
    });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const getArtifact = async (req, res) => {
  try {
    const artifact = await models.Artifact.findByPk(req.params.id);
    if (!artifact) return res.status(404).json({ error: "Not found" });
    res.json(artifact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteArtifact = async (req, res) => {
    try {
        const item = await models.Artifact.findByPk(req.params.id);
        if(!item) return res.status(404).json({error: "Not found"});
        await item.destroy();
        res.json({message: "Deleted"});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}



export const listAllArtifacts = async (req, res) => {
  try {
    const list = await models.Artifact.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const updateArtifact = async (req, res) => {
  try {
    const artifact = await models.Artifact.findByPk(req.params.id);
    if (!artifact) return res.status(404).json({ error: "Not found" });

    const { name, description } = req.body;
    
    // Giữ nguyên ảnh cũ nếu không upload ảnh mới
    let imageUrl = artifact.imageUrl; 
    
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
    }

    await artifact.update({
      name,
      description,
      imageUrl
    });

    res.json(artifact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};