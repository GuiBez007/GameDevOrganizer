/*
  [============ JORNADA TYPES =============]
    normal     : fluxo normal
    intencao   : intenção do autor
    possivel   : desvios de fluxo
    explica    : explicação/detalhamento
    importante : melhores partes
  [========================================]
*/

export const JORNADA_DATA = [
    {
        type: 'normal',
        title: 'Contexto Geral',
        text: `Eles começam andando e caçando monstros em missões`,
        media: [
            { name: 'monstros', src: null, caption: 'Monstros Sanguinarios' },
        ],
        position: 'start',
    },                              
    {
        type: 'importante',
        title: 'Parte do ataque do bebum',
        text: `E então, um bebum aparece e ataca eles.
            Eles lutam e conseguem derrotar ele, mas por causa do dano que ele levou, ele cria um buraco negro e suga eles para dentro.
        `,
        media: [
            
        ],
        position: 'start',
    },                              
]
