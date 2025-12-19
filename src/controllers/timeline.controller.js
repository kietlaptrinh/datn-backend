import models from "../models/index.js";
import { Op } from "sequelize"

export const listEvents = async (req, res) => {
  try {
    const events = await models.TimelineEvent.findAll({
      order: [['order', 'ASC']]
    });
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { year, title, description, order } = req.body;
    if (!year || !title || !order) {
        return res.status(400).json({ error: "Vui lòng nhập Năm, Tiêu đề và Số thứ tự!" });
    }
    const orderInt = parseInt(order);

    const existingEvent = await models.TimelineEvent.findOne({ where: { order: orderInt } });
    if (existingEvent) {
        return res.status(400).json({ error: `Số thứ tự ${orderInt} đã tồn tại. Vui lòng chọn số khác!` });
    }
    
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => 
        `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
      );
    }

    const event = await models.TimelineEvent.create({ 
      year, 
      title, 
      description, 
      images: imageUrls, 
      order: orderInt
    });
    
    res.status(201).json(event);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Số thứ tự này đã tồn tại (Lỗi DB)!" });
    }
    res.status(400).json({ error: e.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await models.TimelineEvent.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Not found" });

    const { year, title, description, order } = req.body;

    if (!year || !title || !order) {
        return res.status(400).json({ error: "Vui lòng nhập Năm, Tiêu đề và Số thứ tự!" });
    }
    const orderInt = parseInt(order);
    if (orderInt !== event.order) {
        const duplicateOrder = await models.TimelineEvent.findOne({
            where: {
                order: order,
                id: { [Op.ne]: event.id }
            }
        });

        if (duplicateOrder) {
            return res.status(400).json({ error: `Số thứ tự ${orderInt} đã tồn tại ở sự kiện khác!` });
        }
    }

    let imageUrls = event.images;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => 
        `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
      );
    }

    await event.update({ 
      year, 
      title, 
      description, 
      images: imageUrls, 
      order: orderInt
    });
    
    res.json(event);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Số thứ tự này đã tồn tại!" });
    }
    res.status(500).json({ error: e.message });
  }
};

export const deleteEvent = async (req, res) => {
    try {
        await models.TimelineEvent.destroy({ where: { id: req.params.id } });
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};