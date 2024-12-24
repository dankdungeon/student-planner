"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskRouter_1 = __importDefault(require("./routers/taskRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({ path: '../.env' });
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// parse JSON requests
app.use(express_1.default.json());
// parse cookies
app.use((0, cookie_parser_1.default)());
// mounting routers
app.use('/task', taskRouter_1.default);
app.use('/user', userRouter_1.default);
app.use('/auth', authRouter_1.default);
// Deployment
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
