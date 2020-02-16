"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var user_type_1 = __importDefault(require("./user.type"));
exports.default = new graphql_1.GraphQLObjectType({
    name: "auth",
    fields: function () {
        return {
            token: {
                type: graphql_1.GraphQLString,
            },
            user: {
                type: user_type_1.default,
            },
        };
    },
});
