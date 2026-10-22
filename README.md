# Memorial Dom Bosco · UNDB (Fase 1: MVP visual)

Protótipo navegável do Memorial, feito a partir do Documento de Requisitos (RF01 a RF04 e RNF01 a RNF04). Funciona só com dados de exemplo: não há banco de dados nem login. As telas de Check-in e Encontrar colega (RF07 a RF09) estão como demonstração e guardam os dados só no aparelho (Fases 2 e 3 trazem o Supabase).

Stack: React + Vite + Tailwind CSS v4 + React Router. As fontes (Playfair Display nos títulos, anos e legendas; Inter no corpo, menus e botões) vêm embutidas no projeto, então o totem funciona sem internet.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento (endereço: http://localhost:5173)
npm run build    # gera a pasta dist/
npm run preview  # testa o build
```

Para ver no celular (mesmo Wi-Fi): `npm run dev -- --host` e abra o endereço de rede que o terminal mostrar.

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. Deixe as configurações detectadas (Framework: Vite, build `npm run build`, saída `dist`) e clique em **Deploy**.

O `vercel.json` já faz as rotas `/historia`, `/fotos` e `/videos` funcionarem ao recarregar a página.

## O que cada requisito virou

| Requisito | Onde está |
| --- | --- |
| RF01 Landing + cabeçalho único | `src/pages/Landing.jsx`, `src/components/Cabecalho.jsx` |
| RF02 História (linha do tempo vertical com ícones) | `src/pages/History.jsx` |
| RF03 Fotos agrupadas por ano, com lightbox e legenda | `src/pages/Photos.jsx` |
| RF04 Vídeos com ano, descrição, filtros por categoria e player | `src/pages/Videos.jsx` |
| RF07 a RF09 Check-in (QR Code + formulário com consentimento) e Encontrar colega (busca com teclado na tela) | `src/pages/CheckIn.jsx`, `CheckInForm.jsx`, `Colegas.jsx` (demonstração) |
| RNF02 Responsivo a partir de 360px | testado em 360px, tablet, totem em pé e desktop |
| RNF04 Acessibilidade | contraste, textos alternativos, navegação por teclado, atalho "Ir para o conteúdo", respeita "reduzir movimento" |

## Onde trocar o conteúdo

Todo o conteúdo está em `src/data/mock.js`, e **tudo ali é texto de exemplo**.

- **Linha do tempo:** edite `linhaDoTempo` (ano, título, texto e `icone`: escola, capelo, livro, trofeu ou estrela).
- **Pessoas da busca:** edite `pessoas`.
- **Ano do Memorial:** o último marco da linha do tempo é 2026 (inauguração). A faixa "1985 — 2026" da tela inicial usa o primeiro e o último marco.
- **Fotos:** coloque o arquivo em `public/fotos/` e preencha `src` com `'/fotos/nome.jpg'`. Mantenha a lista em ordem de ano. Sem `src`, aparece uma ilustração de exemplo (`cena`, em `src/components/Cenas.jsx`).
- **Vídeos:** preencha `youtubeId` com o código do vídeo (a parte depois de `v=` na URL). As categorias são Entrevistas, Eventos e Institucional.

## Identidade visual provisória

- **Paleta:** estimada a partir das referências. Para trocar pela oficial do marketing, edite as cores no topo de `src/index.css` (bloco `@theme`).
- **Brasão:** `src/components/Brasao.jsx` tem um brasão provisório. Quando o SVG oficial chegar, troque o conteúdo do componente por `<img src="/brasao.svg" />` (arquivo em `public/`).
- **Aquarela da fachada:** hoje é um fundo de manchas suaves na landing. A imagem real pode entrar no lugar em `src/pages/Landing.jsx`.

## Modo totem

Abra o site com `?totem=1` (por exemplo, como página inicial do Fully Kiosk Browser). Nesse modo, a busca de colegas abre um teclado na tela ao tocar no campo e, depois de 60 segundos sem toques o site volta sozinho para a tela inicial, e a seleção de texto fica desligada. No celular do visitante isso não acontece. Para desligar, abra com `?totem=0`. O tempo fica em `src/hooks/useIdleReset.js`.

## Fase 2 em diante

Os arrays de `mock.js` viram consultas ao Supabase mantendo os mesmos campos (`historia_marcos` e `acervo_itens`), então as páginas quase não mudam. Ficam para as próximas fases: banco de dados real para o check-in (hoje em `localStorage`, ver `src/data/checkins.js`), upload das fotos do formulário, moderação, login e painel `/admin`, e a migração do Google Drive.
