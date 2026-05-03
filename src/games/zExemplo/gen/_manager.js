import { createImageMap } from '@/config/utils.js'

const mainCover = import.meta.glob('./covers/*', { eager: true, import: 'default' })

import { game_1 } from '../game_1/gen/_game_manager.js'
import { game_2 } from '../game_2/gen/_game_manager.js'

// 👇 Define os dados dos jogos //
const Exemplo = {
  title: "Exemplo",
  covers: createImageMap(mainCover),

  game_1, game_2
}
export default Exemplo;
