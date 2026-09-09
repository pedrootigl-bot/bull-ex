# Modo leve (só rede muito ruim)

Animações pesadas são cortadas **apenas** quando a conexão está muito ruim (ou com `prefers-reduced-motion`).

## Quando corta

- `save-data` ativo
- `effectiveType` `slow-2g` / `2g`
- `downlink` &lt; 0.4 Mbps
- `rtt` ≥ 1500 ms
- `3g` **e** (`downlink` &lt; 0.7 **ou** `rtt` ≥ 900)

## Quando NÃO corta

- Mobile/tablet com Wi‑Fi, 4G ou 3G razoável
- Desktop com boa rede

## O que é cortado no modo leve

- Three.js / globo 3D
- GSAP do hero
- Marquees reduzidos
- Animações CSS contínuas via classe `lite-experience`
