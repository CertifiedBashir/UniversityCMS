const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  slug:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  content:    { type: String, default: '' },
  isActive:   { type: Boolean, default: true },
  showInMenu: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
