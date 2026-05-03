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
        inicio: 0,
        ao_longo: 0,
        nativas: 0,
        runas: 0,
        weapons: [
            { id: 1, color: '#c070c0' },
            { id: 2, color: '#2b86ff' },
            { id: 3, color: '#5aaa68' },
        ]
    },
    list: [
        {
            name: '(NVL/RUNA/SORO) - nome_habilidade (outra_info)',
            description: `descrição_da_habilidade`,
            status: 'define_cor_do_card (COLAS_no_topo_do_arquivo)',
            gif: null // Adicionar o caminho do gif //
        },
    ]
}
