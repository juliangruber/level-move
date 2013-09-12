var level = require('level');
var move = require('./');

var db = level(__dirname + '/db');
move.install(db);

db.put('foo', 'bar', function(err) {
  if (err) throw err;
  db.move('foo', 'yolo', function(err) {
    if (err) throw err;
    db.get('yolo', function(err, value) {
      if (err) throw err;
      console.log('yolo: %s', value);
      // => yolo: bar
    });
  });
});
