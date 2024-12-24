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
exports.setRefreshTokenCookie = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const accessKey = process.env.JWT_ACCESS_SECRET || '123';
const refreshKey = process.env.JWT_REFRESH_SECRET || '123';
const generateAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(user, accessKey, { expiresIn: "15m" });
});
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(user, refreshKey, { expiresIn: '7d' });
});
exports.generateRefreshToken = generateRefreshToken;
// want to make it async for consistency, wrap it in a promise
const setRefreshTokenCookie = (res, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
    return new Promise((resolve, reject) => {
        try {
            res.cookie('refreshToken', refreshToken, options);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
});
exports.setRefreshTokenCookie = setRefreshTokenCookie;
