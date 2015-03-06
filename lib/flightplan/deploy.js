module.exports = {
  name: 'test',
  type: 'local',
  plan: function(transport) {
    console.log('executed', this.name);
  }
}