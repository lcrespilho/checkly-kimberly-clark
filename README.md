# Validação automática de disparo de tags antes do aceite de consentimento

## Setup

`npm install`

## Uso

- Atualizar a lista de sites a serem validados automaticamente no arquivo sites.js.
- Executar o arquivo generateTestFiles.js (`node generateTestFiles.js`), opcionalmente alterando a regex de validação de tags.
- Realize deploy no checkly
  - `npx checkly login` (opcional)
  - `npm run checkly:deploy`
- Execute os testes no checkly e analise os resultados.