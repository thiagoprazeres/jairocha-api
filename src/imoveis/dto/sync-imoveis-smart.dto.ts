import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoImovelId } from '../enums/imovel.enum';

export class SyncImoveisSmartDto {
  @ApiPropertyOptional({ 
    description: 'Número de imóveis para sincronizar',
    default: 100 
  })
  @IsNumber()
  @IsOptional()
  quantidadeImoveis?: number;

  @ApiPropertyOptional({ 
    description: 'Status do imóvel (V = Venda, L = Locação)',
    enum: ['V', 'L'] 
  })
  @IsString()
  @IsOptional()
  statusImovelStr?: 'V' | 'L';

  @ApiPropertyOptional({ 
    description: 'Filtrar por imóveis novos',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  novos?: boolean;

  @ApiPropertyOptional({ 
    description: 'Filtrar por imóveis usados',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  usados?: boolean;

  @ApiPropertyOptional({ 
    description: 'Tipo de imóvel',
    enum: TipoImovelId 
  })
  @IsEnum(TipoImovelId)
  @IsOptional()
  tipoImovel?: TipoImovelId;

  @ApiPropertyOptional({ 
    description: 'Destaque no banner',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  destaqueNoBanner?: boolean;

  @ApiPropertyOptional({ 
    description: 'Destaque no site',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  destaqueNoSite?: boolean;
}
