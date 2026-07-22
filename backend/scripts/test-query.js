const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Carousel = require('../models/Carousel');

async function test() {
  const directUri = 'mongodb://CertifiedBashir:Bash%401032@ac-agwtjsh-shard-00-00.tvsoxqx.mongodb.net:27017,ac-agwtjsh-shard-00-01.tvsoxqx.mongodb.net:27017,ac-agwtjsh-shard-00-02.tvsoxqx.mongodb.net:27017/tazkiyah_cms?replicaSet=atlas-agwtjsh-shard-0&ssl=true&authSource=admin';
  console.log('Connecting to:', directUri);
  await mongoose.connect(directUri);
  console.log('Connected. Querying carousel...');
  const slides = await Carousel.find({});
  console.log('Slides:', slides.length);
  console.log(slides);
  await mongoose.disconnect();
  console.log('Done.');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
