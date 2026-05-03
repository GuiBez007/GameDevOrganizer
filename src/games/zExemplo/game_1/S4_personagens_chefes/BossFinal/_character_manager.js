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

export const BossFinal = {
  name:        'BossFinal',
  title:       'O vilão',
  color:       '#120',
  badgeColor:  'red',
  badgeText:   '-',
  description: 'Boss muito forte que aparece de repente. Gosta de brincar com seus inimigos antes de mata-los.',
  image:        null, // Caminho da imagem //

  imgs:    createImageMap(import.meta.glob('./imgs/*',   {eager: true, import: 'default'})),
  covers:  createImageMap(import.meta.glob('./covers/*', {eager: true, import: 'default'})),
  abilityGifs: createImageMap(import.meta.glob('./ability_gifs/*', {eager: true, import: 'default'})),

  trajectory: TRAJECTORY_DATA,
  abilities: ABILITIES_DATA,
  relations: RELATIONS_DATA
}
