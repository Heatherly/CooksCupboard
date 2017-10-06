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


userSchema.methods.authenticate = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {

	this.findOne({ username: username }, function(err, user) {
		if (err) {
			console.log('error attempting to use static authenticate function', err);
			done(err);
		}
		else if (user && user.authenticate(password)) {
			console.log('this should be a good login');
			done(null, user);
		}

		else {
			console.log('password probably wrong');
			done(null, false);
		}

	}); 
}





var User = mongoose.model('User', userSchema);

module.exports = User;

