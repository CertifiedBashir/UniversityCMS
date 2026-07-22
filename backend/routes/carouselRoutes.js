const express = require('express');
const router = express.Router();
const { getCarousel, createSlide, updateSlide, deleteSlide } = require('../controllers/carouselController');

router.get('/', getCarousel);
router.post('/', createSlide);
router.put('/:id', updateSlide);
router.delete('/:id', deleteSlide);

module.exports = router;
