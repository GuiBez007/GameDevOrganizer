# 🎮 GameDevOrganizer

**GameDevOrganizer** é um hub centralizado e visualmente deslumbrante para a gestão de projetos de desenvolvimento de jogos. Focado em organização modular e visualização de alta fidelidade, ele transforma documentos de design estáticos em uma experiência interativa e imersiva.

---

## ✨ Funcionalidades Principais

- **🏗️ Arquitetura Modular:** Organize suas sagas e capítulos de forma independente. O sistema de dados descentralizado permite escalabilidade total para narrativas complexas.
- **📖 Jornada do Jogador:** Mapeie a trajetória completa da história, com suporte para quebras de capítulos e storyboards.
- **👥 Gestão de Personagens e Chefes:** Perfis detalhados incluindo habilidades, trajetória emocional, relações interpessoais e galerias de arte.
- **🌍 Construção de Mundo:** Módulos dedicados para áreas do jogo, cenários e design de criaturas (monstros).
- **🎨 Design Premium:** Interface moderna com glassmorphism, animações suaves e carrosséis interativos, garantindo que sua visão criativa seja apresentada com a melhor qualidade.
- **🖼️ Integração de Ativos:** Mapeamento fácil de wireframes, concept art e sprites diretamente nos módulos correspondentes.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as tecnologias mais modernas de desenvolvimento web:

- **Frontend:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Estilização:** CSS Modules & Vanilla CSS (Design Systems personalizados)
- **Asset Management:** Importação dinâmica e mapeamento automático de imagens.

---

## 📂 Estrutura do Projeto

A organização dos arquivos reflete a modularidade do sistema:

```text
src/
├── components/      # Componentes de UI (Modais, Seletores, etc.)
├── games/           # Dados específicos dos jogos (Sagas, Capítulos, Seções)
│   └── TheRevoltSaga/
│       ├── gen/     # Gerenciadores globais da saga
│       └── game_1/  # Conteúdo específico do Capítulo I
├── pages/           # Visualizações principais (Home, GameCard, Characters)
└── styles/          # Tokens de design e estilos globais
```

---

## 🛠️ Como Iniciar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GuiBez007/GameDevOrganizer.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 📸 Visualização

Você pode encontrar os rascunhos e wireframes da interface na pasta `public/Wireframes/`. O projeto utiliza esses guias para garantir uma experiência de usuário consistente e intuitiva.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Feito com ❤️ para desenvolvedores de jogos.
