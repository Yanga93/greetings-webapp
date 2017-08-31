// create a route for counter


module.exports = function(models) {

  function timesGreeted(count, cb) {


    models.Person.findOne({
      name: req.param.name
      // count:req.param.counter
    }, function(err, count) {
      if (err) {
        return done(err)
      } else if (count !== null) {

      } else {
        res.render("counter")
      }
    })

  }
  return timesGreeted
};
