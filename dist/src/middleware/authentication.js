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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRefreshToken = exports.authAccessToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = require("../utils/response");
dotenv_1.default.config({ path: '../../.env' });
// authenticate access token with verify
// store refresh token with cookie
// we can make jwt.verify async by wrapping it with a promise
// you need a callback function to make jwt.verify async
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
const authAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            throw new Error("Authorization header is missing");
        const token = authHeader.split(' ')[1];
        if (!token)
            throw new Error("Token is missing form authorization header");
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '696969';
        const userPayload = yield (0, exports.verifyToken)(token, JWT_ACCESS_SECRET);
        // from express/index.d.ts
        // we extend the request from express to optionally include user as userResponse so we can access userId
        req.user = userPayload;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
            (0, response_1.errorResponse)(res, "Access token has expired", 401);
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError)
            (0, response_1.errorResponse)(res, error.message, 403);
        else if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 403);
        else
            (0, response_1.errorResponse)(res, "Authentication failed", 403);
    }
});
exports.authAccessToken = authAccessToken;
const authRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken)
            throw new Error("No refresh token provided");
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '696969';
        const userPayload = yield (0, exports.verifyToken)(refreshToken, JWT_REFRESH_SECRET);
        req.user = userPayload;
        next();
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 401);
        else
            (0, response_1.errorResponse)(res, "Invalid or expired refreshToken", 401);
    }
});
exports.authRefreshToken = authRefreshToken;
