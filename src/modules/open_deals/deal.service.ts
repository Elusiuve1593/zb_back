import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DealDTO } from './dto/deal.dto';
import { Deal, RealEstate } from './schema/deal.schema';

@Injectable()
export class DealService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Deal.name)
    private readonly dealModel: Model<Deal>,
  ) {}

  async realEstate(deal: DealDTO): Promise<Deal> {
    return this.dealModel.create({ realEstate: deal });
  }

  async uploadFile(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'elusiuve1',
        Key: fileName,
        Body: file,
      }),
    );
  }

  async getAllRealState(): Promise<RealEstate[] | any> {
    return await this.dealModel.find();
  }
}
