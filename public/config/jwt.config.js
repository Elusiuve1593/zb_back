"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    useFactory: () => {
        return {
            secret: process.env.JWT_SECRET,
        };
    },
};
//# sourceMappingURL=jwt.config.js.map