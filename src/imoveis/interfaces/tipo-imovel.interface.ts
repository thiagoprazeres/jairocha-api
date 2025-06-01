import { CategoriaImovel } from './categoria-imovel.interface';

export interface TipoImovel {
  id: number;
  nome: string;
  descricao?: string;
  slug: string;
  categoriaImovel: CategoriaImovel;
}
