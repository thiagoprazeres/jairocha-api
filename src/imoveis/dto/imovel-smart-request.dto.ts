import { ApiProperty } from '@nestjs/swagger';

export class ImovelSmartRequestDto {
  @ApiProperty({ description: 'Token de autenticação' })
  token: string;

  @ApiProperty({ description: 'Quantidade de imóveis a serem retornados', default: 10 })
  quantidadeImoveis?: number;

  @ApiProperty({ description: 'ID do tipo de imóvel', required: false })
  tipoImovel?: number;

  @ApiProperty({
    description: 'Status do imóvel (V para Venda, L para Locação)',
    enum: ['V', 'L', 'V;L'],
    required: false
  })
  statusImovelStr?: 'V' | 'L' | 'V;L';

  @ApiProperty({ description: 'Filtrar por imóveis novos', required: false })
  novos?: boolean;

  @ApiProperty({ description: 'Filtrar por imóveis usados', required: false })
  usados?: boolean;

  @ApiProperty({ description: 'Código de referência do imóvel', required: false })
  codigos?: string;
}
