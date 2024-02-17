"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    const workFactor = 8;
    const hashedPassword = await bcrypt.hash(password, workFactor);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => {
    bcrypt.compare(password, hash, (err, result) => {
        return result === true;
    });
    return false;
};
exports.verifyPassword = verifyPassword;
