# Ministerio Multitracks

Web app do `Ministerio de Louvor Adoradores de Cristo` para organizar:

- `Multitracks Elite`
- `Multitracks Alagoa`
- capas
- links do YouTube
- letras
- modo ministracao

## Como usar hoje

1. Abra [index.html](C:\Users\jacob\OneDrive\Desktop\CODEX\index.html) no navegador.
2. Escolha `Multitracks Elite` ou `Multitracks Alagoa`.
3. Use `Cadastrar musica` para adicionar novas faixas.
4. Use `Capas e links` para completar musicas que ja estao no acervo.
5. Clique em uma musica para abrir a tela cheia com a letra.

## O que ja esta pronto

- catalogo separado por produtor
- busca por artista, titulo e letra
- favoritas
- capa por upload
- link do YouTube
- letra escrita manualmente
- tela cheia da musica
- modo ministracao
- base PWA para instalar como app web

## Importante sobre instalacao

Para o modo de instalacao como app funcionar de verdade, o projeto precisa estar aberto em `http://` ou `https://`.

Se abrir o arquivo direto em `file:///`, o app continua funcionando, mas:

- o `service worker` nao registra
- o navegador nao trata como PWA instalavel

## Publicacao gratis

O passo a passo esta em [PUBLICAR_GRATIS.md](C:\Users\jacob\OneDrive\Desktop\CODEX\PUBLICAR_GRATIS.md).

## Sincronizacao entre aparelhos

Hoje o app ainda pode funcionar localmente no navegador.

Se voce quiser que computador e celular enxerguem exatamente o mesmo acervo, letras e capas, o proximo passo e ligar o projeto ao Google Sheets:

- configuracao: [google-sheets-config.js](C:\Users\jacob\OneDrive\Desktop\CODEX\google-sheets-config.js)
- setup: [GOOGLE_SHEETS_SETUP.md](C:\Users\jacob\OneDrive\Desktop\CODEX\GOOGLE_SHEETS_SETUP.md)
- backend: [google-apps-script-backend.gs](C:\Users\jacob\OneDrive\Desktop\CODEX\google-apps-script-backend.gs)
