import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImoveisController } from './imoveis.controller';
import { ImoveisService } from './imoveis.service';
import { SmartApiService } from './smart-api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 50000,
        maxRedirects: 10,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ImoveisController],
  providers: [ImoveisService, SmartApiService],
  exports: [ImoveisService],
})
export class ImoveisModule {}
