# Deploy Hostinger — subpasta `/bullex/`

URL de produção: `https://campanhasbullex.com/bullex/`

## Gerar

```bash
npm install
npm run build
```

A pasta `dist/` já sai com `basePath=/bullex` (CSS/JS em `/bullex/_next/...`).

## Upload (importante)

1. No FTP/Gerenciador, abra `public_html/bullex/`
2. Apague o conteúdo antigo dessa pasta
3. Envie **todo o conteúdo interno** de `dist/` para `public_html/bullex/`

Estrutura correta no servidor:

```text
public_html/bullex/
  index.html
  index.php
  .htaccess
  pt-br/index.html
  en/index.html
  _next/
  images/
  legal/
```

**Errado:** enviar a pasta `dist` inteira → ficaria `public_html/bullex/dist/...`

## Testar depois do upload

- `https://campanhasbullex.com/bullex/` → redireciona para `/bullex/pt-br/`
- `https://campanhasbullex.com/bullex/pt-br/`
- `https://campanhasbullex.com/bullex/_next/` (não deve ser 404)

## Preview no PC

```bash
npm run preview:static
```

Abra: `http://localhost:4173/bullex/pt-br/`

## Erros comuns

| Sintoma | Causa |
|---|---|
| 403 em `/bullex/` | Pasta vazia ou sem `index.html` / `.htaccess` |
| 404 em `/bullex/pt-br/` | Arquivos não enviados para `public_html/bullex/` |
| Página preta / sem CSS | Build sem `basePath` ou upload na raiz errada |
| Abrir HTML no Explorer | Não funciona — use preview ou Hostinger |

## Publicar na raiz do domínio (opcional)

```bash
# Windows PowerShell
$env:BASE_PATH=""; npm run build
```

Aí o conteúdo de `dist/` vai em `public_html/` (não em `/bullex/`).
