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
var PostSchema = new Mongoose.Schema({
    user: String,
    content: String,
    createdAt: String,
});
exports.default = Mongoose.model("Post", PostSchema);
