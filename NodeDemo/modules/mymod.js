var name = exports.name = 'Tom';
exports.lower = function(input) {
  return input.toLowerCase();
};
exports.upper = function(input) {
  return input.toUpperCase();
};
exports.get_name = function() {
  return name;
}