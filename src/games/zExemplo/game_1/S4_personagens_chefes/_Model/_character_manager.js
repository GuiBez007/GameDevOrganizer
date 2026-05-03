import { createImageMap } from '@/config/utils.js'

import { TRAJECTORY_DATA } from './js_files/trajectory.js'
import { ABILITIES_DATA }  from './js_files/abilities.js'
import { RELATIONS_DATA }  from './js_files/relations.js'

/*
  [===== CHARACTER STATUS =====]
    blue   : aliado
    yellow : neutro
    red    : inimigo
    purple : inimigo mortal
  [============================]
*/

export const NomePersonagem = {
  name:        'nome_do_personagem',
  title:       'titulo_do_personagem',
  color:       '#c070c0',
  badgeColor:  'define_cor_da_badge (COLAS_no_topo_do_arquivo)',
  badgeText:   'texto_da_badge',
  description: 'descrição_do_personagem',
  image:        null, // Caminho da imagem - 1000x1400px //

  imgs:        createImageMap(import.meta.glob('./imgs/*',         {eager: true, import: 'default'})),
  covers:      createImageMap(import.meta.glob('./covers/*',       {eager: true, import: 'default'})),
  abilityGifs: createImageMap(import.meta.glob('./ability_gifs/*', {eager: true, import: 'default'})),

  trajectory:  TRAJECTORY_DATA,
  abilities:   ABILITIES_DATA,
  relations:   RELATIONS_DATA
}

