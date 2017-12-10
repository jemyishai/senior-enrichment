var express = require('express');
var router = express.Router();
var Campuses = require('../db/models/campuses.js');

router.param('campusId', function (req,res,next,id){
  Campuses.findById(id)
    .then(campus =>{
      if (!campus) {
        const error = new Error('Not a campus... yet')
        error.status = 404;
        throw error;
      } else {
        //req.campus now stores the campusId!!
        req.campus = campus;
        next()
      }
    })
    .catch(next)
})


router.get('/', function (req, res, next) {
  Campuses.findAll()
  .then(campus => res.json(campus))
  .catch(next)
})

router.get('/:campusId', function (req, res){
  res.json(req.campus);
})

router.post('/', function (req, res, next){
  Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next)
})

router.put('/:campusId', function (req, res, next){
  req.campus.update(req.body)
  .then(updatedCampus => {
    res.json(updatedCampus)
  })
})

router.delete('/:campusId', function (req, res, next){
  req.campus.destroy()
    .then( () => res.sendStatus(204))
    .catch(next)
})

module.exports = router;
