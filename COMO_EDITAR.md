# Como personalizar e publicar o site

Tudo o que aparece no site é controlado por um único arquivo: **`dados.js`**. Você não precisa mexer em `index.html`, `styles.css` ou `app.js`.

---

## 1. Trocar nomes, textos e clima visual

Abra o arquivo **`dados.js`** e edite os textos entre aspas (`"..."`):

- **`nomeDela`**: coloque o nome ou apelido carinhoso dela.
- **`seuNome`**: coloque o seu nome para assinar a carta.
- **`tema`**:
  - `"noite"` — fundo escuro acolhedor (padrão).
  - `"papel"` — fundo claro creme/papel quente.
- **`linhaDoTempo.itens`**: adicione, remova ou edite momentos marcantes de vocês.
- **`carta.paragrafos`**: escreva sua carta parágrafo por parágrafo (cada linha entre aspas vira um parágrafo).

---

## 2. Colocar as fotos de vocês

1. Copie suas fotos (`.jpg`, `.png` ou `.webp`) para dentro da pasta **`fotos/`**.
2. Em `dados.js`, dentro de `galeria.fotos`, aponte cada item para o arquivo correspondente:

```js
{
  imagem: "fotos/nossa-foto-1.jpg",
  data: "Março de 2024",
  titulo: "Aquele dia no parque",
  legenda: "Lembro até hoje do quanto a gente riu nessa tarde.",
},
```

Você pode colocar 3, 5, 8 ou quantas fotos quiser — é só repetir esse bloco `{ ... },`.

---

## 3. Adicionar música lo-fi (opcional)

No bloco `musica` em `dados.js`:

- **Usando um arquivo `.mp3`**:
  1. Coloque o arquivo (ex: `lofi.mp3`) na pasta **`musica/`**.
  2. Mude `ativada: true`, `tipo: "mp3"` e `arquivo: "musica/lofi.mp3"`.
  3. Quando ela tocar em **"Começar"**, a música entra suavemente em volume baixo, com botão de pausar/tocar no topo.

- **Usando um link do Spotify**:
  1. Mude `ativada: true`, `tipo: "spotify"`.
  2. Cole o link da música em `spotifyUrl`.

---

## 4. Receber a resposta dela direto no WhatsApp (opcional)

Em `convite.whatsappNumero`, coloque seu número com DDI e DDD (só números), por exemplo:

```js
whatsappNumero: "5511999999999",
```

Assim, quando ela escolher uma das opções no final, aparece o botão **"Responder pelo WhatsApp"** já com a mensagem pronta para ela enviar (ou editar se quiser). Se deixar vazio (`""`), aparece o botão para ela copiar a resposta com um toque.

---

## 5. Como testar no seu celular antes de mandar

No Mac, abra o Terminal dentro da pasta do projeto e rode:

```bash
python3 -m http.server 8000
```

- No computador, acesse `http://localhost:8000` (dica: aperte `Cmd+Option+I` no Chrome/Safari para simular a tela de celular).
- No celular (na mesma rede Wi-Fi), acesse `http://IP-DO-SEU-MAC:8000`.

---

## 6. Como colocar no ar de graça mês que vem

O jeito mais simples (sem precisar instalar nada):

1. Acesse **[app.netlify.com/drop](https://app.netlify.com/drop)** no navegador (crie uma conta gratuita).
2. Arraste a pasta **`meu_amor`** inteira (contendo `index.html`, `styles.css`, `app.js`, `dados.js`, `fotos/` e `musica/`) para a tela.
3. Em poucos segundos ele gera um link `https://...netlify.app` que você pode personalizar (ex: `para-voce-com-calma.netlify.app`) e enviar para ela no WhatsApp!
