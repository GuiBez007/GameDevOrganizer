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

export const Aprendiz = {
  name:        'Desconhecida',
  title:       'A Aprendiz',
  color:       '#c070c0',
  badgeColor:  'purple',
  badgeText:   'final boss',
  description: 'Aprendiz da nossa futura mestra.',
  image:        null, // Caminho da imagem //

  imgs:    createImageMap(import.meta.glob('./imgs/*',   {eager: true, import: 'default'})),
  covers:  createImageMap(import.meta.glob('./covers/*', {eager: true, import: 'default'})),
  abilityGifs: createImageMap(import.meta.glob('./ability_gifs/*', {eager: true, import: 'default'})),

  trajectory: TRAJECTORY_DATA,
  abilities: ABILITIES_DATA,
  relations: RELATIONS_DATA
}
