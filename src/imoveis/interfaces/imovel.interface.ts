import { FotoImovelDto } from '../dto/foto-imovel.dto';
import { TipoImovel } from './tipo-imovel.interface';
import { TipoPadraoImovel } from './tipo-padrao-imovel.interface';

export interface Imovel {
  id: number;
  codigoReferenciaImovel: string;
  nomeImovel: string;
  preco: number;
  precoLocacao: number;
  endereco: string;
  numero: string;
  areaterreno: string;
  fotodestaque: number;
  destaque: string;
  destaquebanner: string;
  urlFotoDestaque: string;
  localizacao: string;
  complemento: string;
  descricao: string;
  nomeBairro: string;
  nomeCidade: string;
  siglaEstado: string;
  nomeEstado: string;
  dataCadastroImovel: string;
  atualizadoem: string;
  dataAtualizacaoFotos: string;
  caracteristicasImovelList: string[];
  caracteristicasEmpreendimentoList: string[];
  urlCustom: string;
  tipoImovel: TipoImovel;
  tipoPadraoImovel?: TipoPadraoImovel;
  fotoImovelList: FotoImovelDto[];
  paraVenda?: boolean;
  paraLocacao?: boolean;
  novos?: boolean;
  usados?: boolean;
}
