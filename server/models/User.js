'use strict';

import mongoose from "mongoose";
import cryptoJS from "crypto-js";

const UserSchema = mongoose.Schema({
	userId: {
		type: String,
		default: "",
		required: true,
		index: true
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, { collection: "users" });

let UserModel = mongoose.model("User", UserSchema);

UserModel.generateHash = (password) => {
	const encrypted = cryptoJS.AES.encrypt(password, cryptoJS.SHA256(password).toString());
	return encrypted.toString();
};

UserModel.generateToken = () => {
	return cryptoJS.SHA256(Date.now()).toString();
};

UserModel.validPassword = (password) => {
	const decrypted = cryptoJS.AES.decrypt(this.password, cryptoJS.SHA256(password).toString());
	return decrypted.toString(cryptoJS.enc.Utf8);
};

export default UserModel;