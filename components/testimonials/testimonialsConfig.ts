export type TestimonialStars = 3 | 4 | 5;

export type Testimonial = {
  id: string;
  name: string;
  stars: TestimonialStars;
  quote: string;
  photo: string;
  photoAlt: string;
};

export const TESTIMONIALS_COPY = {
  id: "depoimentos",
  eyebrow: "Quem já testou",
  title: "O que andam falando por aí",
  subtitle: "Não pedimos texto bonito. Copiamos o que chegou no suporte e no grupo.",
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "camila",
    name: "Camila R.",
    stars: 4,
    photo: "/images/testimonials/camila.png",
    photoAlt: "Foto de Camila",
    quote:
      "Abri a demo num sábado de tarde porque tava enrolando isso há meses. Os US$ 10 mil fake ajudam a não ter aquele medo de clicar errado. Ainda não coloquei dinheiro de verdade — meu marido ia me matar. Mas pelo menos já entendi ordem a mercado. O app travou uma vez por uns 20 segundos e eu quase fechei a conta. Voltou. Ficou.",
  },
  {
    id: "rogerio",
    name: "Rogério Mendes",
    stars: 4,
    photo: "/images/testimonials/rogerio.png",
    photoAlt: "Foto de Rogério",
    quote:
      "Meu irmão opera na XP e ficava me zoando que eu não ia entender nada. Abri a demo aqui e em uma tarde já tava fazendo ordem. A tela é mais limpa, não tem 40 botão. Mandei uma dúvida no domingo à noite e responderam segunda de manhã — pra mim tá ok. Quatro estrela porque ainda tô só na demo, mas já gostei o suficiente pra indicar pro meu cunhado.",
  },
  {
    id: "thiago",
    name: "Thiago Alves",
    stars: 5,
    photo: "/images/testimonials/thiago.png",
    photoAlt: "Foto de Thiago",
    quote:
      "Meu primo me mandou o link e eu jurei que era golpe kkkk. Testei a demo, fiz umas 15 operações em cripto só pra ver se sumia o saldo. Não sumiu. Gostei que não fica empurrando alavancagem o tempo todo, porque eu ia cair. Cadastrei de verdade essa semana. Se der merda eu venho aqui reclamar.",
  },
  {
    id: "juliana",
    name: "Juliana Pires",
    stars: 4,
    photo: "/images/testimonials/juliana.png",
    photoAlt: "Foto de Juliana",
    quote:
      "Eu já tinha perdido um pouco em outra corretora (não vou falar o nome, vergonha). Aqui o visual pelo menos não me deixa perdida. Falta um gráfico mais completo, volume mais óbvio, essas coisas. Mas pra o que eu faço — comprar umas ações e esquecer — tá ok. Demorei pra achar o histórico. Tava em dois cliques. Eu que sou lenta.",
  },
  {
    id: "eduardo",
    name: "Eduardo Nogueira",
    stars: 5,
    photo: "/images/testimonials/eduardo.png",
    photoAlt: "Foto de Eduardo",
    quote:
      "Demorei 2 dias pra verificar a conta e quase desisti. Depois passou. Ontem operei câmbio pela primeira vez na vida, 50 dólares só pra sentir. A ordem saiu rápido. Não sou trader, trabalho em obra, então se eu consegui abrir e clicar, qualquer um consegue. Minha filha que me ajudou no cadastro, pra ser honesto.",
  },
  {
    id: "fernanda",
    name: "Fernanda Costa",
    stars: 4,
    photo: "/images/testimonials/fernanda.png",
    photoAlt: "Foto de Fernanda",
    quote:
      "Tirei uma estrela porque o cadastro abriu lento no 4G da TIM, fiquei 1 minuto olhando pra tela. Fora isso o saldo demo apareceu na hora. Minha irmã também abriu. Ela não achava o histórico, eu achei. A gente compara print do app no WhatsApp. Nada revolucionário, só não me senti burra usando.",
  },
];
