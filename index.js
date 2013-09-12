module.exports = move;
move.install = install;

function move(db, from, to, fn) {
  db.get(from, function(err, value) {
    if (err) return fn(err);
    db.batch([
      { type: 'del', key: from },
      { type: 'put', key: to, value: value }
    ], fn);
  });
}

function install(db) {
  db.move = function(from, to, fn) {
    move(db, from, to, fn);
  };
}
