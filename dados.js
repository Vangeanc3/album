/**
 * ============================================================================
 *  CONFIGURAÇÃO DO SITE — EDITE AQUI PARA PERSONALIZAR TUDO
 * ============================================================================
 *  Você só precisa alterar os textos, nomes e caminhos das fotos neste arquivo.
 *  Dica: mantenha as aspas ("...") e as vírgulas no final de cada linha.
 * ============================================================================
 */

window.DADOS_SITE = {
  geral: {
    // Nome ou apelido carinhoso dela (aparece na capa e nos textos com {nomeDela})
    nomeDela: "Flavia",

    // Seu nome para assinar a carta no final
    seuNome: "Ismael",

    // Escolha o clima visual do site:
    // "noite" -> fundo escuro acolhedor (luz baixa, estilo cinematográfico)
    // "papel" -> fundo claro creme/papel quente (estilo revista/carta impressa)
    tema: "noite",

    // Título que aparece na aba do navegador e no preview do link
    tituloAba: "Para você — quando tiver um minutinho",
  },

  capa: {
    etiqueta: "feito com amor",
    titulo: "Oi, {nomeDela}.",
    subtitulo:
      "Só um espaço para guardar com carinho o que a gente construiu até aqui. Não precisa responder nada nem ter pressa, fiz apenas porque você merece coisas bonitas no teu tempo.",
    textoBotao: "Começar",
    // Foto de fundo da capa (ex: "fotos/foto-01.jpg", "fotos/foto-07.jpg" ou "" para deixar sem foto)
    imagemFundo: "fotos/foto-01.jpg",
  },

  musica: {
    // Mude para true quando quiser ativar uma música de fundo
    ativada: false,

    // Tipo: "mp3" (arquivo na pasta musica/) ou "spotify" (link de uma faixa do Spotify)
    tipo: "mp3",

    // Se usar "mp3": coloque o arquivo .mp3 dentro da pasta "musica/" e aponte o nome aqui
    arquivo: "musica/lofi.mp3",
    titulo: "Lo-fi para ouvir devagar",
    artista: "Trilha ambiente",

    // Se usar "spotify": cole aqui o link normal da música no Spotify
    // Exemplo: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC"
    spotifyUrl: "",

    // Se true, começa a tocar suavemente assim que ela apertar "Começar" (funciona para mp3)
    tocarAoIniciar: true,
  },

  linhaDoTempo: {
    etiqueta: "01 • Memórias",
    titulo: "Pequenas coisas que ainda moram aqui",
    intro:
      "Mesmo com o tempo passando, tem momentos nossos que continuam aparecendo do nada e me fazendo sorrir.",
    itens: [
      {
        data: "Fevereiro",
        titulo: "Os primeiros passeios juntos",
        descricao:
          "Desde quando a gente se encontrou no Carnaval, depois saímos com a Yasmim e fomos ao Parque do Utinga — ali eu já senti o quanto era leve estar com você.",
      },
      {
        data: "Março • Praça da República",
        titulo: "Aquele dia na Praça da República",
        descricao:
          "A gente foi conversar, comer sushi e tomar uma água de coco na Praça da República — e foi ali que eu percebi que tinha me apaixonado por você.",
      },
      {
        data: "Junho",
        titulo: "Quando virou oficial",
        descricao:
          "Entre a sua viagem pro Rio de Janeiro — quando eu fiquei com muita saudade e senti muito a sua falta — e o aniversário da Yasmim, em que decidimos assumir nosso namoro no Instagram. Foi um dia bem especial para mim, uma das coisas mais bonitas que já vivi, onde eu senti que estava num amor de verdade.",
      },
      {
        data: "Agosto e Setembro",
        titulo: "Até nos dias mais simples",
        descricao:
          "Dos estudos juntos na Usina até o passeio no shopping com a sua avó, você sempre deixou qualquer rotina com um brilho diferente — porque esse é o seu jeito.",
      },
    ],
    textoBotao: "Ver nossas fotos",
  },

  galeria: {
    etiqueta: "02 • Instantes",
    titulo: "Alguns pedaços bons do que vivemos",
    intro: "Toque em qualquer foto se quiser ver em tela cheia.",
    // Fotos importadas e otimizadas de Downloads (há também foto-07, foto-11 e foto-13 na pasta fotos/)
    fotos: [
      {
        imagem: "fotos/foto-01.jpg",
        data: "Fevereiro",
        titulo: "No aniversário do seu amigo no Balacoolbar",
        legenda:
          "Eu lembro bem do quanto você estava linda e perfeita nesse dia.",
      },
      {
        imagem: "fotos/foto-02.jpg",
        data: "Fevereiro",
        titulo: "Parque do Utinga",
        legenda:
          "Nós dois juntos no Parque do Utinga. Foi muito legal e leve — eu adorei passar esse dia com você.",
      },
      {
        imagem: "fotos/foto-03.jpg",
        data: "Março",
        titulo: "Praça da República",
        legenda:
          "Quando a gente saiu para conversar, comer sushi e tomar uma água de coco na Praça da República. Foi nesse dia que eu me apaixonei por você.",
      },
      {
        imagem: "fotos/foto-04.jpg",
        data: "Junho",
        titulo: "Antes de você viajar pro RJ",
        legenda:
          "Pouco antes da sua viagem pro Rio. Eu guardo essa lembrança com muito carinho — adorava te ver assim, feliz.",
      },
      {
        imagem: "fotos/foto-05.jpg",
        data: "Junho",
        titulo: "Descansando na sua casa",
        legenda:
          "A gente dormindo juntos na sua casa. Até nos momentos mais calmos, estar do seu lado já bastava.",
      },
      {
        imagem: "fotos/foto-06.jpg",
        data: "Junho",
        titulo: "Na Copa do Mundo",
        legenda:
          "A gente estava muito bonito nesse dia — principalmente você, linda demais, e nós dois na mesma sintonia.",
      },
      {
        imagem: "fotos/foto-14.jpg",
        data: "Junho",
        titulo: "Encostadinha no meu ombro",
        legenda:
          "Eu adorava te ver assim — com esse sorriso tranquilo e encostada no meu ombro. Gostava demais desses momentos.",
      },
      {
        imagem: "fotos/foto-08.jpg",
        data: "Junho",
        titulo: "Quando assumimos o namoro",
        legenda:
          "O dia em que a gente assumiu nosso namoro. Essa noite nunca vou esquecer — você estava simplesmente perfeita.",
      },
      {
        imagem: "fotos/foto-13.jpg",
        data: "Junho",
        titulo: "Comemorando o aniversário da Yasmim",
        legenda:
          "Depois a gente foi pro aniversário da Yasmim curtir um pouquinho.",
      },
      {
        imagem: "fotos/foto-09.jpg",
        data: "Agosto",
        titulo: "Estudando na Usina",
        legenda:
          "Logo quando você voltou do RJ e a gente foi estudar juntos na Usina. Esse dia foi muito especial para mim — eu gostei muito de ficar contigo lá, até dia de estudo ficava bom com você.",
      },
      {
        imagem: "fotos/foto-12.jpg",
        data: "Agosto",
        titulo: "Shopping com a sua avó",
        legenda:
          "Quando a gente saiu com a sua avó pro shopping. Além do passeio ter sido ótimo, você estava uma gata.",
      },
      {
        imagem: "fotos/foto-15.jpg",
        data: "Agosto",
        titulo: "A foto com seu sobrinho kkkkk",
        legenda:
          "Gostei muito desse dia. Esse passeio no shopping foi completo e cheio de sorrisos — deu para guardar no coração.",
      },
      {
        imagem: "fotos/foto-10.jpg",
        data: "Setembro",
        titulo: "Você sendo você",
        legenda:
          "Esse seu jeito espontâneo que sempre me arrancou um sorriso fácil.",
      },
      {
        imagem: "fotos/foto-16.jpg",
        data: "Na Usina",
        titulo: "Toda feliz com a eleição kkkkk",
        legenda:
          "Quando a gente foi na Usina e você estava toda feliz com a eleição do Lula — essa foto sua está muito engraçada e eu adoro.",
      },
      {
        imagem: "fotos/foto-17.jpg",
        data: "Último registro",
        titulo: "A nossa última foto juntos",
        legenda:
          "Alguns dias antes de a gente se separar — bem no nosso jeitinho leve e sem filtro nenhum.",
      },
    ],
    textoBotao: "Ler o que escrevi",
  },

  carta: {
    etiqueta: "03 • De coração aberto",
    titulo: "O que ficou guardado em mim",
    paragrafos: [
      "Eu pensei bastante antes de te mandar isso, porque a última coisa que eu quero é invadir o seu espaço ou parecer que estou cobrando alguma coisa de você.",
      "Esse tempo afastado me fez olhar para nós dois com muito mais calma. Consegui enxergar coisas em mim que eu precisava amadurecer, e também percebi com ainda mais clareza o quanto o que a gente viveu foi real e bonito.",
      "Sinto falta das coisas simples com você — de te contar uma besteira do meu dia, de rir junto de algo bobo, da paz que era estar do seu lado sem precisar fingir nada.",
      "Não fiz esta página para apagar o passado nem para te apressar a decidir qualquer coisa. Eu respeito de verdade o seu tempo, o seu momento e tudo o que você sentir.",
      "Quis apenas deixar guardado aqui, de um jeito bonito, o quanto você e tudo o que vivemos ainda importam para mim. Desejo de coração que você esteja bem e sorrindo leve — e, se algum dia der vontade de conversar de novo e escrever novos momentos juntos, eu vou estar aqui.",
    ],
    despedida: "Com carinho e respeito,",
  },

  rodape: {
    texto: "Feito especialmente para {nomeDela} • sem pressa",
  },
};
