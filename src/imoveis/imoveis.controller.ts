import { Controller, Get, Query, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImoveisService } from './imoveis.service';
import { Imovel } from './interfaces/imovel.interface';
import { ImovelSmartResponseDto } from './dto/imovel-smart-response.dto';
import { TipoImovelId } from './enums/imovel.enum';

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

  @Get(':codigoReferenciaImovel')
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
}
