"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: Date,
    gender: String,
    phone: String,
    role: String,
    push: String,
    patients: { type: Array },
    salt: String
});
exports.default = mongoose_1.default.model("User", UserSchema);
