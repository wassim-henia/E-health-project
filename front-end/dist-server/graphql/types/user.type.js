"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var UserType = new graphql_1.GraphQLObjectType({
    name: "user",
    fields: function () {
        return {
            _id: {
                type: graphql_1.GraphQLID
            },
            firstName: {
                type: graphql_1.GraphQLString
            },
            lastName: {
                type: graphql_1.GraphQLString
            },
            email: {
                type: graphql_1.GraphQLString
            },
            password: {
                type: graphql_1.GraphQLString
            },
            birthday: {
                type: graphql_1.GraphQLString
            },
            gender: {
                type: graphql_1.GraphQLString
            },
            phone: {
                type: graphql_1.GraphQLString
            },
            role: {
                type: graphql_1.GraphQLString
            },
            patients: {
                type: new graphql_1.GraphQLList(UserType)
            },
            salt: {
                type: graphql_1.GraphQLString
            }
        };
    }
});
exports.default = UserType;
