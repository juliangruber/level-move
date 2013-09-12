var test = require('tape');
var level = require('level');
var move = require('./');

test('move', function(t) {
  t.plan(4);

  var db = level(__dirname + '/db');
  move.install(db);

  db.put('foo', 'bar', function(err) {
    t.error(err);

    db.move('foo', 'yolo', function(err) {
      t.error(err);

      db.get('yolo', function(err, value) {
        t.error(err);
        t.equal(value, 'bar');
      });
    });
  });
});

