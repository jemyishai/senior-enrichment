'use strict';
const db = require('../index');
const Students = require('./students')
const Campuses = require('./campuses')



Students.belongsTo(Campuses)
Campuses.hasMany(Students)

module.exports = db;
