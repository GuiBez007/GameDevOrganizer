/* 
    [=========== ABILITIES STATUS ===========]
        blue   : nativa nvl1 (segura)
        red    : nativa nvl2 (perigosa)
        purple : nativa nvl3 (CORINGA)
        yellow : externa (RUNA & SORO)
    [========================================]
*/

export const ABILITIES_DATA = {
    stats: {
        inicio: '2',
        ao_longo: '1',
        nativas: '3',
        runas: '0',
        weapons: [
            { id: 1, color: '#c070c0' },
            { id: 2, color: '#2b86ff' },
            { id: 3, color: '#5aaa68' },
        ]
    },
    list: [
        {
            name: 'NVL1 - Fúria (carregamento rápido)',
            description: `Aumenta o dano e velocidade de ataque do usuário`,
            status: 'blue',
            gif: null // Handled via glob in manager if needed
        },
        {
            name: 'NVL2 - Transformação Monstruosa (carregamento longo)',
            description: `O usuário adquire a habilidade de se transformar em um monstro, mas perde o controle de suas emoções`,
            status: 'red',
            gif: null
        },
        {
            name: 'NVL3 - ??? (CORINGA)',
            description: `habilidade adquirida apenas em condições especiais...`,
            status: 'purple',
            gif: null
        },

    ]
}