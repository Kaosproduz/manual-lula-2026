# Guia Simplificado de Design — Campanha Lula 2026

> Fonte: `manual_simplificado_lula.pdf` (capturado em 2026-08-25 via extração de texto).
> O PDF original é majoritariamente gráfico (27MB, poucas páginas com muitas imagens/vetores) —
> a extração de texto trouxe rótulos e specs, mas não as imagens/logos embutidos (o ambiente
> não tem `pdfimages`/`pdftoppm` instalados). Os arquivos de logo/gráficos devem vir do material
> separado que você vai apontar.

---

## Estrutura do guia (conteúdo original)

1. Logo oficial 2026 — versões, com conceito, cubo, sem box
2. Aplicação PB e negativa
3. Inclinações — formação de texto e caixas, tipografia e torção das caixas, espaçamento entreletras
4. Paleta de cores
5. Paleta — proporção de uso
6. Tipologias (tipografia principal e de apoio)
7. Materiais de campanha eletrônico — animação do logo (13 opções de formação/transição) — *motion design, não se aplica ao documento estático*
8. Assinaturas

---

## Paleta de cores oficial

| Hex | CMYK | Uso provável |
|---|---|---|
| `#a20301` | C24 M100 Y100 K20 | Vermelho escuro |
| `#fd0000` | C0 M95 Y92 K20 | Vermelho principal |
| `#ffd400` | C0 M15 Y92 K0 | Amarelo |
| `#00b923` | C75 M0 Y100 K0 | Verde |
| `#006820` | C90 M30 Y100 K25 | Verde escuro |
| `#0034d2` | C93 M75 Y0 K0 | Azul |
| `#f3f2f3` | C0 M0 Y0 K2 | Cinza claro/quase branco |
| `#ffffff` | — | Branco |
| `#f6efe7` | C4 M7 Y10(?) K0 | Bege/creme |
| `#320d59` | C95 M100 Y30 K25 | Roxo escuro |
| `#a237fb` | C70 M78 Y0 K0 | Roxo/violeta |

> Existe uma seção "paleta — proporção de uso" no PDF (provavelmente indicando qual cor domina vs. cor de apoio/destaque), mas o conteúdo não veio em texto — só nas imagens. Confirmar proporção quando tivermos o material gráfico.

**Aplicação sugerida para o documento** (a validar): vermelho principal (`#fd0000` / `#a20301`) como cor de destaque/identidade, branco e cinza claro como base neutra, amarelo como acento pontual para dados/alertas. Verde e azul aparentam ser cores secundárias da identidade (possivelmente para outras aplicações da campanha, não necessariamente o caderno técnico).

---

## Tipografia

**Principal — Transducer (Adobe Fonts)**
- Pesos: Condensed Black, Condensed Medium, Regular, Extended (Regular/Medium/Bold/Black)
- Uso: títulos, destaques, uso institucional
- Notas de uso:
  - Versão *condensed*: sempre em caixa alta (maiúsculas)
  - Atenção ao entreletras (tracking), especialmente na variação Black — recomendado -5 a -10
  - Conjunto recomendado: Condensed Black + Condensed Medium, entreletras 130–150 / -20 a -30 conforme combinação
  - Evitar uso excessivo da variação *Extended*

**Apoio — Gotham (Adobe Fonts)**
- Pesos: Book, Medium, Bold, Ultra, Light
- Uso: textos corridos (panfletos, editoriais, site) — ou seja, é a fonte indicada para corpo de texto em peças digitais como a nossa

**Observação para o projeto:** ambas são Adobe Fonts (pagas/licenciadas via Adobe). Para o documento HTML público, precisamos de uma fonte web equivalente/substituta — Transducer e Gotham não são carregáveis via Google Fonts. Definir com o usuário se: (a) usamos Adobe Fonts/Typekit via `<link>` (kit precisa existir e ser público), ou (b) usamos fontes similares de licença livre (ex.: Gotham → Montserrat/Poppins como substituta comum; Transducer condensada → Oswald/Barlow Condensed).

---

## Pendências para fechar a identidade visual

- [ ] Logos oficiais em arquivo (SVG/PNG/AI) — vêm do material gráfico separado
- [ ] Confirmar se usaremos Adobe Fonts (Transducer/Gotham) ou substitutas web-safe
- [ ] Proporção de uso da paleta de cores (qual é dominante/qual é acento)
- [ ] Regras de aplicação P&B/negativa, caso o documento precise de versão para impressão P&B
