var Mongoose = require('mongoose'), 
    dbName   = (process.env.NODE_ENV === 'test') ? 'test' : 'gas_tracker',
	  mongoUri = 'mongodb://localhost:27017/' + dbName;

Mongoose.connect(mongoUri, function(err, resp){
  if (err) {
    console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
    exit();
  } else {
    if (process.env.NODE_ENV !== 'test') console.log ('Succeeded connected to: ' + mongoUri);
  }
});

module.exports = Mongoose;