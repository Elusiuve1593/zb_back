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
import { Deal, RealEstate } from './schema/deal.schema';

@Controller('deal')
export class DealController {
  constructor(private readonly authService: DealService) {}

  //@UseGuards(AuthGuard)
  @Post('data')
  realEstate(@Body() deal: DealDTO): Promise<Deal> {
    return this.authService.realEstate(deal);
  }

  //@UseGuards(AuthGuard)
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
    return this.authService.uploadFile(file.originalname, file.buffer);
  }

  //@UseGuards(AuthGuard)
  @Get()
  getAllRealState(): Promise<RealEstate[]> {
    return this.authService.getAllRealState();
  }
}
