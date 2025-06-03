import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { ImoveisSmart } from './imoveis-smart.entity';

@Entity()
export class FotoImovel {
  @PrimaryColumn()
  nome: string;

  @Column({nullable: true})
  descricao: string;

  @Column({nullable: true})
  destaque: number;

  @Column()
  url: string;

  @Column({nullable: true})
  urlOriginal: string;

  @Column()
  urlThumbnail: string;

  @Column()
  urlThumbnailMiddleHD: string;

  @ManyToOne(() => ImoveisSmart, (imovel: ImoveisSmart) => imovel.fotoImovelList)
  imoveisSmart: ImoveisSmart;
}
