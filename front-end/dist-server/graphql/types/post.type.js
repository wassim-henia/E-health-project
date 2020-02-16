"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var PostType = new graphql_1.GraphQLObjectType({
    name: "post",
    fields: function () {
        return {
            _id: {
                type: graphql_1.GraphQLID,
            },
            user: {
                type: graphql_1.GraphQLString,
            },
            content: {
                type: graphql_1.GraphQLString,
            },
            createdAt: {
                type: graphql_1.GraphQLString,
            },
        };
    },
});
exports.default = PostType;
