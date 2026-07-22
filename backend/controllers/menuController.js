const Menu = require('../models/Menu');

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ isActive: true }).sort({ order: 1 });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMenus, createMenu, updateMenu, deleteMenu };
