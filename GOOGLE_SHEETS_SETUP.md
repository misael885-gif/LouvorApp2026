# Google Sheets Passo a Passo

Use este guia para sincronizar o app com `Google Sheets + Apps Script` sem custo.

## O que voce vai usar

- `Google Sheets` para guardar as musicas
- `Google Drive` para guardar as capas
- `Apps Script` como ponte entre o app e a planilha
- `GitHub Pages` ou `Cloudflare Pages` para publicar o site

## 1. Criar a planilha

1. Crie uma planilha nova no Google Sheets.
2. De um nome como `Ministerio Multitracks`.
3. Copie o `ID` da planilha pela URL.
4. Se preferir, com o backend atualizado voce tambem pode usar a `URL completa` da planilha em `SHEET_ID`.

## 2. Criar uma pasta para as capas

1. No Google Drive, crie uma pasta nova.
2. De um nome como `Capas Multitracks`.
3. Copie o `ID` da pasta pela URL.
4. Se preferir, com o backend atualizado voce tambem pode usar a `URL completa` da pasta em `COVERS_FOLDER_ID`.

## 3. Criar o Apps Script

1. Abra a planilha.
2. Va em `Extensoes > Apps Script`.
3. Apague o codigo que estiver la.
4. Cole o conteudo de [google-apps-script-backend.gs](/C:/Users/jacob/OneDrive/Desktop/CODEX/google-apps-script-backend.gs).

## 4. Configurar as propriedades do script

No Apps Script:

1. Abra `Project Settings`.
2. Entre em `Script properties`.
3. Crie estas chaves:

- `SHEET_ID` = ID da sua planilha ou a URL completa dela
- `COVERS_FOLDER_ID` = ID da pasta das capas ou a URL completa dela
- `ADMIN_KEY` = sua senha/chave do cadastro

## 5. Publicar como Web App

1. Clique em `Deploy > New deployment`.
2. Escolha `Web app`.
3. Em `Execute as`, deixe `Me`.
4. Em `Who has access`, escolha `Anyone`.
5. Clique em `Deploy`.
6. Copie a URL final do `Web app`.

## 6. Colar no app

Abra [google-sheets-config.js](/C:/Users/jacob/OneDrive/Desktop/CODEX/google-sheets-config.js) e deixe assim:

```js
window.MINISTERIO_APP_CONFIG = {
  syncMode: "google-sheets",
  googleSheets: {
    webAppUrl: "COLE_AQUI_A_URL_DO_WEB_APP",
    requestTimeoutMs: 20000
  }
};
```

## 7. Testar

1. Abra o app.
2. Clique em `Cadastrar musica`.
3. Digite a `chave admin` que voce colocou em `ADMIN_KEY`.
4. Se entrar, a integracao esta pronta.

Teste extra para confirmar:

1. Abra a URL do `Web app` no navegador com `?action=health` no final.
2. Se estiver tudo certo, deve aparecer um JSON com `ok: true` e `status: "ready"`.
3. Depois teste tambem `?action=catalog`.
4. Se vier `ok: true`, a conexao com a planilha esta funcionando.

Exemplo:

```text
https://script.google.com/macros/s/SEU_WEB_APP/exec?action=health
https://script.google.com/macros/s/SEU_WEB_APP/exec?action=catalog
```

## 8. Migrar o acervo atual

1. Depois do login, abra `Cadastrar musica` ou `Capas e links`.
2. Clique em `Migrar ... musicas para a nuvem`.
3. Espere terminar.

## 9. Como funcionam as capas

- ao subir uma capa, o app manda a imagem para a pasta do Google Drive
- a URL publica volta para o catalogo
- voce continua podendo subir capa individual ou em lote

## Observacao importante

Se mudar o codigo do Apps Script depois, publique uma nova versao do `Web app` para o app pegar as alteracoes.

## Links oficiais

- [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- [Apps Script with Sheets](https://developers.google.com/apps-script/guides/sheets)
- [PropertiesService](https://developers.google.com/apps-script/reference/properties/properties-service)
- [Drive service](https://developers.google.com/apps-script/reference/drive)
