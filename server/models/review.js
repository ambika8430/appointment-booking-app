const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pros: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cons: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
},
{
  timestamps: false
});

module.exports = Review;