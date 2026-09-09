# Modo leve (Android 3G / mobile)

O site detecta rede lenta, `save-data`, mobile/tablet ou `prefers-reduced-motion` e entra em **modo leve**:

- Sem Three.js / globo 3D
- Sem GSAP / orbital lines no hero
- Hero e CTA visíveis na hora
- Popup promo atrasado (5s) e sem `priority`
- Seções abaixo do fold só montam após scroll (mobile)
- Marquees reduzidos / estáticos
- Imagens WebP menores (~622 KB no total em `public/images`)

## Comandos

```bash
npm run optimize:images
npm run build
```

No mobile/3G o first paint deve carregar só o essencial do hero + CSS/JS leve.
