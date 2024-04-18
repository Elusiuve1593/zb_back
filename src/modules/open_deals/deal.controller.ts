import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DealService } from './deal.service';
import { DealDTO } from './dto/deal.dto';
import { Deal } from './schema/deal.schema';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('data')
  realEstate(@Body() deal: DealDTO): Promise<Deal> {
    return this.dealService.realEstate(deal);
  }

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.dealService.uploadFile(file.originalname, file.buffer);
  }

  @Get()
  getAllRealState(): Promise<Deal[]> {
    return this.dealService.getAllRealState();
  }
}
