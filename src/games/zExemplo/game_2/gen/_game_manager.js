import { createImageMap } from '@/config/utils.js'

// S1 - Jornada Completa
import { JORNADA_DATA } from '../S1_jornada_completa_data.js'

// S2 - Areas do Jogo
import { AREAS_DATA } from '../S2_areas_do_jogo_data.js'

// S3 - Monstros e Criaturas
import { MONSTERS_DATA } from '../S3_monstros_criaturas_data.js'

// S4 - Personagens e Chefes
import { CHARACTERS_DATA } from '../S4_personagens_chefes/_section_manager.js'


export const game_2 = {
  title: 'Chapter II: The Tyrant Warrior',
  synopsis: "A história de um sobrevivente em um mundo pós-apocalíptico.",
  covers: createImageMap(import.meta.glob('./covers/*', {eager: true, import: 'default'})),
  imgs: createImageMap(import.meta.glob('./carousel_imgs/*', {eager: true, import: 'default'})),

  //  ─ Sections: data for each GameCard navbar tab ─
  sections: {
    S1_jornada_completa: { 
      content: JORNADA_DATA,
      },
    S2_areas_do_jogo: AREAS_DATA,
    S3_monstros_criaturas: MONSTERS_DATA,
    S4_personagens_chefes: CHARACTERS_DATA,
  }
}
