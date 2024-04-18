/// <reference types="multer" />
import { DealService } from './deal.service';
import { DealDTO } from './dto/deal.dto';
import { Deal } from './schema/deal.schema';
export declare class DealController {
    private readonly dealService;
    constructor(dealService: DealService);
    realEstate(deal: DealDTO): Promise<Deal>;
    uploadFile(file: Express.Multer.File): Promise<void>;
    getAllRealState(): Promise<Deal[]>;
}
