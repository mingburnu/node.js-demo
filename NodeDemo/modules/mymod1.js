module.exports = {
  name: 'Jack',
  lower: function(input) {
    return input.toLowerCase();
  },
  upper: function(input) {
    return input.toUpperCase();
  },
  get_name: function() {
    return this.name;
  }
};