"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_service_1 = require("../../common/bcrypt/bcrypt.service");
const auth_schema_1 = require("./schema/auth.schema");
let AuthService = class AuthService {
    constructor(authModel, bcrypt, jwtService) {
        this.authModel = authModel;
        this.bcrypt = bcrypt;
        this.jwtService = jwtService;
    }
    async userRegistration(registration) {
        const hashedPassword = await this.bcrypt.hashPassword(registration.password);
        const newUser = await this.authModel.create({
            ...registration,
            password: hashedPassword,
        });
        return await this.authModel.findById(newUser._id).select('-password');
    }
    async existMail(email) {
        return this.authModel.findOne({ email });
    }
    async authentication({ email, password, }) {
        const user = await this.authModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException(`User with ${email} is not found`);
        const comparePassword = await this.bcrypt.comparePassword(password, user.password);
        if (!comparePassword)
            throw new common_1.UnauthorizedException('Incorrect password');
        const payload = { sub: user._id, userName: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '1h',
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '5d',
            }),
        };
    }
    async refresh({ refresh_token }) {
        try {
            const decodeRefreshToken = await this.jwtService.verifyAsync(refresh_token);
            const user = await this.authModel.findById(decodeRefreshToken.sub);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const payload = { sub: user._id, userName: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                }),
                refresh_token: await this.jwtService.signAsync(payload, {
                    expiresIn: '5d',
                }),
            };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bcrypt_service_1.BcryptService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map