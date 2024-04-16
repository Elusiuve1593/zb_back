import { Module } from '@nestjs/common';
import { ConfigureModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, ConfigureModule],
})
export class AppModule {}
