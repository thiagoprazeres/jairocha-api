import { Controller, Get, Query, Logger, Param, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { ImoveisService } from './imoveis.service';
import { Imovel } from './interfaces/imovel.interface';
import { ImovelSmartResponseDto } from './dto/imovel-smart-response.dto';
import { TipoImovelId } from './enums/imovel.enum';
import { SyncImoveisSmartDto } from './dto/sync-imoveis-smart.dto';
import { ImoveisSmart } from './entities/imoveis-smart.entity';

@ApiTags('imoveis')
@Controller('imoveis')
export class ImoveisController {
  private readonly logger = new Logger(ImoveisController.name);

  constructor(private readonly imoveisService: ImoveisService) {}

  @Get()
  @ApiOperation({ summary: 'Lista imóveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de imóveis retornada com sucesso',
    type: [ImovelSmartResponseDto],
  })
  async findAll(
    @Query('quantidadeImoveis') quantidadeImoveis = 1,
    @Query('statusImovelStr') statusImovelStr?: 'V' | 'L',
    @Query('novos') novos?: boolean,
    @Query('usados') usados?: boolean,
    @Query('tipoImovel') tipoImovel?: TipoImovelId,
  ): Promise<Imovel[]> {
    try {
      this.logger.log(
        `Buscando ${quantidadeImoveis} imóveis` +
        (statusImovelStr ? ` com status ${statusImovelStr}` : '') +
        (novos !== undefined ? ` (${novos ? 'novos' : 'usados'})` : '')
      );
      return await this.imoveisService.findAll(quantidadeImoveis, statusImovelStr, novos, usados, tipoImovel);
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }

  @Get('codigos-referencia')
  @ApiOperation({ summary: 'Lista todos os códigos de referência de imóveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de códigos de referência retornada com sucesso',
    type: [String],
  })
  async findAllReferenceCodes(): Promise<string[]> {
    try {
      this.logger.log('Buscando todos os códigos de referência de imóveis');
      return await this.imoveisService.findAllReferenceCodes();
    } catch (error) {
      this.logger.error('Erro ao buscar códigos de referência', error.stack);
      throw error;
    }
  }

  @Get('ids')
  @ApiOperation({ summary: 'Lista todos os ids de imóveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ids retornada com sucesso',
    type: [String],
  })
  async findAllId(): Promise<string[]> {
    try {
      this.logger.log('Buscando todos os ids de imóveis');
      return await this.imoveisService.findAllId();
    } catch (error) {
      this.logger.error('Erro ao buscar ids', error.stack);
      throw error;
    }
  }

  @Post('sync')
  @ApiOperation({ summary: 'Sincroniza imóveis da Smart API com o banco de dados' })
  @ApiResponse({
    status: 201,
    description: 'Imóveis sincronizados com sucesso',
    schema: {
      type: 'object',
      properties: {
        synced: { type: 'number', description: 'Número de imóveis sincronizados' }
      }
    },
  })
  @ApiBody({ type: SyncImoveisSmartDto })
  async syncImoveisSmart(
    @Body() syncDto: SyncImoveisSmartDto,
  ): Promise<{ synced: number }> {
    return this.imoveisService.syncImoveisSmart(syncDto);
  }

  @Get('smart')
  @ApiOperation({ summary: 'Lista imóveis da Smart API' })
  @ApiResponse({
    status: 200,
    description: 'Lista de imóveis retornada com sucesso',
    type: [ImovelSmartResponseDto],
  })
  async findAllSmart(
    @Query('quantidadeImoveis') quantidadeImoveis = 1,
    @Query('statusImovelStr') statusImovelStr?: 'V' | 'L',
    @Query('novos') novos?: boolean,
    @Query('usados') usados?: boolean,
    @Query('tipoImovel') tipoImovel?: TipoImovelId,
  ): Promise<ImovelSmartResponseDto[]> {
    try {
      this.logger.log(
        `Buscando ${quantidadeImoveis} imóveis` +
        (statusImovelStr ? ` com status ${statusImovelStr}` : '') +
        (novos !== undefined ? ` (${novos ? 'novos' : 'usados'})` : '')
      );
      return await this.imoveisService.findAllSmart(quantidadeImoveis, statusImovelStr, novos, usados, tipoImovel);
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }

  @Get('codigoReferenciaImovel/:codigoReferenciaImovel')
  @ApiOperation({ summary: 'Busca imóvel por código de referência' })
  @ApiResponse({
    status: 200,
    description: 'Imóvel encontrado com sucesso',
    type: ImovelSmartResponseDto,
  })
  async findOne(@Param('codigoReferenciaImovel') codigoReferenciaImovel: string): Promise<ImovelSmartResponseDto> {
    try {
      this.logger.log(`Buscando imóvel com código de referência ${codigoReferenciaImovel}`);
      return await this.imoveisService.findOneSmart(codigoReferenciaImovel);
    } catch (error) {
      this.logger.error('Erro ao buscar imóvel', error.stack);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca imóvel por id' })
  @ApiResponse({
    status: 200,
    description: 'Imóvel encontrado com sucesso',
    type: ImovelSmartResponseDto,
  })
  async findOneById(@Param('id') id: string): Promise<Imovel | null> {
    try {
      this.logger.log(`Buscando imóvel com id ${id}`);
      return await this.imoveisService.findOneById(id);
    } catch (error) {
      this.logger.error('Erro ao buscar imóvel', error.stack);
      throw error;
    }
  }
}
