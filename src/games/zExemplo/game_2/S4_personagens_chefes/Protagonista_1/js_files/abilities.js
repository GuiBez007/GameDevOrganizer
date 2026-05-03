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
        inicio: '0',
        ao_longo: '2',
        nativas: '0',
        runas: '0',
        weapons: [
            { id: 1, color: '#c03030' },
        ]
    },
    list: [
        {
            name: 'NVL2 - Intensificar',
            description: `Aumenta o poder de ataque do personagem`,
            status: 'red',
            gif: null
        }, {
            name: 'SORO - (Memory Invasion)',
            description: `Invade a memória de outras pessoas.`,
            status: 'yellow',
            gif: null
        },
    ]
}