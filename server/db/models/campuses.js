const Sequelize = require('sequelize');
const db = require('../index.js');

const images = [
  'http://www.thinkgeek.com/images/products/additional/large/inul_starfleet_capri_yoga_pants_detail.jpg',
  'http://www.ex-astris-scientia.org/inconsistencies/starfleet_buildings/starfleet-academy-2377-intheflesh.jpg',
  'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

module.exports = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:  function () {
      return getRandomImage();
    }
  },
  description: {
    type: Sequelize.TEXT
  }
});
