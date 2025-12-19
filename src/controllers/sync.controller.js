import models from "../models/index.js";
import fetch from "node-fetch";

export const syncToAI = async (req, res) => {
  try {
    console.log("Đang lấy dữ liệu từ Postgres...");
    
    // Lấy dữ liệu Artifact kèm tên Room
    const artifacts = await models.Artifact.findAll({
      include: [{ 
          model: models.Room, 
          attributes: ['name'] // Lấy tên phòng để AI biết ngữ cảnh
      }],
      attributes: ['id', 'name', 'description', 'imageUrl']
    });

    // Chuẩn hóa dữ liệu để gửi sang Python
    const payload = artifacts.map(a => ({
      id: a.id,
      name: a.name,
      description: a.description || "Chưa có mô tả",
      imageUrl: a.imageUrl,
      room_name: a.Room ? a.Room.name : "Khu vực chung"
    }));

    //Gọi API Python
    const pythonRes = await fetch("http://localhost:8000/sync-artifacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await pythonRes.json();

    if (pythonRes.ok) {
        res.json({ message: "Đồng bộ thành công!", details: result });
    } else {
        res.status(500).json({ error: "Lỗi Python Server", details: result });
    }

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};