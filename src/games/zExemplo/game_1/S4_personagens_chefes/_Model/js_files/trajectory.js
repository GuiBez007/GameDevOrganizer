/*
  [=========== TRAJECTORY TYPES ============]
    normal     : fluxo normal
    intencao   : intenção do autor
    possivel   : desvios de fluxo
    explica    : explicação/detalhamento
    importante : melhores partes
  [=========================================]
*/

export const TRAJECTORY_DATA = {
  stats: {
    relevancia: 'relevância_no_JOGO',
    introScene: 'capítulo_de_entrada_na_SAGA',
    exitScene: 'capítulo_de_saída_na_SAGA',
},

  list: [
    {
      type: 'define_cor_do_card (COLAS_no_topo_do_arquivo)',
      title: 'titulo_do_card',
      text: `texto_do_card`,
      media: [
        { 
          name: 'palavra_termo_no_texto', 
          caption: 'label_da_imagem' ,
          src: null // Caminho da imagem //
        },
        {
          // Adicionar mais medias //
        }, 
      ],
      titleAlign: 'start_center_end'
    },
  ]
}
