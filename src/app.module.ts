import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImoveisModule } from './imoveis/imoveis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ImoveisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
