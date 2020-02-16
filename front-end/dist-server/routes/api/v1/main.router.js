"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var graphql_router_1 = __importDefault(require("./graphql.router"));
var upload_router_1 = __importDefault(require("./upload.router"));
var patient_router_1 = __importDefault(require("./patient.router"));
var medecin_router_1 = __importDefault(require("./medecin.router"));
var router = express_1.Router();
router.use("/graphql", graphql_router_1.default);
router.use("/upload", upload_router_1.default);
router.use("/patient", patient_router_1.default);
router.use("/medecin", medecin_router_1.default);
exports.default = router;
