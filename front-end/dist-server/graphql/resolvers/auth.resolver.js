"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_type_1 = __importDefault(require("../types/user.type"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var graphql_1 = require("graphql");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var util_1 = require("util");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var auth_type_1 = __importDefault(require("../types/auth.type"));
exports.Queries = {
    me: {
        type: user_type_1.default,
        args: {},
        resolve: function (obj, args, _a) {
            var user = _a.user;
            return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
                return [2 /*return*/, user];
            }); });
        }
    }
};
exports.Mutations = {
    login: {
        type: auth_type_1.default,
        args: {
            email: { name: "email", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            password: { name: "password", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve: function (obj, args) { return __awaiter(void 0, void 0, void 0, function () {
            var foundUser, verifyPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findOne({ email: args.email })];
                    case 1:
                        foundUser = _a.sent();
                        if (typeof foundUser === "undefined")
                            throw 404;
                        verifyPassword = bcryptjs_1.default.compareSync(args.password, 
                        // @ts-ignore
                        foundUser.password);
                        if (verifyPassword === false)
                            throw 400;
                        // @ts-ignore
                        console.log(foundUser.firstName + "wiw");
                        token = jsonwebtoken_1.default.sign(
                        // @ts-ignore
                        { _id: foundUser._id }, "A2E61E6E0BF2D714210272EF208FF6DA5E5B20A0895D7EDAF6F1D0865499C5D53E94A759E5A79F0D120EE12CF721CEE3B55092DB8B79EBB7A3DFDFDA42F89C42");
                        return [2 /*return*/, { token: token, user: foundUser }];
                }
            });
        }); }
    },
    register: {
        type: auth_type_1.default,
        args: {
            firstName: { name: "email", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            lastName: { name: "lastname", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            email: { name: "email", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            password: { name: "password", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            birthday: { name: "birthday", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            gender: { name: "gender", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            phone: { name: "phone", type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve: function (obj, args) { return __awaiter(void 0, void 0, void 0, function () {
            var isEmailUsed, _a, salt, newUser, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(args.firstName);
                        _a = util_1.isNullOrUndefined;
                        return [4 /*yield*/, user_model_1.default.findOne({ email: args.email })];
                    case 1:
                        isEmailUsed = !_a.apply(void 0, [_b.sent()]);
                        if (isEmailUsed)
                            throw 400;
                        salt = bcryptjs_1.default.genSaltSync(8);
                        args.password = bcryptjs_1.default.hashSync(args.password, salt);
                        args.salt = salt;
                        newUser = new user_model_1.default({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email,
                            password: args.password,
                            birthday: args.birthday,
                            gender: args.gender,
                            phone: args.phone,
                            role: "patient",
                            patients: null,
                            salt: args.salt
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.findOne({ email: args.email })];
                    case 3:
                        // @ts-ignore
                        newUser = _b.sent();
                        token = jsonwebtoken_1.default.sign({ _id: newUser._id }, "A2E61E6E0BF2D714210272EF208FF6DA5E5B20A0895D7EDAF6F1D0865499C5D53E94A759E5A79F0D120EE12CF721CEE3B55092DB8B79EBB7A3DFDFDA42F89C42");
                        return [2 /*return*/, { token: token, user: newUser }];
                }
            });
        }); }
    }
};
