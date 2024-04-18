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
exports.DealService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const deal_schema_1 = require("./schema/deal.schema");
let DealService = class DealService {
    constructor(configService, dealModel) {
        this.configService = configService;
        this.dealModel = dealModel;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'),
        });
    }
    async realEstate(deal) {
        return this.dealModel.create(deal);
    }
    async uploadFile(fileName, file) {
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: 'elusiuve1',
            Key: fileName,
            Body: file,
        }));
    }
    async getAllRealState() {
        return await this.dealModel.find();
    }
};
exports.DealService = DealService;
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(deal_schema_1.Deal.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], DealService);
//# sourceMappingURL=deal.service.js.map