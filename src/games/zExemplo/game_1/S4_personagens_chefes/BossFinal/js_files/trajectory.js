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
    relevancia: '',
    introScene: 'Capítulo I',
    exitScene: 'Capítulo I',
  },

  list: [
    {
      type: 'importante',
      title: 'Conclusão',
      text: `O PERSONAGEM 2 é encontrado no ACAMPAMENTO ALIADO. Ele decide se juntar à busca para salvar o REINO.`,
      media: [
        { name: 'PERSONAGEM 2', src: null, caption: 'Aliado' },
        { name: 'ACAMPAMENTO ALIADO', src: null, caption: 'Acampamento Base' },
        { name: 'REINO', src: null, caption: 'Castelo de Ouro' }
      ],
      titleAlign: 'end'
    }
  ]
}