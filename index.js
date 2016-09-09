var lock = require('level-lock');

module.exports = move;
move.install = install;

function move(db, from, to, fn) {
  
  var unlock = lock(db, from, 'w');
  if (!unlock) {
    var err = new Error('key is write-locked');
    err.code = err.type = 'LOCKED';
    return setImmediate(fn, err);
  }
  
  db.get(from, function(err, value) {
    if (err) {
      unlock();
      return fn(err);
    }
    
    db.batch([
      { type: 'del', key: from },
      { type: 'put', key: to, value: value }
    ], function(err) {
      unlock();
      fn(err);
    });
  });
}

function install(db) {
  db.move = function(from, to, fn) {
    move(db, from, to, fn);
  };
}
