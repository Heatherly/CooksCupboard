var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
	username: { type: String, unique: true, require: true },
	passwordHash: { type: String, require: true }
});


userSchema.virtual('password')
	.get(function() { return null; })
	.set(function(value) {
		var hash = bcrypt.hashSync(value, 10);
		this.passwordHash = hash;
	});

var User = mongoose.model('User', userSchema);

module.exports = User;

