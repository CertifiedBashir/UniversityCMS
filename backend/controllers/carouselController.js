const Carousel = require('../models/Carousel');

const getCarousel = async (req, res) => {
  try {
    const slides = await Carousel.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createSlide = async (req, res) => {
  try {
    const slide = await Carousel.create(req.body);
    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSlide = async (req, res) => {
  try {
    const slide = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSlide = async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCarousel, createSlide, updateSlide, deleteSlide };
