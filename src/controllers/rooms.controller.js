import models from "../models/index.js";

export const createRoom = async (req, res) => {
  try {
    const room = await models.Room.create(req.body);
    res.status(201).json(room);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const listRooms = async (req, res) => {
  const rooms = await models.Room.findAll();
  res.json(rooms);
};

export const getRoom = async (req, res) => {
  const room = await models.Room.findByPk(req.params.id, {
    include: [{ model: models.Panorama, as: "panoramas" }],
  });
  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
};

export const updateRoom = async (req, res) => {
  const room = await models.Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: "Room not found" });
  await room.update(req.body);
  res.json(room);
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await models.Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    await models.Artifact.destroy({ where: { roomId: room.id } });

    await models.Panorama.destroy({ where: { roomId: room.id } });
    await room.destroy();
    
    res.json({ message: "Đã xóa phòng và toàn bộ dữ liệu bên trong!" });
  } catch (e) {
    console.error("Lỗi xóa phòng:", e);
    res.status(500).json({ error: "Không thể xóa phòng: " + e.message });
  }
};

// Đồ thị di chuyển của 1 Room
export const getRoomGraph = async (req, res) => {
  const pans = await models.Panorama.findAll({
    where: { roomId: req.params.id },
    include: [{ model: models.Hotspot, as: "hotspots" }],
  });
  res.json({ roomId: req.params.id, panoramas: pans });
};
