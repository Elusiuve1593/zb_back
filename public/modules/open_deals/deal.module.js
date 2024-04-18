"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_service_1 = require("../../common/bcrypt/bcrypt.service");
const deal_controller_1 = require("./deal.controller");
const deal_schema_1 = require("./schema/deal.schema");
const deal_service_1 = require("./deal.service");
const jwt_config_1 = require("../../config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
let DealModule = class DealModule {
};
exports.DealModule = DealModule;
exports.DealModule = DealModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync(jwt_config_1.jwtConfig),
            mongoose_1.MongooseModule.forFeature([{ name: deal_schema_1.Deal.name, schema: deal_schema_1.DealSchema }]),
        ],
        controllers: [deal_controller_1.DealController],
        providers: [deal_service_1.DealService, bcrypt_service_1.BcryptService],
    })
], DealModule);
//# sourceMappingURL=deal.module.js.map