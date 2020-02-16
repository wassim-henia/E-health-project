"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = __importStar(require("mongoose"));
var ScanSchema = new Mongoose.Schema({
    user: String,
    result: String,
    link: String,
    createdAt: Date
});
exports.default = Mongoose.model("Scan", ScanSchema);
