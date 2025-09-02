import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ImoveisSmart } from './imoveis-smart.entity';

@Entity()
export class FotoImovelList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @ManyToOne(() => ImoveisSmart, (imovel: ImoveisSmart) => imovel.fotoImovelList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imovel_id', referencedColumnName: 'id' })
  imoveisSmart: ImoveisSmart;
}
