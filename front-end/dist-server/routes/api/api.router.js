"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var main_router_1 = __importDefault(require("./v1/main.router"));
var router = express_1.Router();
router.use("/v1", main_router_1.default);
exports.default = router;
