"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
exports.default = (function (req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(" ")[1];
        if (token) {
            req.token = token;
        }
    }
    next();
});
