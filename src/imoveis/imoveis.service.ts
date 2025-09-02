import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmartApiService } from './smart-api.service';
import { ImovelSmartResponseDto } from './dto/imovel-smart-response.dto';
import { Imovel } from './interfaces/imovel.interface';
import { 
  TipoImovelId,
} from './enums/imovel.enum';
import { tiposImoveis, tipoPadraoImoveis } from './data/enum.data';
import { ImoveisSmart } from './entities/imoveis-smart.entity';
import { FotoImovelList } from './entities/foto-imovel-list.entity';
import { SyncImoveisSmartDto } from './dto/sync-imoveis-smart.dto';

@Injectable()
export class ImoveisService {
  private readonly logger = new Logger(ImoveisService.name);

  constructor(
    @InjectRepository(ImoveisSmart)
    private readonly imoveisSmartRepository: Repository<ImoveisSmart>,
    @InjectRepository(FotoImovelList)
    private readonly fotoImovelListRepository: Repository<FotoImovelList>,
    private readonly smartApiService: SmartApiService,
    private readonly configService: ConfigService,
  ) {}

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

  async findAllId(): Promise<string[]> {
    try {
      // Fetch all properties (using a large number to ensure we get all)
      const properties = await this.findAll(999);
      
      // Extract and return just the reference codes
      return properties.map(prop => `${prop.tipoImovel.categoriaImovel.slug}/${prop.tipoImovel.slug}/${prop.urlCustom}/${prop.id}`);
    } catch (error) {
      this.logger.error('Erro ao buscar ids', error.stack);
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

  async syncImoveisSmart(syncDto: SyncImoveisSmartDto): Promise<{ synced: number }> {
    try {
      let imoveis = await this.findAllSmart(
        syncDto.quantidadeImoveis || 999,
        syncDto.statusImovelStr,
        syncDto.novos,
        syncDto.usados,
        syncDto.tipoImovel,
        syncDto.destaqueNoBanner,
        syncDto.destaqueNoSite,
      ) as unknown as ImovelSmartResponseDto[];
      // Mapea a urlFotoDestaque para o foto destaque da lista de fotos se for NULL
      imoveis = imoveis.map(imovel => {
        if (!imovel.urlFotoDestaque) {
          imovel.urlFotoDestaque = imovel.fotoImovelList.find(foto => foto.destaque === 1)?.url || imovel.fotoImovelList[0].url || '';
        }
        return imovel;
      });
      
      const qr = this.imoveisSmartRepository.manager.connection.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();
      try {
        await qr.query('TRUNCATE TABLE "foto_imovel_list" RESTART IDENTITY CASCADE');
        await qr.query('TRUNCATE TABLE "imoveis_smart" RESTART IDENTITY CASCADE');
        await qr.commitTransaction();
      } catch (e) {
        await qr.rollbackTransaction();
        throw e;
      } finally {
        await qr.release();
      }
      await this.imoveisSmartRepository.save(imoveis, {chunk: 100});

      return { synced: imoveis.length };
    } catch (error) {
      this.logger.error('Erro na sincronização de imóveis:', error.stack);
      throw error;
    }
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
    quantidadeImoveis = 999,
    statusImovelStr?: 'V' | 'L',
    novos?: boolean,
    usados?: boolean,
    tipoImovel?: TipoImovelId,
    destaqueNoBanner?: boolean,
    destaqueNoSite?: boolean,
  ): Promise<ImovelSmartResponseDto[]> {
    try {
      this.logger.log(
        `Buscando ${quantidadeImoveis} imóveis` + 
        (statusImovelStr ? ` com status ${statusImovelStr}` : '') +
        (novos !== undefined ? ` (${novos ? 'novos' : 'usados'})` : '')
      );
      return await this.smartApiService.listarImoveisSmart(quantidadeImoveis, statusImovelStr, novos, usados, tipoImovel, destaqueNoBanner, destaqueNoSite);
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
      const imoveisSmart = await this.imoveisSmartRepository.find();
      
      // Converte ImovelSmart[] para Imovel[]
      return imoveisSmart.map(imovelSmart => ({
        id: imovelSmart.id,
        codigoReferenciaImovel: imovelSmart.codigoReferenciaImovel || '',
        nomeImovel: imovelSmart.nomeImovel || '',
        preco: imovelSmart.preco || 0,
        precoLocacao: imovelSmart.precoLocacao || 0,
        endereco: imovelSmart.endereco || '',
        numero: imovelSmart.numero || '',
        nquartos: imovelSmart.nquartos || '',
        nsuites: imovelSmart.nsuites || '',
        ngaragens: imovelSmart.ngaragens || '',
        areaterreno: imovelSmart.areaterreno || '',
        fotodestaque: imovelSmart.fotodestaque || 0,
        destaque: imovelSmart.destaque || '0',
        destaquebanner: imovelSmart.destaquebanner || '0',
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
          nome: foto.nome || imovelSmart.nomeImovel || 'Imóvel',
          url: foto.url || '',
        })),
        caracteristicasImovelList: imovelSmart.caracteristicasImovelList || [],
        caracteristicasEmpreendimentoList: imovelSmart.caracteristicasEmpreendimentoList || [],
        urlCustom: imovelSmart.urlCustom || '',
        urlFotoDestaque: imovelSmart.urlFotoDestaque || '',
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

  async findOneById(id: string): Promise<Imovel | null> {
    try {
      this.logger.log(`Buscando imóvel com id ${id}`);
      const imovelSmart = await this.imoveisSmartRepository.findOne({ where: { id: Number(id) }, relations: ['fotoImovelList'] })
      return imovelSmart ? {
        id: imovelSmart.id,
        codigoReferenciaImovel: imovelSmart.codigoReferenciaImovel || '',
        nomeImovel: imovelSmart.nomeImovel || '',
        preco: imovelSmart.preco || 0,
        precoLocacao: imovelSmart.precoLocacao || 0,
        endereco: imovelSmart.endereco || '',
        numero: imovelSmart.numero || '',
        areaterreno: imovelSmart.areaterreno || '',
        fotodestaque: imovelSmart.fotodestaque || 0,
        destaque: imovelSmart.destaque || '0',
        destaquebanner: imovelSmart.destaquebanner || '0',
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
          nome: foto.nome || imovelSmart.nomeImovel || 'Imóvel',
          url: foto.url || '',
        })),
        caracteristicasImovelList: imovelSmart.caracteristicasImovelList || [],
        caracteristicasEmpreendimentoList: imovelSmart.caracteristicasEmpreendimentoList || [],
        urlCustom: imovelSmart.urlCustom || '',
        urlFotoDestaque: imovelSmart.urlFotoDestaque || '',
        tipoPadraoImovel: imovelSmart.tipoPadraoImovel ? this.getTipoPadraoImovel(imovelSmart.tipoPadraoImovel || 0) : undefined,
        paraVenda: imovelSmart.paraVenda,
        paraLocacao: imovelSmart.paraLocacao,
        novos: imovelSmart.novos,
        usados: imovelSmart.usados
      } : null;
    } catch (error) {
      this.logger.error('Erro ao buscar imóveis', error.stack);
      throw error;
    }
  }

  async findByTipoImovel(tipoImovel: TipoImovelId): Promise<Imovel[]> {
    try {
      this.logger.log(`Buscando imóveis com tipo ${tipoImovel}`);
      const imoveisSmart = await this.imoveisSmartRepository.find({ where: { idTipoImovel: tipoImovel.toString() } });
      // Converte ImovelSmart[] para Imovel[]
      return imoveisSmart.map(imovelSmart => ({
        id: imovelSmart.id,
        codigoReferenciaImovel: imovelSmart.codigoReferenciaImovel || '',
        nomeImovel: imovelSmart.nomeImovel || '',
        preco: imovelSmart.preco || 0,
        precoLocacao: imovelSmart.precoLocacao || 0,
        endereco: imovelSmart.endereco || '',
        numero: imovelSmart.numero || '',
        nquartos: imovelSmart.nquartos || '',
        nsuites: imovelSmart.nsuites || '',
        ngaragens: imovelSmart.ngaragens || '',
        areaterreno: imovelSmart.areaterreno || '',
        fotodestaque: imovelSmart.fotodestaque || 0,
        destaque: imovelSmart.destaque || '0',
        destaquebanner: imovelSmart.destaquebanner || '0',
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
          nome: foto.nome || imovelSmart.nomeImovel || 'Imóvel',
          url: foto.url || '',
        })),
        caracteristicasImovelList: imovelSmart.caracteristicasImovelList || [],
        caracteristicasEmpreendimentoList: imovelSmart.caracteristicasEmpreendimentoList || [],
        urlCustom: imovelSmart.urlCustom || '',
        urlFotoDestaque: imovelSmart.urlFotoDestaque || '',
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

  async findByDestaqueOrDestaqueNoBanner(destaqueOrDestaqueNoBanner: boolean): Promise<Imovel[]> {
    try {
      this.logger.log(`Buscando imóveis com destaque no banner ${destaqueOrDestaqueNoBanner}`);
      const valorDestaque = destaqueOrDestaqueNoBanner ? '1' : '0';
      const imoveisSmart = await this.imoveisSmartRepository.find({
        where: [
          { destaquebanner: valorDestaque },
          { destaque: valorDestaque },
        ],
      });
      // Converte ImovelSmart[] para Imovel[]
      return imoveisSmart.map(imovelSmart => ({
        id: imovelSmart.id,
        codigoReferenciaImovel: imovelSmart.codigoReferenciaImovel || '',
        nomeImovel: imovelSmart.nomeImovel || '',
        preco: imovelSmart.preco || 0,
        precoLocacao: imovelSmart.precoLocacao || 0,
        endereco: imovelSmart.endereco || '',
        numero: imovelSmart.numero || '',
        nquartos: imovelSmart.nquartos || '',
        nsuites: imovelSmart.nsuites || '',
        ngaragens: imovelSmart.ngaragens || '',
        areaterreno: imovelSmart.areaterreno || '',
        fotodestaque: imovelSmart.fotodestaque || 0,
        destaque: imovelSmart.destaque || '0',
        destaquebanner: imovelSmart.destaquebanner || '0',
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
          nome: foto.nome || imovelSmart.nomeImovel || 'Imóvel',
          url: foto.url || '',
        })),
        caracteristicasImovelList: imovelSmart.caracteristicasImovelList || [],
        caracteristicasEmpreendimentoList: imovelSmart.caracteristicasEmpreendimentoList || [],
        urlCustom: imovelSmart.urlCustom || '',
        urlFotoDestaque: imovelSmart.urlFotoDestaque || '',
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
}
