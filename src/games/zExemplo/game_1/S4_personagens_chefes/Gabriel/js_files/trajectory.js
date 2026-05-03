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
    relevancia: 'o mais forte da guilda',
    introScene: 'Capítulo I',
    exitScene: 'Capítulo VII',
  },

  list: [
    {
      type: 'normal',
      title: 'Início da Jornada',
      text: `A jornada do PERSONAGEM começa na VILA INICIAL. Lá, ele encontra o SEU primeiro desafio DESAFIO e obtém a ESPADA SAGRADA.`,
      media: [
        { name: 'PERSONAGEM', src: null, caption: 'Protagonista' },
        { name: 'VILA INICIAL', src: null, caption: 'Vila de Início' },
        { name: 'ESPADA SAGRADA', src: null, caption: 'Espada de Ferro' },
        { name: 'obtém', src: null, caption: 'Espada de Ferro' },
        { name: 'primeiro', src: null, caption: 'Espada de Ferro' }
      ],
      titleAlign: 'start'
    },
    {
      type: 'explica',
      title: 'Meio da Trama',
      text: `Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA. É um LUGAR PERIGOSO onde as sombras parecem ganhar vida.
        Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA.
        Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA.
        Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA.
        Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA.
        
        Após deixar a vila, o PERSONAGEM entra na FLORESTA SOMBRIA.`,
      media: [
        { name: 'PERSONAGEM', src: null, caption: 'Protagonista' },
        { name: 'FLORESTA SOMBRIA', src: null, caption: 'Floresta Densa' },
        { name: 'LUGAR PERIGOSO', src: null, caption: 'Covil do Lobo' }
      ],
      titleAlign: 'center'
    }
  ]
}