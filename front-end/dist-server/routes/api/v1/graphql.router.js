"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_graphql_1 = __importDefault(require("express-graphql"));
var schema_1 = __importDefault(require("../../../graphql/schema"));
var router = express_1.Router();
router.use("/", 
/*HeaderToTokenMiddleware,
AuthMiddleware,*/
express_graphql_1.default(function (req) { return ({
    schema: schema_1.default,
    graphiql: true,
    context: {
        user: req.user
    }
}); }));
exports.default = router;
