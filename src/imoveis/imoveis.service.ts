import { Injectable, Logger } from '@nestjs/common';
import { SmartApiService } from './smart-api.service';
import { ImovelSmartResponseDto } from './dto/imovel-smart-response.dto';
import { Imovel } from './interfaces/imovel.interface';
import { 
  TipoImovelId,
} from './enums/imovel.enum';
import { tiposImoveis, tipoPadraoImoveis } from './enums/enum-data';

@Injectable()
export class ImoveisService {
  private readonly logger = new Logger(ImoveisService.name);

  constructor(private readonly smartApiService: SmartApiService) {}

  async findAllReferenceCodes(): Promise<string[]> {
    try {
      // Fetch all properties (using a large number to ensure we get all)
      const properties = await this.findAll(999);
      
      // Extract and return just the reference codes
      return properties.map(prop => `${prop.tipoImovel.categoriaImovel.slug}/${prop.tipoImovel.slug}/${prop.codigoReferenciaImovel}`);
    } catch (error) {
      this.logger.error('Erro ao buscar códigos de referência', error.stack);
      throw error;
    }
  }

  private getTipoImovel(idTipoImovel: number, nomeTipoImovel: string, categoria: string): any {
    const tipoImovelId = Number(idTipoImovel) || 0;
    const tipoImovel = tiposImoveis.find(tipo => tipo.id === tipoImovelId);
    const categoriaId = tipoImovel?.categoriaImovel.id;
    const nomeTipo = tipoImovel?.nome;
    const nomeCategoria = tipoImovel?.categoriaImovel.nome;
    const slugTipo = tipoImovel?.slug;
    const slugCategoria = tipoImovel?.categoriaImovel.slug;
    
    return {
      id: tipoImovelId,
      nome: nomeTipo,
      slug: slugTipo,
      categoriaImovel: {
        id: categoriaId,
        nome: nomeCategoria,
        slug: slugCategoria
      }
    };
  }

  private getTipoPadraoImovel(idTipoPadraoImovel: number): any {
    const tipoPadraoImovelId = Number(idTipoPadraoImovel) || 0;
    const tipoPadraoImovel = tipoPadraoImoveis.find(tipo => tipo.id === tipoPadraoImovelId);
    const nomeTipo = tipoPadraoImovel?.nome;
    const slugTipo = tipoPadraoImovel?.slug;
    
    return {
      id: tipoPadraoImovelId,
      nome: nomeTipo,
      slug: slugTipo
    };
  }

  async findAllSmart(
    quantidadeImoveis = 1,
    statusImovelStr?: 'V' | 'L',
    novos?: boolean,
    usados?: boolean,
    tipoImovel?: TipoImovelId
  ): Promise<ImovelSmartResponseDto[]> {
    try {
      this.logger.log(
        `Buscando ${quantidadeImoveis} imóveis` + 
        (statusImovelStr ? ` com status ${statusImovelStr}` : '') +
        (novos !== undefined ? ` (${novos ? 'novos' : 'usados'})` : '')
      );
      return await this.smartApiService.listarImoveisSmart(quantidadeImoveis, statusImovelStr, novos, usados, tipoImovel);
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }

  async findAll(
    quantidadeImoveis = 1,
    statusImovelStr?: 'V' | 'L',
    novos?: boolean,
    usados?: boolean,
    tipoImovel?: TipoImovelId
  ): Promise<Imovel[]> {
    try {
      this.logger.log(
        `Buscando ${quantidadeImoveis} imóveis` + 
        (statusImovelStr ? ` com status ${statusImovelStr}` : '') +
        (novos !== undefined ? ` (${novos ? 'novos' : 'usados'})` : '')
      );
      const imoveisSmart = await this.smartApiService.listarImoveisSmart(
        quantidadeImoveis,
        statusImovelStr,
        novos,
        usados,
        tipoImovel
      );
      
      // Converte ImovelSmartResponseDto[] para Imovel[]
      return imoveisSmart.map(imovelSmart => ({
        id: imovelSmart.id,
        codigoReferenciaImovel: imovelSmart.codigoReferenciaImovel || '',
        nomeImovel: imovelSmart.nomeImovel || '',
        preco: imovelSmart.preco || 0,
        endereco: imovelSmart.endereco || '',
        numero: imovelSmart.numero || '',
        areaterreno: imovelSmart.areaterreno || '',
        fotodestaque: imovelSmart.fotodestaque || 0,
        localizacao: imovelSmart.localizacao || '',
        complemento: imovelSmart.complemento || '',
        descricao: imovelSmart.descricao || '',
        tipoImovel: this.getTipoImovel(Number(imovelSmart.idTipoImovel) || 0, imovelSmart.tipoImovel || '', imovelSmart.categoria || ''),
        nomeBairro: imovelSmart.nomeBairro || '',
        nomeCidade: imovelSmart.nomeCidade || '',
        siglaEstado: imovelSmart.siglaEstado || '',
        nomeEstado: imovelSmart.nomeEstado || '',
        dataCadastroImovel: imovelSmart.dataCadastroImovel || new Date().toISOString(),
        atualizadoem: imovelSmart.atualizadoem || new Date().toISOString(),
        dataAtualizacaoFotos: imovelSmart.dataAtualizacaoFotos || new Date().toISOString(),
        fotoImovelList: (imovelSmart.fotoImovelList || []).map(foto => ({
          nome: foto.nome || 'Imóvel',
          descricao: foto.descricao || '',
          destaque: foto.destaque ? 1 : 0,
          url: foto.url || '',
          urlOriginal: foto.urlOriginal || foto.url || '',
          urlThumbnail: foto.urlThumbnail || foto.url || '',
          urlThumbnailMiddleHD: foto.urlThumbnailMiddleHD || foto.url || ''
        })),
        caracteristicasImovelList: imovelSmart.caracteristicasImovelList || [],
        caracteristicasEmpreendimentoList: imovelSmart.caracteristicasEmpreendimentoList || [],
        urlCustom: imovelSmart.urlCustom || '',
        tipoPadraoImovel: imovelSmart.tipoPadraoImovel ? this.getTipoPadraoImovel(imovelSmart.tipoPadraoImovel || 0) : undefined,
        paraVenda: imovelSmart.paraVenda,
        paraLocacao: imovelSmart.paraLocacao,
        novos: imovelSmart.novos,
        usados: imovelSmart.usados
      }));
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }

  async findOneSmart(codigoReferenciaImovel: string): Promise<ImovelSmartResponseDto> {
    try {
      this.logger.log(`Buscando imóvel com código de referência ${codigoReferenciaImovel}`);
      return await this.smartApiService.findOneSmart(codigoReferenciaImovel);
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }
}
