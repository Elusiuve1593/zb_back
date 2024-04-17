import { Module } from '@nestjs/common';
import { ConfigureModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { DealModule } from './modules/open_deals/deal.module';

@Module({
  imports: [AuthModule, DealModule, ConfigureModule],
})
export class AppModule {}
