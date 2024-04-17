import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DealController } from './deal.controller';
import { Deal, DealSchema } from './schema/deal.schema';
import { DealService } from './deal.service';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
  ],
  controllers: [DealController],
  providers: [DealService, BcryptService, AuthGuard],
})
export class DealModule {}
