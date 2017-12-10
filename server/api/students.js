
var express = require('express');
var router = express.Router();
var Students = require('../db/models/students.js');
var Campus = require('../db/models/campuses.js');

router.param('studentId', function (req,res,next,id){
  Students.findById(id)
    .then(student =>{
      if (!student) {
        const error = new Error('Not a cadet ... yet')
        error.status = 404;
        throw error;
      } else {
        //req.student now stores the studentId!!
        req.student = student;
        next()
      }
    })
    .catch(next)
})

router.get('/', function (req, res, next) {
  Students.findAll({
    include: [{model: Campus}]
  })
  .then(student => res.json(student))
  .catch(next)
})

router.get('/:studentId', function (req, res){
  res.json(req.student);
})

router.post('/', function (req, res, next){
  Students.create(req.body)
    .then(student => res.json(student))
    .catch(next)
})

router.put('/:studentId', function (req, res, next){
  req.student.update(req.body)
  .then(updatedstudent => {
    res.json(updatedstudent)
  })
})

router.delete('/:studentId', function (req, res, next){
  req.student.destroy()
    .then( () => res.sendStatus(204))
    .catch(next)
})

module.exports = router;
