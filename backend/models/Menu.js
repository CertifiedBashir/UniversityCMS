const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  slug:     { type: String, required: true },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
