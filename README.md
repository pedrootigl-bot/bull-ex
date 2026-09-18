Bullex — Site Institucional

Site institucional e de campanhas da Bullex, desenvolvido para apresentar a plataforma, mercados disponíveis, conta demo, ofertas promocionais, conteúdos educacionais e caminhos de conversão para cadastro e acesso à plataforma.

🌐 Site em produção

URL: https://campanhasbullex.com/bullex/pt-br/

Sobre o projeto

O projeto foi criado com foco em uma experiência visual premium, responsiva e orientada à conversão. A interface combina uma estética escura com destaques em verde, elementos financeiros, animações e conteúdos voltados para apresentação da marca e de seus principais produtos.

Entre os principais objetivos do site estão:

apresentar a Bullex e seus diferenciais;

direcionar usuários para criação de conta e login;

explicar os mercados disponíveis na plataforma;

apresentar a conta de demonstração;

divulgar ofertas e benefícios promocionais;

disponibilizar conteúdos educacionais por meio do blog;

concentrar informações institucionais, FAQ, suporte e documentos legais.

Principais páginas e áreas

Home

Página principal da Bullex com apresentação da plataforma, CTA para criação de conta e destaques como conta demo, mercados globais e benefícios da experiência Bullex.

Mercados

Área dedicada às diferentes categorias de ativos e mercados disponíveis na plataforma, incluindo:

Ativos Digitais;

Forex;

ETFs;

Blitz;

outros mercados e categorias disponíveis na plataforma.

Conta Demo

Página voltada para usuários que desejam conhecer a experiência da plataforma utilizando saldo virtual antes de operar com recursos reais.

Ofertas

Hub de benefícios e campanhas promocionais da Bullex.

Risk Free

Explica o funcionamento da promoção Risk Free, sua ativação, cobertura e condições de utilização.

Rota: /pt-br/ofertas/riskfree/

Saldo Promocional

Apresenta o benefício de saldo promocional, como ativar o crédito e as regras de utilização.

Rota: /pt-br/ofertas/saldopromo/

Tickets e Campanhas

Página dedicada às campanhas sazonais, tickets, cupons, eventos e premiações.

Rota: /pt-br/ofertas/tickets/

Blog

Área de conteúdo educacional com artigos sobre mercado, conta demo, gestão de risco, segurança e outros temas relacionados à experiência de negociação.

Rota: /pt-br/blog/

FAQ

Perguntas frequentes para esclarecer dúvidas sobre a plataforma, produtos, campanhas e funcionamento dos serviços.

Tecnologias

O projeto utiliza uma arquitetura de Next.js com exportação estática, permitindo publicação em hospedagem tradicional sem necessidade de um servidor Node.js ativo em produção.

Principais tecnologias e recursos utilizados no projeto:

Next.js;

React;

TypeScript;

App Router;

CSS responsivo e animações de interface;

imagens otimizadas para exportação estática;

SEO técnico e conteúdo indexável;

páginas pré-geradas no build;

exportação estática para hospedagem Apache/Hostinger.

Build e exportação estática

O projeto está configurado para utilizar:

output: "export"

O fluxo de build é:

npm run build

Esse comando executa o build do Next.js e, em seguida, o script responsável por preparar a versão final de publicação.

Fluxo simplificado:

npm run build
   ↓
next build
   ↓
out/
   ↓
scripts/prepare-dist.cjs
   ↓
dist/

out/

É o export estático oficial gerado pelo Next.js.

dist/

É o artefato final utilizado para publicação na Hostinger. Ele parte do conteúdo de out/ e recebe ajustes adicionais para o ambiente de produção, incluindo tratamento de caminhos e comportamento da página inicial.

Para o deploy atual, utilize o conteúdo gerado em dist/.

Base path

O site é publicado dentro de:

/bullex

Por isso o projeto utiliza um basePath correspondente no build de produção.

Exemplo de URL final:

https://campanhasbullex.com/bullex/pt-br/

Ao alterar o domínio ou a pasta de publicação, revise o basePath e os caminhos dos assets.

Como executar localmente

1. Instalar dependências

npm install

2. Iniciar ambiente de desenvolvimento

npm run dev

Por padrão, o projeto ficará disponível em:

http://localhost:3000

Se a porta estiver ocupada:

npm run dev -- -p 3001

Como gerar a versão de produção

npm run build

Após o processo, confirme se a pasta:

dist/

foi criada corretamente.

Antes de publicar, valide principalmente:

carregamento de CSS e JavaScript;

imagens e vídeos;

navegação entre idiomas e páginas;

rotas do blog;

páginas de ofertas;

CTAs externos;

responsividade em desktop e mobile.

Deploy na Hostinger

O projeto atual utiliza publicação de arquivos estáticos.

Fluxo recomendado:

execute npm run build;

abra a pasta dist/;

envie o conteúdo da pasta, e não a pasta inteira;

publique os arquivos em:

public_html/bullex/

confirme que o arquivo inicial está no caminho correto;

limpe o cache da hospedagem/CDN caso necessário;

teste a URL final em uma janela anônima.

Importante

Não publique .next/ diretamente nesse modelo de hospedagem.

A pasta .next/ contém arquivos internos de build do Next.js e não corresponde ao site estático pronto para Apache.

SEO

O projeto possui páginas e conteúdos estruturados para indexação e aquisição orgânica.

Pontos importantes a manter em novas páginas:

<title> único e descritivo;

meta description específica;

canonical correto;

Open Graph;

Twitter/X Cards;

apenas um H1 principal por página;

estrutura correta de H2 e H3;

textos importantes presentes no HTML;

imagens relevantes com alt descritivo;

JSON-LD quando aplicável;

sitemap atualizado;

robots.txt atualizado;

URLs amigáveis e permanentes.

Conteúdo e SEO

As páginas de ofertas também funcionam como páginas informativas e devem responder claramente às principais dúvidas dos usuários.

Exemplos:

o que é o benefício;

como ativar;

como utilizar;

quais condições se aplicam;

perguntas frequentes;

links para páginas relacionadas.

Performance

O projeto possui bastante conteúdo visual e deve ser otimizado continuamente.

Boas práticas recomendadas:

utilizar imagens WebP/AVIF sempre que possível;

definir width e height para reduzir CLS;

não aplicar lazy loading na imagem principal da hero;

utilizar lazy loading nos conteúdos abaixo da dobra;

carregar componentes pesados somente quando necessário;

evitar múltiplas animações complexas rodando simultaneamente;

priorizar transform e opacity em animações;

pausar ou reduzir efeitos em dispositivos mais fracos;

respeitar prefers-reduced-motion;

otimizar fontes e pesos utilizados;

revisar o bundle periodicamente.

Responsividade

O site foi pensado para funcionar em diferentes tamanhos de tela.

Ao criar ou editar sections, testar pelo menos:

Desktop       > 1200px
Notebook      900px – 1200px
Tablet        640px – 900px
Mobile        < 640px
Mobile pequeno < 400px

Evite depender apenas de valores fixos de altura e largura.

Links externos

Os principais CTAs de conversão direcionam para a plataforma de negociação da Bullex:

https://trade.bull-ex.com/

Sempre validar links de:

login;

registro;

ativação de promoções;

criação de conta;

conta demo.

Conteúdo legal e risco

Por se tratar de um projeto relacionado a produtos financeiros, páginas promocionais e conteúdos devem sempre manter visíveis as informações legais e avisos de risco aplicáveis.

O site atualmente inclui informações de risco, políticas e links legais no rodapé. Ao criar novas páginas, preserve essa estrutura e evite promessas de retorno garantido ou linguagem que possa sugerir ausência de risco.

Estrutura conceitual do projeto

A estrutura exata pode evoluir, mas o projeto segue uma organização semelhante a:

app/
├── [locale]/
│   ├── page.tsx
│   ├── blog/
│   ├── ofertas/
│   │   ├── riskfree/
│   │   ├── saldopromo/
│   │   └── tickets/
│   └── ...
│
components/
├── layout/
├── sections/
├── ui/
└── ...

public/
├── images/
├── videos/
├── icons/
└── ...

scripts/
└── prepare-dist.cjs

next.config.ts
package.json

Checklist antes de publicar

npm run build finaliza sem erros

pasta dist/ foi gerada

home abre corretamente

rotas em /pt-br/ funcionam

páginas de ofertas funcionam

blog e artigos funcionam

CSS e JS carregam sem 404

imagens e vídeos carregam

links externos estão corretos

versão mobile foi validada

metadata SEO está correta

canonical está correto

sitemap e robots estão atualizados

avisos legais estão presentes

cache da hospedagem foi limpo

Manutenção

Sempre que adicionar uma nova página ou campanha:

criar a rota;

adicionar metadata SEO;

revisar responsividade;

otimizar imagens;

adicionar links internos quando fizer sentido;

atualizar sitemap, se necessário;

executar novo build;

publicar novamente o conteúdo de dist/.

Segurança

Nunca versionar credenciais, tokens, senhas ou arquivos de ambiente contendo informações sensíveis.

Arquivos como:

.env
.env.local
.env.production

devem permanecer fora do repositório quando contiverem dados privados.

Licença e uso

Projeto proprietário da Bullex.

Os materiais visuais, textos, marcas, campanhas, interfaces e demais assets devem ser utilizados apenas conforme autorização da empresa.

Contato

Site: https://campanhasbullex.com/bullex/pt-br/
Suporte: support@bull-ex.com

Aviso: negociação de ativos envolve risco. Conteúdos do site são informativos e educacionais e não constituem recomendação de investimento.
