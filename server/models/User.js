'use strict';

const mongoose = require('mongoose');
var cryptoJS = require('crypto-js');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	verificationToken: {
		type: String,
		default: ''
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	signUpDate: {
		type: Date,
		default: Date.now()
	},
	lastLogin: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.methods.generateHash = function(password) {
	const encrypted = cryptoJS.AES.encrypt(password, cryptoJS.SHA256(password).toString());
	return encrypted.toString();
};

UserSchema.methods.generateToken = () => {
	return cryptoJS.SHA256(Date.now()).toString();
};

UserSchema.methods.validPassword = function(password) {
	const decrypted = cryptoJS.AES.decrypt(this.password, cryptoJS.SHA256(password).toString());
	return decrypted.toString(cryptoJS.enc.Utf8);
};

module.exports = mongoose.model('User', UserSchema);
