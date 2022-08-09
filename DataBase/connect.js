const mongoose = require("mongoose");
  mongoose.connect('mongodb+srv://slas:slash12345@cluster0.lbwb1sx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
	console.log('connected mongoDB');
}).catch(console.error);

mongoose.connection.on('disconnected', () => console.log('-> lost connection'));
mongoose.connection.on('reconnect', () => console.log('-> reconnected'));
mongoose.connection.on('connected', () => console.log('-> connected'));
