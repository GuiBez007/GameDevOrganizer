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
        inicio: '3',
        ao_longo: '0',
        nativas: '3',
        runas: '0',
        weapons: [
            { id: 1, color: '#c03030' },
        ]
    },
    list: [
        {
            name: 'NVL1 - Controle de Mentes',
            description: `Permite ao usuário controlar as mentes de até 10 alvos.`,
            status: 'red',
            gif: null
        },
        {
            name: 'NVL2 - Cura Parcial',
            description: `Permite ao usuário curar parcial, restaurando uma porcentagem de sua vida para o máximo.`,
            status: 'red',
            gif: null
        },
        {
            name: 'NVL3 - Troca-Cor (CORINGA)',
            description: `Enquanto o usuário estiver em seu estado humano, sua habilidade é trocar de cores. Ao trocar de cor, ele consegue usar as habilidades de qualquer pessoa em seu alcance. Quanto mais tempo de recarga passar, maior o percentual de troca de cores. Pode chegar a 100% e fazer com que ele se torne completamente de outra cor, assim como pode adquirir a cor de outra pessoa no alcance de seu domínio`,
            status: 'purple',
            gif: null
        },

    ]
}