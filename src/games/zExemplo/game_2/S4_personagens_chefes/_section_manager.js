import { Aprendiz } from './Aprendiz/_character_manager.js'
import { Protagonista } from './Protagonista_1/_character_manager.js'

// Aqui dá para gerenciar a ordem em que os personagens aparecem na sidebar //

export const CHARACTERS_DATA = {
  chars: [
    Protagonista,
    Aprendiz,
  ]
}
