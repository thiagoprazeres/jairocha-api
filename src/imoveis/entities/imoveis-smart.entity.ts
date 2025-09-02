import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FotoImovelList } from './foto-imovel-list.entity';

@Entity('imoveis_smart')
export class ImoveisSmart {
  @PrimaryColumn()
  @ApiProperty({ description: 'ID único do imóvel' })
  id: number;

  @Column({ name: 'codigo_referencia_imovel' })
  @ApiProperty({ description: 'Código de referência do imóvel' })
  codigoReferenciaImovel: string;

  @Column({ name: 'cod_imovel_origem', nullable: true })
  @ApiProperty({ description: 'Código do imóvel de origem' })
  codImovelOrigem?: string;

  @Column({ name: 'nome_imovel' })
  @ApiProperty({ description: 'Nome do imóvel' })
  nomeImovel: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  @ApiProperty({ description: 'Preço de venda', required: false })
  preco?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  @ApiProperty({ description: 'Preço de locação', required: false })
  precoLocacao?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  @ApiProperty({ description: 'Preço de merge', required: false })
  precoMerge?: number;

  @Column()
  @ApiProperty({ description: 'URL customizada' })
  urlCustom: string;

  @Column()
  @ApiProperty({ description: 'Endereço do imóvel' })
  endereco: string;

  @Column()
  @ApiProperty({ description: 'Número do endereço' })
  numero: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Área útil em m²', required: false })
  areautil?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @ApiProperty({ description: 'Área total em m²', required: false })
  area?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Área do terreno em m²', required: false })
  areaterreno?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Unidade', required: false })
  unidade?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Unidade de medida', required: false })
  unidade2?: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  @ApiProperty({ description: 'Valor do IPTU', required: false })
  iptu?: number;

  @Column('decimal', { precision: 15, scale: 2, name: 'vlrparcelaiptu', nullable: true })
  @ApiProperty({ description: 'Valor da parcela do IPTU', required: false })
  vlrparcelaiptu?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  @ApiProperty({ description: 'Valor do condomínio', required: false })
  condominio?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de quartos', required: false })
  nquartos?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de suítes', required: false })
  nsuites?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de vagas de garagem', required: false })
  ngaragens?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'ID da foto de destaque', required: false })
  fotodestaque?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Destaque', required: false })
  destaque?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Destaque no banner', required: false })
  destaquebanner?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'URL customizada' })
  urlFotoDestaque: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Localização', required: false })
  localizacao?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Complemento do endereço', required: false })
  complemento?: string;

  @Column('text', { nullable: true })
  @ApiProperty({ description: 'Descrição do imóvel', required: false })
  descricao?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Categoria do imóvel', required: false })
  categoria?: string;

  @Column({ name: 'tipo_imovel', nullable: true })
  @ApiProperty({ description: 'Tipo do imóvel', required: false })
  tipoImovel: string;

  @Column({ name: 'id_tipo_imovel', nullable: true })
  @ApiProperty({ description: 'ID do tipo de imóvel', required: false })
  idTipoImovel: string;

  @Column({ name: 'subtipo_imovel', nullable: true })
  @ApiProperty({ description: 'Subtipo do imóvel', required: false })
  subtipoImovel: string;

  @Column({ name: 'id_subtipo_imovel', nullable: true })
  @ApiProperty({ description: 'ID do subtipo de imóvel', required: false })
  idSubtipoImovel?: number;

  @Column({ name: 'tipo_operacao', nullable: true })
  @ApiProperty({ description: 'Tipo de operação', required: false })
  tipoOperacao?: string;

  @Column({ name: 'descricao_tipo_operacao', nullable: true })
  @ApiProperty({ description: 'Descrição do tipo de operação', required: false })
  descricaoTipoOperacao?: string;

  @Column({ name: 'nome_bairro', nullable: true })
  @ApiProperty({ description: 'Nome do bairro', required: false })
  nomeBairro?: string;

  @Column({ name: 'nome_cidade', nullable: true })
  @ApiProperty({ description: 'Nome da cidade', required: false })
  nomeCidade?: string;

  @Column({ name: 'sigla_estado', length: 2, nullable: true })
  @ApiProperty({ description: 'Sigla do estado', required: false })
  siglaEstado?: string;

  @Column({ name: 'nome_estado', nullable: true })
  @ApiProperty({ description: 'Nome do estado', required: false })
  nomeEstado?: string;

  @Column({ name: 'tipo_contrato', nullable: true })
  @ApiProperty({ description: 'Tipo de contrato', required: false })
  tipoContrato?: string;

  @Column({ name: 'data_cadastro_imovel' })
  @ApiProperty({ description: 'Data de cadastro do imóvel' })
  dataCadastroImovel: string;

  @Column()
  @ApiProperty({ description: 'Data da última atualização' })
  atualizadoem: string;

  @Column({ name: 'data_atualizacao_fotos', nullable: true })
  @ApiProperty({ description: 'Data da última atualização das fotos', required: false })
  dataAtualizacaoFotos?: string;

  @Column({ name: 'end_mostrar_internet' })
  @ApiProperty({ description: 'Mostrar endereço na internet' })
  endMostrarInternet: string;

  @Column({ name: 'nome_mostrar_internet' })
  @ApiProperty({ description: 'Mostrar nome na internet' })
  nomeMostrarInternet: string;

  // Relationship with FotoImovel
  @OneToMany(() => FotoImovelList, foto => foto.imoveisSmart, { cascade: true, })
  @ApiProperty({ type: () => [FotoImovelList], description: 'Fotos do imóvel' })
  fotoImovelList: FotoImovelList[];

  // Boolean-like string fields with default 'N' for false
  @Column({ default: 'N', name: 'tem_interfone' })
  @ApiProperty({ description: 'Possui interfone' })
  temInterfone: string;
  
  @Column({ default: 'N', name: 'tem_antena_coletiva' })
  @ApiProperty({ description: 'Possui antena coletiva' })
  temAntenaColetiva: string;
  
  @Column({ default: 'N', name: 'tem_piscina' })
  @ApiProperty({ description: 'Possui piscina' })
  temPiscina: string;
  
  @Column({ default: 'N', name: 'tem_playground' })
  @ApiProperty({ description: 'Possui playground' })
  temPlayground: string;
  
  @Column({ default: 'N', name: 'tem_gerador' })
  @ApiProperty({ description: 'Possui gerador' })
  temGerador: string;
  
  @Column({ default: 'N', name: 'tem_quadra_esportiva' })
  @ApiProperty({ description: 'Possui quadra esportiva' })
  temQuadraEsportiva: string;
  
  @Column({ default: 'N', name: 'tem_sauna' })
  @ApiProperty({ description: 'Possui sauna' })
  temSauna: string;
  
  @Column({ default: 'N', name: 'tem_sala_ginastica' })
  @ApiProperty({ description: 'Possui sala de ginástica' })
  temSalaGinastica: string;
  
  @Column({ default: 'N', name: 'tem_poco_artesiano' })
  @ApiProperty({ description: 'Possui poço artesiano' })
  temPocoArtesiano: string;
  
  @Column({ default: 'N', name: 'tem_pista_cooper' })
  @ApiProperty({ description: 'Possui pista de cooper' })
  temPistaCooper: string;
  
  @Column({ default: 'N', name: 'tem_salao_festas' })
  @ApiProperty({ description: 'Possui salão de festas' })
  temSalaoFestas: string;
  
  @Column({ default: 'N', name: 'tem_central_gas' })
  @ApiProperty({ description: 'Possui central de gás' })
  temCentralGas: string;
  
  @Column({ default: 'N', name: 'tem_portao_eletronico' })
  @ApiProperty({ description: 'Possui portão eletrônico' })
  temPortaoEletronico: string;
  
  @Column({ default: 'N', name: 'tem_churrasqueira' })
  @ApiProperty({ description: 'Possui churrasqueira' })
  temChurrasqueira: string;
  
  @Column({ default: 'N', name: 'tem_guarita' })
  @ApiProperty({ description: 'Possui guarita' })
  temGuarita: string;
  
  @Column({ default: 'N', name: 'tem_sistema_seguranca' })
  @ApiProperty({ description: 'Possui sistema de segurança' })
  temSistemaSeguranca: string;
  
  @Column({ default: 'N', name: 'tem_pilotis' })
  @ApiProperty({ description: 'Possui pilotis' })
  temPilotis: string;
  
  @Column({ default: 'N', name: 'tem_armario_quarto' })
  @ApiProperty({ description: 'Possui armário no quarto' })
  temArmarioQuarto: string;
  
  @Column({ default: 'N', name: 'tem_box_banheiro' })
  @ApiProperty({ description: 'Possui box no banheiro' })
  temBoxBanheiro: string;
  
  @Column({ default: 'N', name: 'tem_dep_empregada' })
  @ApiProperty({ description: 'Possui dependência de empregada' })
  temDepEmpregada: string;
  
  @Column({ default: 'N', name: 'tem_dep_privativo' })
  @ApiProperty({ description: 'Possui depósito privativo' })
  temDepPrivativo: string;
  
  @Column({ default: 'N', name: 'tem_estacionamento' })
  @ApiProperty({ description: 'Possui estacionamento' })
  temEstacionamento: string;
  
  @Column({ default: 'N', name: 'tem_internet' })
  @ApiProperty({ description: 'Possui internet' })
  temInternet: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Está mobiliado' })
  mobiliado: string;
  
  @Column({ default: 'N', name: 'tem_tv_cabo' })
  @ApiProperty({ description: 'Possui TV a cabo' })
  temTvCabo: string;
  
  @Column({ default: 'N', name: 'tem_varanda' })
  @ApiProperty({ description: 'Possui varanda' })
  temVaranda: string;
  
  @Column({ default: 'N', name: 'tem_tabela_precos' })
  @ApiProperty({ description: 'Possui tabela de preços' })
  temTabelaPrecos: string;
  
  @Column({ default: 'N', name: 'tem_area_servico' })
  @ApiProperty({ description: 'Possui área de serviço' })
  temAreaServico: string;
  
  @Column({ default: 'N', name: 'tem_closet' })
  @ApiProperty({ description: 'Possui closet' })
  temCloset: string;
  
  @Column({ default: 'N', name: 'tem_copa' })
  @ApiProperty({ description: 'Possui copa' })
  temCopa: string;
  
  @Column({ default: 'N', name: 'tem_corredor' })
  @ApiProperty({ description: 'Possui corredor' })
  temCorredor: string;
  
  @Column({ default: 'N', name: 'tem_cozinha' })
  @ApiProperty({ description: 'Possui cozinha' })
  temCozinha: string;
  
  @Column({ default: 'N', name: 'tem_despensa' })
  @ApiProperty({ description: 'Possui despensa' })
  temDespensa: string;
  
  @Column({ default: 'N', name: 'tem_escritorio' })
  @ApiProperty({ description: 'Possui escritório' })
  temEscritorio: string;
  
  @Column({ default: 'N', name: 'tem_hidro' })
  @ApiProperty({ description: 'Possui hidromassagem' })
  temHidro: string;
  
  @Column({ default: 'N', name: 'tem_lavabo' })
  @ApiProperty({ description: 'Possui lavabo' })
  temLavabo: string;
  
  @Column({ default: 'N', name: 'tem_mezanino' })
  @ApiProperty({ description: 'Possui mezanino' })
  temMezanino: string;
  
  @Column({ default: 'N', name: 'tem_pergolado' })
  @ApiProperty({ description: 'Possui pergolado' })
  temPergolado: string;
  
  @Column({ default: 'N', name: 'tem_quarto_reversivel' })
  @ApiProperty({ description: 'Possui quarto reversível' })
  temQuartoReversivel: string;
  
  @Column({ default: 'N', name: 'tem_sala_estar' })
  @ApiProperty({ description: 'Possui sala de estar' })
  temSalaEstar: string;
  
  @Column({ default: 'N', name: 'tem_sala_intima' })
  @ApiProperty({ description: 'Possui sala íntima' })
  temSalaIntima: string;
  
  @Column({ default: 'N', name: 'tem_sala_jantar' })
  @ApiProperty({ description: 'Possui sala de jantar' })
  temSalaJantar: string;
  
  @Column({ default: 'N', name: 'tem_sala_visita' })
  @ApiProperty({ description: 'Possui sala de visita' })
  temSalaVisita: string;
  
  @Column({ default: 'N', name: 'tem_telefone' })
  @ApiProperty({ description: 'Possui telefone' })
  temTelefone: string;
  
  @Column({ default: 'N', name: 'tem_canil' })
  @ApiProperty({ description: 'Possui canil' })
  temCanil: string;
  
  @Column({ default: 'N', name: 'tem_jardim_externo' })
  @ApiProperty({ description: 'Possui jardim externo' })
  temJardimExterno: string;
  
  @Column({ default: 'N', name: 'tem_jardim_interno' })
  @ApiProperty({ description: 'Possui jardim interno' })
  temJardimInterno: string;
  
  @Column({ default: 'N', name: 'tem_lavanderia' })
  @ApiProperty({ description: 'Possui lavanderia' })
  temLavanderia: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Nascente' })
  nascente: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Poente' })
  poente: string;
  
  @Column({ default: 'N', name: 'rua_calcada' })
  @ApiProperty({ description: 'Rua calçada' })
  ruaCalcada: string;
  
  @Column({ default: 'N', name: 'tem_wc_servico' })
  @ApiProperty({ description: 'Possui WC de serviço' })
  temWcServico: string;
  
  @Column({ default: 'N', name: 'tem_bar' })
  @ApiProperty({ description: 'Possui bar' })
  temBar: string;
  
  @Column({ default: 'N', name: 'tem_sala_convivencia' })
  @ApiProperty({ description: 'Possui sala de convivência' })
  temSalaConvivencia: string;
  
  @Column({ default: 'N', name: 'tem_cozinha_americana' })
  @ApiProperty({ description: 'Possui cozinha americana' })
  temCozinhaAmericana: string;
  
  @Column({ default: 'N', name: 'tem_armario_cozinha' })
  @ApiProperty({ description: 'Possui armário na cozinha' })
  temArmarioCozinha: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Vista para o mar' })
  vistaMar: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Beira-mar' })
  beiraMar: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Condomínio fechado' })
  condominioFechado: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Cobertura' })
  cobertura: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Cobertura duplex' })
  coberturaDuplex: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Cobertura triplex' })
  coberturaTriplex: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar alto' })
  apartamentoAlto: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar baixo' })
  apartamentoBaixo: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar médio' })
  apartamentoMedio: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo' })
  apartamentoTerreo: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com jardim' })
  apartamentoTerreoJardim: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com piscina' })
  apartamentoTerreoPiscina: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com jardim e piscina' })
  apartamentoTerreoJardimPiscina: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com vista mar' })
  apartamentoTerreoVistaMar: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com vista mar e jardim' })
  apartamentoTerreoVistaMarJardim: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com vista mar e piscina' })
  apartamentoTerreoVistaMarPiscina: string;
  
  @Column({ default: 'N' })
  @ApiProperty({ description: 'Apartamento em andar térreo com vista mar, jardim e piscina' })
  apartamentoTerreoVistaMarJardimPiscina: string;
  
  // Arrays from DTO
  @Column('simple-array', { nullable: true })
  @ApiProperty({ type: [String], description: 'Lista de características do imóvel' })
  caracteristicasImovelList: string[];

  @Column('simple-array', { nullable: true })
  @ApiProperty({ type: [String], description: 'Lista de características do empreendimento' })
  caracteristicasEmpreendimentoList: string[];

  @Column({ nullable: true })
  @ApiProperty({ description: 'ID da construtora', required: false })
  construtora?: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Temporada', required: false })
  temporada?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Tipo padrão do imóvel', required: false })
  tipoPadraoImovel: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Disponível para venda', required: false })
  paraVenda: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Disponível para locação', required: false })
  paraLocacao: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Indica se o imóvel é novo', required: false })
  novos: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Indica se o imóvel é usado', required: false })
  usados: boolean;
}