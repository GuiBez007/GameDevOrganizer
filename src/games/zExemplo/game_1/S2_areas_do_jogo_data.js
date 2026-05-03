/* 
   Suggested Badge Text:
   Comum, Domínio, Oculto, Lendário, Perigoso, 
   Seguro, Capital, Vila, Dungeon
*/

/*
    [======= RELATION STATUS =======]
        blue   : seguro
        yellow : área livre
        red    : território inimigo
        purple : domínio
    [===============================]
*/

export const AREAS_DATA = {
    list: [
        {
            name: 'Vila Inicial',
            title: 'Vila de Pescadores',
            desc: 'Uma vila pacífica onde a jornada começa. O cheiro de mar e peixe fresco domina o ar.',
            monsters: 'Nenhum (Área Segura)',
            badgeColor: 'blue',
            badgeText: 'Seguro',
            image: null
        },
        {
            name: 'Caverna Sombria',
            title: 'Dungeon Nível 1',
            desc: 'Uma caverna úmida e escura nos arredores da vila. Dizem que tesouros antigos estão escondidos aqui.',
            monsters: 'Morcegos, Slimes de Gelo, Esqueletos Pequenos',
            badgeColor: 'red',
            badgeText: 'território inimigo',
            image: null
        },
        {
            name: 'Caminho do Rei',
            title: 'Estrada Principal',
            desc: 'Uma estrada movimentada que liga a vila à capital. Muitos mercadores passam por aqui diariamente.',
            monsters: 'Ladrões de Estrada, Lobos Famintos',
            badgeColor: 'yellow',
            badgeText: 'área livre',
            image: null
        },
        {
            name: 'Castelo Central',
            title: 'Sede do Reino',
            desc: 'O imponente castelo que governa toda a região. Suas torres podem ser vistas a quilômetros de distância.',
            monsters: 'Guardas Reais, Cavaleiros de Elite',
            badgeColor: 'purple',
            badgeText: 'domínio',
            image: null
        },
        {
            name: 'Caminho do Rei',
            title: 'Estrada Principal',
            desc: 'Uma estrada movimentada que liga a vila à capital. Muitos mercadores passam por aqui diariamente.',
            monsters: 'Ladrões de Estrada, Lobos Famintos',
            badgeColor: 'yellow',
            badgeText: 'área livre',
            image: null
        },
        {
            name: 'Castelo Central',
            title: 'Sede do Reino',
            desc: 'O imponente castelo que governa toda a região. Suas torres podem ser vistas a quilômetros de distância.',
            monsters: 'Guardas Reais, Cavaleiros de Elite',
            badgeColor: 'purple',
            badgeText: 'domínio',
            image: null
        },
    ]
}
