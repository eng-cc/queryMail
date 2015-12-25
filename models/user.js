var mongoose = require('mongoose');
var opts = require('./../settings.js');

mongoose.connect(opts.lomongodb.url);


var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    msg: String
}, {
    collection: 'mail'
});

var userModel = mongoose.model('user', userSchema);

var user = function(user) {
    this.name = user.name || "",
        this.password = user.password || "",
        this.email = user.email || "",
        this.msg = user.msg || ""
};

user.prototype.save = function(cb){
	var fullUser = {
		name:this.name,
		password:this.password,
		email:this.email,
		msg:this.msg
	};
	var newUser = new userModel(fullUser);
	newUser.save(function(err,user){
		if (err) {
			return cb(err);
		};
		cb(null,user);
	});
};

user.prototype.query = function(q,cb){
	userModel.findOne({name:q},function(err,user){
		if (err) {
			return cb(err);
		};
		cb(null ,user);
	});
};

user.prototype.all = function(cb){
	userModel.find(function(err,users){
		if (err) {
			return cb(err);
		};
		cb(null,users);
	});
};

user.prototype.updateMsg = function(cb){
	var fullUser = {
		name:this.name,
		password:this.password,
		email:this.email,
		msg:this.msg
	};
	userModel.update({name:this.name},fullUser,function(err,user){
		if (err) {
			return cb(err);
		};
		cb(null,user);
	});
};

module.exports = user;