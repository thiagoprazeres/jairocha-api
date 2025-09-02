import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImoveisController } from './imoveis.controller';
import { ImoveisService } from './imoveis.service';
import { SmartApiService } from './smart-api.service';
import { ImoveisSmart } from './entities/imoveis-smart.entity';
import { FotoImovelList } from './entities/foto-imovel-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImoveisSmart, FotoImovelList]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT', 90000),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS', 10),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ImoveisController],
  providers: [ImoveisService, SmartApiService],
  exports: [ImoveisService],
})
export class ImoveisModule {}
