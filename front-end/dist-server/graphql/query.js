"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var post_resolver_1 = require("./resolvers/post.resolver");
var auth_resolver_1 = require("./resolvers/auth.resolver");
var QueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: function () { return Object.assign({}, post_resolver_1.Queries, auth_resolver_1.Queries); },
});
exports.default = QueryType;
