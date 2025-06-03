import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, of } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ImovelSmartResponseDto } from './dto/imovel-smart-response.dto';
import { ImovelSmartRequestDto } from './dto/imovel-smart-request.dto';
import { TipoImovelId } from './enums/imovel.enum';

@Injectable()
export class SmartApiService {
  private readonly logger = new Logger(SmartApiService.name);
  private readonly apiUrlSmart    = 'https://app.smart.youdigital.com.br/sites/v1/imovel/listarImoveisFiltro';
  private readonly apiUrlSmartOne = 'http://app.smart.youdigital.com.br/sites/v1/imovel/listarImoveisLista';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchImoveis(
    token: string,
    quantidadeImoveis: number,
    statusImovelStr?: 'V' | 'L',
    novos?: boolean,
    usados?: boolean,
    tipoImovel?: TipoImovelId
  ): Promise<ImovelSmartResponseDto[]> {
    const params: ImovelSmartRequestDto = {
      token,
      quantidadeImoveis,
      ...(statusImovelStr && { statusImovelStr }),
      ...(tipoImovel && { tipoImovel }),
      ...(novos !== undefined && { novos }),
      ...(usados !== undefined && { usados }),
    };

    this.logger.log(`Filtros para busca na Smart API: ${JSON.stringify(params)}`);
    
    const response = await firstValueFrom(
      this.httpService.get<{ imoveis: any[] }>(this.apiUrlSmart, {
        params: {
          filtro: JSON.stringify(params),
        },
      }).pipe(
        catchError(error => {
          if (error.response?.status === 404) {
            this.logger.log('Nenhum imóvel encontrado na Smart API (404)');
            return of({ data: { imoveis: [] } });
          }
          throw error;
        })
      )
    );
    
    return response.data.imoveis || [];
  }

  private async fetchImoveisOne(token: string, codigos: string): Promise<any[]> {
    const params: ImovelSmartRequestDto = {
      token,
      codigos,
    };

    this.logger.log(`Filtros para busca na Smart API: ${JSON.stringify(params)}`);
    
    const response = await firstValueFrom(
      this.httpService.get<{ imoveis: any[] }>(this.apiUrlSmartOne, {params}).pipe(
        catchError(error => {
          if (error.response?.status === 404) {
            this.logger.log('Nenhum imóvel encontrado na Smart API (404)');
            return of({ data: { imoveis: [] } });
          }
          throw error;
        })
      )
    );
    
    return response.data.imoveis || [];
  }

  async listarImoveisSmart(
    quantidadeImoveis = 1,
    statusImovelStr?: 'V' | 'L',
    novos?: boolean,
    usados?: boolean,
    tipoImovel?: TipoImovelId
  ): Promise<ImovelSmartResponseDto[]> {
    try {
      const token = this.configService.get<string>('TOKEN_SMART');
      
      if (!token) {
        throw new Error('TOKEN_SMART não configurado no ambiente');
      }

      // Se não foi especificado filtro de novos/usados, busca ambos e combina os resultados
      if (novos === undefined && usados === undefined) {
        // Busca imóveis usados
        const imoveisUsados = await this.fetchImoveis(token, quantidadeImoveis, statusImovelStr, false, true, tipoImovel);
        // Busca imóveis novos
        const imoveisNovos = await this.fetchImoveis(token, quantidadeImoveis, statusImovelStr, true, false, tipoImovel);
        
        // Combina os resultados
        const todosImoveis = [
          ...imoveisNovos.map(imovel => ({
            ...imovel,
            novos: true,
            usados: false
          })),
          ...imoveisUsados.map(imovel => ({
            ...imovel,
            novos: false,
            usados: true
          }))
        ];
        
        // Limita ao número solicitado de imóveis e converte para DTO
        return plainToInstance(
          ImovelSmartResponseDto, 
          todosImoveis,
          { excludeExtraneousValues: true }
        );
      }

      // Se ambos os filtros forem true, retorna vazio (não faz sentido um imóvel ser novo e usado ao mesmo tempo)
      if (novos === true && usados === true) {
        return [];
      }

      // Se apenas um dos filtros for true, faz a chamada específica
      if (novos === true || usados === false) {
        const imoveisNovos = await this.fetchImoveis(token, quantidadeImoveis, statusImovelStr, true, false);
        return plainToInstance(ImovelSmartResponseDto, imoveisNovos, {
          excludeExtraneousValues: true,
        }).map(imovel => ({
          ...imovel,
          novos: true,
          usados: false
        }));
      }

      if (usados === true || novos === false) {
        const imoveisUsados = await this.fetchImoveis(token, quantidadeImoveis, statusImovelStr, false, true);
        return plainToInstance(ImovelSmartResponseDto, imoveisUsados, {
          excludeExtraneousValues: true,
        }).map(imovel => ({
          ...imovel,
          novos: false,
          usados: true
        }));
      }

      // Se chegou aqui, é porque ambos são false, então retorna vazio
      return []; 
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis na Smart API', error.status, error.stack);
      throw new Error(`Falha ao buscar imóveis: ${error.message}`);
    }
  }

  async findOneSmart(codigoReferenciaImovel: string): Promise<ImovelSmartResponseDto> {
    // http://app.smart.youdigital.com.br/sites/v1/imovel/listarImoveisLista?token=MRyLSNSeovwg8MkjW6JbRcmqXtWiV5i3SAhcFvDH&codigos=R2-817
    try {

      const token = this.configService.get<string>('TOKEN_SMART');
      
      if (!token) {
        throw new Error('TOKEN_SMART não configurado no ambiente');
      }

      const imoveis = await this.fetchImoveisOne(token, codigoReferenciaImovel);  
      return plainToInstance(ImovelSmartResponseDto, imoveis[0], {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis na Smart API', error.status, error.stack);
      throw new Error(`Falha ao buscar imóveis: ${error.message}`);
    }
  }
}
