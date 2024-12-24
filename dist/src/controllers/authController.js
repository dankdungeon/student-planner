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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.Logout = exports.Login = void 0;
const userController_1 = require("./userController");
const hashing_1 = require("../utils/hashing");
const tokenGeneration_1 = require("../utils/tokenGeneration");
const response_1 = require("../utils/response");
/*
implement login, logout, token refreshing
*/
// in mem storage for refresh tokens
const refreshTokens = new Set();
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validate credentials
    try {
        const user = userController_1.users.find(u => u.username === username);
        if (!user)
            throw new Error('User not found');
        const isValid = yield (0, hashing_1.passwordValidation)(password, user.password);
        if (!isValid)
            throw new Error('Invalid password');
        const userResponse = { userId: user.userId, username: user.username };
        const newAccessToken = yield (0, tokenGeneration_1.generateAccessToken)(userResponse);
        const newRefreshToken = yield (0, tokenGeneration_1.generateRefreshToken)(userResponse);
        const authResponse = { user: userResponse, accessToken: newAccessToken }; // store access token in memory
        // generates cookie for refresh token to be stored in
        yield (0, tokenGeneration_1.setRefreshTokenCookie)(res, newRefreshToken);
        refreshTokens.add(newRefreshToken);
        (0, response_1.successResponse)(res, authResponse, "Logged in successfully", 200);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found')
                (0, response_1.errorResponse)(res, error.message, 404);
            else if (error.message === 'Invalid password')
                (0, response_1.errorResponse)(res, error.message, 403);
            else
                (0, response_1.errorResponse)(res, error.message, 403);
        }
        else {
            (0, response_1.errorResponse)(res, "Failed to login", 403);
        }
    }
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken; // from cookieParser
        refreshTokens.delete(refreshToken); // delete from storage
        // clear cookie
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        });
        (0, response_1.successResponse)(res, req.user, "Logged out successfully", 200);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to log out", 403);
    }
});
exports.Logout = Logout;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw new Error("no user from payload");
        // generate new token 
        const newAccessToken = yield (0, tokenGeneration_1.generateAccessToken)(user);
        const authResponse = { user, accessToken: newAccessToken };
        (0, response_1.successResponse)(res, authResponse, "refreshed access token successfully");
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 403);
        else
            (0, response_1.errorResponse)(res, "failed to refresh access token", 403);
    }
});
exports.refreshAccessToken = refreshAccessToken;
