module.exports = {
  name: 'test2',
  type: 'local',
  plan: function(transport) {
    console.log(transport.runtime);
  }
}