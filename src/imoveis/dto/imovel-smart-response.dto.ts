import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { FotoImovelSmartDto } from './foto-imovel-smart.dto';

@Exclude()

export class ImovelSmartResponseDto {

  @Expose()
  @ApiProperty({ description: 'ID único do imóvel' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'Código de referência do imóvel' })
  codigoReferenciaImovel: string;

  @Expose()
  @ApiProperty({ description: 'Nome do imóvel' })
  nomeImovel: string;

  @Expose()
  @ApiProperty({ description: 'Preço do imóvel' })
  preco: number;

  @Expose()
  @ApiProperty({ description: 'Endereço do imóvel' })
  endereco: string;

  @Expose()
  @ApiProperty({ description: 'Número do endereço' })
  numero: string;

  @Expose()
  @ApiProperty({ description: 'Área útil em m²' })
  areautil: number;

  @Expose()
  @ApiProperty({ description: 'Área total em m²' })
  area: number;

  @Expose()
  @ApiProperty({ description: 'Área do terreno em m²', required: false })
  areaterreno?: string;

  @Expose()
  @ApiProperty({ description: 'Unidade', required: false })
  unidade?: string;

  @Expose()
  @ApiProperty({ description: 'Unidade de medida' })
  unidade2: string;

  @Expose()
  @ApiProperty({ description: 'Indica se o imóvel é novo', required: false })
  novo?: boolean;

  @Expose()
  @ApiProperty({ description: 'Valor do IPTU' })
  iptu: number;

  @Expose()
  @ApiProperty({ description: 'Valor da parcela do IPTU' })
  vlrparcelaiptu: number;

  @Expose()
  @ApiProperty({ description: 'Valor do condomínio' })
  condominio: number;

  @Expose()
  @ApiProperty({ description: 'Número de quartos' })
  nquartos: string;

  @Expose()
  @ApiProperty({ description: 'Número de suítes' })
  nsuites: number;

  @Expose()
  @ApiProperty({ description: 'Número de vagas de garagem' })
  ngaragens: string;

  @Expose()
  @ApiProperty({ description: 'ID da foto de destaque' })
  fotodestaque: number;

  @Expose()
  @ApiProperty({ description: 'Indica se o imóvel está em exposição' })
  expoimovel: string;

  @Expose()
  @ApiProperty({ description: 'Indica se o imóvel está no site' })
  siteimob: string;

  @Expose()
  @ApiProperty({ description: 'Localização', required: false })
  localizacao?: string;

  @Expose()
  @ApiProperty({ description: 'Complemento do endereço', required: false })
  complemento?: string;

  @Expose()
  @ApiProperty({ description: 'Descrição do imóvel' })
  descricao: string;

  @Expose()
  @ApiProperty({ description: 'Categoria do imóvel' })
  categoria: string;

  @Expose()
  @ApiProperty({ description: 'Tipo do imóvel' })
  tipoImovel: string;

  @Expose()
  @ApiProperty({ description: 'ID do tipo de imóvel' })
  idTipoImovel: string;

  @Expose()
  @ApiProperty({ description: 'Subtipo do imóvel' })
  subtipoImovel: string;

  @Expose()
  @ApiProperty({ description: 'ID do subtipo de imóvel' })
  idSubtipoImovel: number;

  @Expose()
  @ApiProperty({ description: 'Tipo de operação' })
  tipoOperacao: string;

  @Expose()
  @ApiProperty({ description: 'Descrição do tipo de operação' })
  descricaoTipoOperacao: string;

  @Expose()
  @ApiProperty({ description: 'Nome do bairro' })
  nomeBairro: string;

  @Expose()
  @ApiProperty({ description: 'Nome da cidade' })
  nomeCidade: string;

  @Expose()
  @ApiProperty({ description: 'Sigla do estado' })
  siglaEstado: string;

  @Expose()
  @ApiProperty({ description: 'Nome do estado' })
  nomeEstado: string;

  @Expose()
  @ApiProperty({ description: 'Tipo de contrato' })
  tipoContrato: string;

  @Expose()
  @ApiProperty({ description: 'Data de cadastro do imóvel' })
  dataCadastroImovel: string;

  @Expose()
  @ApiProperty({ description: 'Data da última atualização' })
  atualizadoem: string;

  @Expose()
  @ApiProperty({ description: 'Data da última atualização das fotos' })
  dataAtualizacaoFotos: string;

  @Expose()
  @ApiProperty({ description: 'Mostrar endereço na internet' })
  endMostrarInternet: string;

  @Expose()
  @ApiProperty({ description: 'Mostrar nome na internet' })
  nomeMostrarInternet: string;

  @Expose()
  @ApiProperty({ description: 'ID da construtora', required: false })
  construtora?: number;

  @Expose()
  @ApiProperty({ description: 'Temporada', required: false })
  temporada?: string;

  // Características do imóvel (boolean-like strings)
  @ApiProperty({ description: 'Possui interfone' })
  temInterfone: string;
  
  @ApiProperty({ description: 'Possui antena coletiva' })
  temAntenaColetiva: string;
  
  @ApiProperty({ description: 'Possui piscina' })
  temPiscina: string;
  
  @ApiProperty({ description: 'Possui playground' })
  temPlayground: string;
  
  @ApiProperty({ description: 'Possui gerador' })
  temGerador: string;
  
  @ApiProperty({ description: 'Possui quadra esportiva' })
  temQuadraEsportiva: string;
  
  @ApiProperty({ description: 'Possui sauna' })
  temSauna: string;
  
  @ApiProperty({ description: 'Possui sala de ginástica' })
  temSalaGinastica: string;
  
  @ApiProperty({ description: 'Possui poço artesiano' })
  temPocoArtesiano: string;
  
  @ApiProperty({ description: 'Possui pista de cooper' })
  temPistaCooper: string;
  
  @ApiProperty({ description: 'Possui salão de festas' })
  temSalaoFestas: string;
  
  @ApiProperty({ description: 'Possui central de gás' })
  temCentralGas: string;
  
  @ApiProperty({ description: 'Possui portão eletrônico' })
  temPortaoEletronico: string;
  
  @ApiProperty({ description: 'Possui churrasqueira' })
  temChurrasqueira: string;
  
  @ApiProperty({ description: 'Possui guarita' })
  temGuarita: string;
  
  @ApiProperty({ description: 'Possui sistema de segurança' })
  temSistemaSeguranca: string;
  
  @ApiProperty({ description: 'Possui pilotis' })
  temPilotis: string;
  
  @ApiProperty({ description: 'Possui armário no quarto' })
  temArmarioQuarto: string;
  
  @ApiProperty({ description: 'Possui box no banheiro' })
  temBoxBanheiro: string;
  
  @ApiProperty({ description: 'Possui dependência de empregada' })
  temDepEmpregada: string;
  
  @ApiProperty({ description: 'Possui depósito privativo' })
  temDepPrivativo: string;
  
  @ApiProperty({ description: 'Possui estacionamento' })
  temEstacionamento: string;
  
  @ApiProperty({ description: 'Possui internet' })
  temInternet: string;
  
  @ApiProperty({ description: 'Está mobiliado' })
  mobiliado: string;
  
  @ApiProperty({ description: 'Possui TV a cabo' })
  temTvCabo: string;
  
  @ApiProperty({ description: 'Possui varanda' })
  temVaranda: string;
  
  @ApiProperty({ description: 'Possui tabela de preços' })
  temTabelaPrecos: string;
  
  @ApiProperty({ description: 'Possui área de serviço' })
  temAreaServico: string;
  
  @ApiProperty({ description: 'Possui closet' })
  temCloset: string;
  
  @ApiProperty({ description: 'Possui copa' })
  temCopa: string;
  
  @ApiProperty({ description: 'Possui corredor' })
  temCorredor: string;
  
  @ApiProperty({ description: 'Possui cozinha' })
  temCozinha: string;
  
  @ApiProperty({ description: 'Possui despensa' })
  temDespensa: string;
  
  @ApiProperty({ description: 'Possui escritório' })
  temEscritorio: string;
  
  @ApiProperty({ description: 'Possui hidromassagem' })
  temHidro: string;
  
  @ApiProperty({ description: 'Possui lavabo' })
  temLavabo: string;
  
  @ApiProperty({ description: 'Possui mezanino' })
  temMezanino: string;
  
  @ApiProperty({ description: 'Possui pergolado' })
  temPergolado: string;
  
  @ApiProperty({ description: 'Possui quarto reversível' })
  temQuartoReversivel: string;
  
  @ApiProperty({ description: 'Possui sala de estar' })
  temSalaEstar: string;
  
  @ApiProperty({ description: 'Possui sala íntima' })
  temSalaIntima: string;
  
  @ApiProperty({ description: 'Possui sala de jantar' })
  temSalaJantar: string;
  
  @ApiProperty({ description: 'Possui sala de visita' })
  temSalaVisita: string;
  
  @ApiProperty({ description: 'Possui telefone' })
  temTelefone: string;
  
  @ApiProperty({ description: 'Possui canil' })
  temCanil: string;
  
  @ApiProperty({ description: 'Possui jardim externo' })
  temJardimExterno: string;
  
  @ApiProperty({ description: 'Possui jardim interno' })
  temJardimInterno: string;
  
  @ApiProperty({ description: 'Possui lavanderia' })
  temLavanderia: string;
  
  @ApiProperty({ description: 'Nascente' })
  nascente: string;
  
  @ApiProperty({ description: 'Poente' })
  poente: string;
  
  @ApiProperty({ description: 'Rua calçada' })
  ruaCalcada: string;
  
  @ApiProperty({ description: 'Possui WC de serviço' })
  temWcServico: string;
  
  @ApiProperty({ description: 'Possui bar' })
  temBar: string;
  
  @ApiProperty({ description: 'Possui sala de convivência' })
  temSalaConvivencia: string;
  
  @ApiProperty({ description: 'Possui cozinha americana' })
  temCozinhaAmericana: string;
  
  @ApiProperty({ description: 'Possui armário na cozinha' })
  temArmarioCozinha: string;
  
  @ApiProperty({ description: 'Possui cerâmica' })
  temCeramica: string;
  
  @ApiProperty({ description: 'É cercado' })
  cercado: string;
  
  @ApiProperty({ description: 'É conjugada' })
  conjugada: string;
  
  @ApiProperty({ description: 'Possui documentação' })
  temDocumentacao: string;
  
  @ApiProperty({ description: 'Possui escritura' })
  temEscritura: string;
  
  @ApiProperty({ description: 'Possui esquadrilha' })
  temEsquadrilha: string;
  
  @ApiProperty({ description: 'É gradeado' })
  gradeado: string;
  
  @ApiProperty({ description: 'É isolado' })
  isolado: string;
  
  @ApiProperty({ description: 'É murado' })
  murado: string;
  
  @ApiProperty({ description: 'Possui piso' })
  temPiso: string;
  
  @ApiProperty({ description: 'Possui quarto depósito' })
  temQuartoDeposito: string;
  
  @ApiProperty({ description: 'Está quitado' })
  quitado: string;
  
  @ApiProperty({ description: 'Possui roda no teto' })
  temRodaTeto: string;
  
  @ApiProperty({ description: 'Tem sol' })
  sol: string;
  
  @ApiProperty({ description: 'Tem sombra' })
  sombra: string;
  
  @ApiProperty({ description: 'Tem vista para lagoa' })
  vistaLagoa: string;
  
  @ApiProperty({ description: 'Tem vista para mata' })
  vistaMata: string;
  
  @ApiProperty({ description: 'Tem vista para o mar' })
  vistaMar: string;
  
  @ApiProperty({ description: 'É beira mar' })
  beiraMar: string;
  
  @ApiProperty({ description: 'Possui caixa d\'água' })
  caixaDagua: string;
  
  @ApiProperty({ description: 'É em esquina' })
  esquina: string;
  
  @ApiProperty({ description: 'Possui salão de jogos' })
  salaoJogos: string;
  
  @ApiProperty({ description: 'Possui cisterna' })
  sisterna: string;
  
  @ApiProperty({ description: 'É lajeado' })
  lajeado: string;
  
  @ApiProperty({ description: 'Tem muro alto' })
  temMuroAlto: string;
  
  @ApiProperty({ description: 'Tem quintal' })
  temQuintal: string;
  
  @ApiProperty({ description: 'Tem terraço' })
  temTerraco: string;
  
  @ApiProperty({ description: 'Tem estacionamento para visitantes' })
  temEstacionamentoVisitantes: string;
  
  @ApiProperty({ description: 'É saneado' })
  saneado: string;
  
  @ApiProperty({ description: 'Tem business center' })
  temBusinessCenter: string;
  
  @ApiProperty({ description: 'Tem central de fax e recados' })
  temCentralFaxRecados: string;
  
  @ApiProperty({ description: 'Tem coffee shop' })
  temCoffeeShop: string;
  
  @ApiProperty({ description: 'Tem home office' })
  temHomeOffice: string;
  
  @ApiProperty({ description: 'Tem serviço de limpeza nas unidades' })
  temLimpezaUnidades: string;
  
  @ApiProperty({ description: 'Tem serviço de manutenção nas unidades' })
  temManutencaoUnidades: string;
  
  @ApiProperty({ description: 'Tem sala de convenções' })
  temSalaConvencoes: string;
  
  @ApiProperty({ description: 'Tem espaço gourmet' })
  temEspacoGourmet: string;
  
  @ApiProperty({ description: 'Tem coleta de lavanderia' })
  temColetaLavanderia: string;
  
  @ApiProperty({ description: 'Tem restaurante' })
  temRestaurante: string;
  
  @ApiProperty({ description: 'Tem pátio para descarga' })
  temPatioDescarga: string;
  
  @ApiProperty({ description: 'Tem tela na varanda' })
  temTelaNaVaranda: string;
  
  @ApiProperty({ description: 'Tem armários projetados' })
  temArmariosProjetados: string;
  
  @ApiProperty({ description: 'Tem elevador inteligente' })
  temElevadorInteligente: string;
  
  @ApiProperty({ description: 'Tem ar condicionado central' })
  temArcondicionadoCentral: string;
  
  @ApiProperty({ description: 'Tem ar condicionado split' })
  temArcondicionadoSplit: string;
  
  @ApiProperty({ description: 'Tem bicicletário' })
  temBicicletario: string;
  
  @ApiProperty({ description: 'Tem elevador panorâmico' })
  temElevadorPanoramico: string;
  
  @ApiProperty({ description: 'Tem ar condicionado de parede' })
  temArcondicionadoParede: string;
  
  @ApiProperty({ description: 'Tem cerca elétrica' })
  temCercaEletrica: string;
  
  @ApiProperty({ description: 'Tem terraço em L' })
  temTerracoEmL: string;
  
  @ApiProperty({ description: 'Tem garagem coberta' })
  temGaragemCoberta: string;
  
  @ApiProperty({ description: 'Tem edícula' })
  temEdicula: string;
  
  @ApiProperty({ description: 'Tem piso elevado' })
  temPisoElevado: string;
  
  @ApiProperty({ description: 'Tem depósito no subsolo' })
  temDepositoSubsolo: string;
  
  @ApiProperty({ description: 'Tem luz elétrica' })
  temLuzEletrica: string;
  
  @ApiProperty({ description: 'Tem água encanada' })
  temAguaEncanada: string;
  
  @ApiProperty({ description: 'Tem vista aberta' })
  temVistaAberta: string;
  
  @ApiProperty({ description: 'É foreiro' })
  foreiro: string;
  
  @ApiProperty({ description: 'Pode financiar' })
  podefinanciar: string;
  
  @ApiProperty({ description: 'É destaque' })
  destaque: string;
  
  @ApiProperty({ description: 'É destaque no banner' })
  destaquebanner: string;
  
  @ApiProperty({ description: 'Tem vista para rio' })
  vistaRio: string;
  
  @ApiProperty({ description: 'Tem hidrômetro individual' })
  temHidrometroIndividual: string;
  
  @ApiProperty({ description: 'Tem portaria 24h' })
  temPortaria24h: string;
  
  @ApiProperty({ description: 'É litoral' })
  litoral: string;
  
  @ApiProperty({ description: 'É popular' })
  popular: string;
  
  @ApiProperty({ description: 'É cobertura' })
  cobertura: string;
  
  @ApiProperty({ description: 'É condomínio fechado' })
  condominioFechado: string;
  
  @ApiProperty({ description: 'É triplex' })
  triplex: string;
  
  @ApiProperty({ description: 'É duplex' })
  duplex: string;
  
  @ApiProperty({ description: 'É de vila' })
  deVila: string;
  
  @ApiProperty({ description: 'Número de elevadores' })
  nelevadores: string;
  
  @ApiProperty({ description: 'Andar do apartamento' })
  aptoAndar: string;
  
  @ApiProperty({ description: 'Número de andares' })
  nandares: string;
  
  @ApiProperty({ description: 'Número de ambientes' })
  nambientes: number;
  
  @ApiProperty({ description: 'Número de salas' })
  nsalas: number;
  
  @ApiProperty({ description: 'Número de banheiros sociais' })
  nbanheirossociais: number;

  @Expose()
  @ApiProperty({ type: () => [FotoImovelSmartDto], description: 'Lista de fotos do imóvel' })
  fotoImovelList: FotoImovelSmartDto[];

  @Expose()
  @ApiProperty({ type: [String], description: 'Lista de características do imóvel' })
  caracteristicasImovelList: string[];

  @Expose()
  @ApiProperty({ type: [String], description: 'Lista de características do empreendimento' })
  caracteristicasEmpreendimentoList: string[];

  @Expose()
  @ApiProperty({ description: 'Ordenação por status do imóvel' })
  statusImovelOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Ordenação por área útil' })
  areaUtilOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Ordenação por quartos' })
  quartoOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Ordenação por preço de locação' })
  precoLocacaoOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Ordenação por preço de venda' })
  precoVendaOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Ordenação por preço (venda/locação)' })
  precoVendaLocacaoOrdenacao: number;

  @Expose()
  @ApiProperty({ description: 'Preço para ordenação' })
  precoMerge: number;

  @Expose()
  @ApiProperty({ description: 'URL da página de detalhes do imóvel' })
  urlDetalhe: string;

  @Expose()
  @ApiProperty({ description: 'URL customizada' })
  urlCustom: string;

  @Expose()
  @ApiProperty({ description: 'URL da ficha pública' })
  urlFichaPublica: string;

  @Expose()
  @ApiProperty({ description: 'URL para impressão' })
  urlImpressao: string;

  @Expose()
  @ApiProperty({ description: 'URL da foto de destaque' })
  urlFotoDestaque: string;

  @Expose()
  @ApiProperty({ description: 'Sala personalizada' })
  salaPersonalizado: string;

  @Expose()
  @ApiProperty({ description: 'Slogan do imóvel' })
  slogan: string;

  @Expose()
  @ApiProperty({ description: 'Código do imóvel de origem', required: false })
  codImovelOrigem?: string;

  @Expose()
  @ApiProperty({ description: 'Latitude' })
  latitude: string;

  @Expose()
  @ApiProperty({ description: 'Longitude' })
  longitude: string;

  @Expose()
  @ApiProperty({ description: 'Tipo padrão do imóvel' })
  tipoPadraoImovel: number;

  @Expose()
  @ApiProperty({ description: 'Nome do padrão do imóvel' })
  nomePadraoImovel: string;

  @Expose()
  @ApiProperty({ description: 'URL do tour virtual', required: false })
  tourVirtual?: string;

  @Expose()
  @ApiProperty({ description: 'Status de validação' })
  statusValidacao: number;

  @Expose()
  @ApiProperty({ description: 'Disponível para venda' })
  paraVenda: boolean;

  @Expose()
  @ApiProperty({ description: 'Disponível para locação' })
  paraLocacao: boolean;

  @Expose()
  @ApiProperty({ description: 'Novos' })
  novos: boolean;

  @Expose()
  @ApiProperty({ description: 'Usados' })
  usados: boolean;
}
