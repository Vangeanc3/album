(function () {
  "use strict";

  const dados = window.DADOS_SITE;
  if (!dados) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let activeScrollAnimation = null;
  let currentLightboxIndex = 0;

  /* ========================================================================
     UTILITÁRIOS
     ======================================================================== */

  function interpolar(texto) {
    if (typeof texto !== "string") return "";
    const nomeDela = dados.geral?.nomeDela || "você";
    const seuNome = dados.geral?.seuNome || "";
    return texto
      .replaceAll("{nomeDela}", nomeDela)
      .replaceAll("{seuNome}", seuNome);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = interpolar(value);
  }

  function cancelScrollAnimation() {
    if (activeScrollAnimation !== null) {
      cancelAnimationFrame(activeScrollAnimation);
      activeScrollAnimation = null;
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollToTarget(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    target.classList.add("is-unlocked", "is-visible");
    target
      .querySelectorAll(".timeline-item, .photo-card")
      .forEach((card) => card.classList.add("in-view"));

    const topbarHeight = target.id === "capa" ? 0 : 48;
    const targetTop = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - topbarHeight
    );

    if (prefersReducedMotion) {
      window.scrollTo(0, targetTop);
      return;
    }

    cancelScrollAnimation();
    const startY = window.scrollY;
    const distance = targetTop - startY;
    const duration = Math.min(950, Math.max(520, Math.abs(distance) * 0.65));
    let startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        activeScrollAnimation = requestAnimationFrame(step);
      } else {
        activeScrollAnimation = null;
      }
    }

    activeScrollAnimation = requestAnimationFrame(step);
  }

  window.addEventListener("wheel", cancelScrollAnimation, { passive: true });
  window.addEventListener("touchstart", cancelScrollAnimation, {
    passive: true,
  });

  /* ========================================================================
     TEMA E METADADOS
     ======================================================================== */

  function aplicarTemaEMeta() {
    const tema = dados.geral?.tema === "papel" ? "papel" : "noite";
    document.documentElement.setAttribute("data-tema", tema);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute(
        "content",
        tema === "papel" ? "#f7f1e9" : "#110d0c"
      );
    }

    if (dados.geral?.tituloAba) {
      document.title = interpolar(dados.geral.tituloAba);
    }
  }

  /* ========================================================================
     RENDERIZAÇÃO DO CONTEÚDO
     ======================================================================== */

  function renderCapa() {
    setText("capa-etiqueta", dados.capa.etiqueta);
    setText("capa-titulo", dados.capa.titulo);
    setText("capa-subtitulo", dados.capa.subtitulo);
    setText("capa-btn-texto", dados.capa.textoBotao || "Começar");

    const capaEl = document.getElementById("capa");
    const capaBg = document.getElementById("capa-bg");
    const capaBgImg = document.getElementById("capa-bg-img");

    if (capaEl && capaBg && capaBgImg && dados.capa.imagemFundo) {
      capaBgImg.src = dados.capa.imagemFundo;
      capaBg.classList.remove("is-hidden");
      capaEl.classList.add("has-bg-photo");

      capaBgImg.addEventListener("error", () => {
        capaBg.classList.add("is-hidden");
        capaEl.classList.remove("has-bg-photo");
      });
    }
  }

  function renderTimeline() {
    setText("timeline-etiqueta", dados.linhaDoTempo.etiqueta);
    setText("timeline-titulo", dados.linhaDoTempo.titulo);
    setText("timeline-intro", dados.linhaDoTempo.intro);
    setText(
      "timeline-btn-texto",
      dados.linhaDoTempo.textoBotao || "Continuar"
    );

    const container = document.getElementById("timeline-list");
    if (!container) return;
    container.innerHTML = "";

    (dados.linhaDoTempo.itens || []).forEach((item) => {
      const card = document.createElement("article");
      card.className = "timeline-item";

      const dateEl = document.createElement("span");
      dateEl.className = "timeline-date";
      dateEl.textContent = interpolar(item.data);

      const titleEl = document.createElement("h3");
      titleEl.className = "timeline-title";
      titleEl.textContent = interpolar(item.titulo);

      const descEl = document.createElement("p");
      descEl.className = "timeline-desc";
      descEl.textContent = interpolar(item.descricao);

      card.append(dateEl, titleEl, descEl);
      container.appendChild(card);
    });
  }

  function renderGaleria() {
    setText("galeria-etiqueta", dados.galeria.etiqueta);
    setText("galeria-titulo", dados.galeria.titulo);
    setText("galeria-intro", dados.galeria.intro);
    setText("galeria-btn-texto", dados.galeria.textoBotao || "Continuar");

    const container = document.getElementById("gallery-stack");
    if (!container) return;
    container.innerHTML = "";

    (dados.galeria.fotos || []).forEach((foto, index) => {
      const figure = document.createElement("figure");
      figure.className = "photo-card";

      const frameBtn = document.createElement("button");
      frameBtn.type = "button";
      frameBtn.className = "photo-frame";
      frameBtn.setAttribute(
        "aria-label",
        `Ampliar foto: ${interpolar(foto.titulo || `Foto ${index + 1}`)}`
      );
      frameBtn.addEventListener("click", () => abrirLightbox(index));

      const img = document.createElement("img");
      img.src = foto.imagem;
      img.alt = interpolar(foto.titulo || foto.legenda || "Nossa lembrança");
      img.loading = index === 0 ? "eager" : "lazy";
      const syncOrientation = () => {
        if (img.naturalWidth > img.naturalHeight) {
          frameBtn.classList.add("is-landscape");
        }
      };
      img.addEventListener("load", syncOrientation);
      if (img.complete) syncOrientation();
      frameBtn.appendChild(img);

      if (index === 0) {
        const badge = document.createElement("span");
        badge.className = "photo-zoom-badge";
        badge.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg><span>Ampliar</span>';
        frameBtn.appendChild(badge);
      }

      const meta = document.createElement("figcaption");
      meta.className = "photo-meta";

      if (foto.data) {
        const dateEl = document.createElement("span");
        dateEl.className = "photo-date";
        dateEl.textContent = interpolar(foto.data);
        meta.appendChild(dateEl);
      }

      if (foto.titulo) {
        const titleEl = document.createElement("h3");
        titleEl.className = "photo-title";
        titleEl.textContent = interpolar(foto.titulo);
        meta.appendChild(titleEl);
      }

      if (foto.legenda) {
        const capEl = document.createElement("p");
        capEl.className = "photo-caption";
        capEl.textContent = interpolar(foto.legenda);
        meta.appendChild(capEl);
      }

      figure.append(frameBtn, meta);
      container.appendChild(figure);
    });
  }

  function renderCarta() {
    setText("carta-etiqueta", dados.carta.etiqueta);
    setText("carta-titulo", dados.carta.titulo);
    setText("carta-despedida", dados.carta.despedida);
    setText("carta-autor", dados.geral?.seuNome || "");
    setText("rodape-texto", dados.rodape?.texto || "");

    const container = document.getElementById("carta-paragrafos");
    if (!container) return;
    container.innerHTML = "";

    (dados.carta.paragrafos || []).forEach((texto) => {
      const p = document.createElement("p");
      p.textContent = interpolar(texto);
      container.appendChild(p);
    });
  }

  /* ========================================================================
     MÚSICA OPCIONAL (MP3 OU SPOTIFY)
     ======================================================================== */

  let audioFadeTimer = null;
  let audioStartedOnce = false;

  function setupMusica() {
    const cfg = dados.musica;
    if (!cfg || !cfg.ativada) return;

    if (cfg.tipo === "spotify" && cfg.spotifyUrl) {
      const match = cfg.spotifyUrl.match(
        /open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/
      );
      if (match) {
        const slot = document.getElementById("spotify-slot");
        if (slot) {
          const iframe = document.createElement("iframe");
          iframe.src = `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
          iframe.allow =
            "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
          iframe.loading = "lazy";
          iframe.title = "Música no Spotify";
          slot.appendChild(iframe);
          slot.classList.remove("is-hidden");
        }
      }
      return;
    }

    if (cfg.tipo === "mp3" && cfg.arquivo) {
      const audio = document.getElementById("bg-audio");
      const toggle = document.getElementById("music-toggle");
      const musicText = document.getElementById("music-text");
      if (!audio || !toggle) return;

      audio.src = cfg.arquivo;
      audio.volume = 0;
      toggle.classList.remove("is-hidden");
      if (musicText && cfg.titulo) {
        musicText.textContent = cfg.titulo;
      }

      audio.addEventListener("error", () => {
        toggle.classList.add("is-hidden");
      });

      function fadeTo(targetVol) {
        clearInterval(audioFadeTimer);
        audioFadeTimer = setInterval(() => {
          const diff = targetVol - audio.volume;
          if (Math.abs(diff) <= 0.03) {
            audio.volume = targetVol;
            clearInterval(audioFadeTimer);
            if (targetVol === 0) audio.pause();
          } else {
            audio.volume = Math.max(
              0,
              Math.min(1, audio.volume + (diff > 0 ? 0.03 : -0.03))
            );
          }
        }, 60);
      }

      function updateMusicUI(isPlaying) {
        toggle.classList.toggle("is-playing", isPlaying);
        toggle.setAttribute("aria-pressed", String(isPlaying));
        if (musicText) {
          musicText.textContent = isPlaying
            ? cfg.titulo || "Tocando"
            : "Tocar som";
        }
      }

      async function playAudio() {
        try {
          await audio.play();
          audioStartedOnce = true;
          fadeTo(0.45);
          updateMusicUI(true);
        } catch (_) {
          updateMusicUI(false);
        }
      }

      function pauseAudio() {
        fadeTo(0);
        updateMusicUI(false);
      }

      toggle.addEventListener("click", () => {
        if (audio.paused) {
          playAudio();
        } else {
          pauseAudio();
        }
      });

      if (cfg.tocarAoIniciar) {
        const startBtn = document.getElementById("btn-comecar");
        if (startBtn) {
          startBtn.addEventListener("click", () => {
            if (!audioStartedOnce && audio.paused) {
              playAudio();
            }
          });
        }
      }
    }
  }

  /* ========================================================================
     NAVEGAÇÃO POR BOTÕES, PROGRESSO E REVELAÇÃO AO ROLAR
     ======================================================================== */

  function setupNavegacaoERevelacao() {
    const sections = Array.from(document.querySelectorAll(".capitulo"));
    const dots = Array.from(document.querySelectorAll(".step-dot"));
    const topbar = document.getElementById("topbar");
    const stepIndex = document.getElementById("step-index");
    const stepLabel = document.getElementById("step-label");
    const progressFill = document.getElementById("progress-fill");

    document.querySelectorAll("[data-next]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-next");
        if (target) smoothScrollToTarget(target);
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const target = dot.getAttribute("data-target");
        if (target) smoothScrollToTarget(target);
      });
    });

    function setActiveStep(step) {
      if (stepIndex) {
        stepIndex.textContent = String(step + 1).padStart(2, "0");
      }
      const section = sections[step];
      if (stepLabel && section) {
        stepLabel.textContent = section.getAttribute("data-label") || "";
      }
      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === step);
      });
    }

    function updateScrollUI() {
      const scrollY = window.scrollY;
      if (topbar) {
        topbar.classList.toggle("is-scrolled", scrollY > 40);
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progressFill && maxScroll > 0) {
        const pct = Math.max(0, Math.min(100, (scrollY / maxScroll) * 100));
        progressFill.style.width = `${pct.toFixed(1)}%`;
      }

      const pivot = window.innerHeight * 0.38;
      let currentStep = 0;
      sections.forEach((sec, idx) => {
        if (sec.getBoundingClientRect().top <= pivot) {
          currentStep = idx;
        }
      });
      setActiveStep(currentStep);
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible", "is-unlocked");
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));

      const cardObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );

      document
        .querySelectorAll(".timeline-item, .photo-card")
        .forEach((el) => cardObserver.observe(el));
    } else {
      sections.forEach((s) => s.classList.add("is-visible", "is-unlocked"));
      document
        .querySelectorAll(".timeline-item, .photo-card")
        .forEach((el) => el.classList.add("in-view"));
    }
  }

  /* ========================================================================
     LIGHTBOX DAS FOTOS (TOQUE, SETAS E SWIPE)
     ======================================================================== */

  function atualizarLightbox() {
    const fotos = dados.galeria?.fotos || [];
    if (!fotos.length) return;

    const foto = fotos[currentLightboxIndex];
    const img = document.getElementById("lightbox-img");
    const counter = document.getElementById("lightbox-counter");
    const dateEl = document.getElementById("lightbox-date");
    const titleEl = document.getElementById("lightbox-title");
    const descEl = document.getElementById("lightbox-desc");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (img) {
      img.src = foto.imagem;
      img.alt = interpolar(foto.titulo || foto.legenda || "Foto");
    }
    if (counter) {
      counter.textContent = `${currentLightboxIndex + 1} / ${fotos.length}`;
    }
    if (dateEl) dateEl.textContent = interpolar(foto.data || "");
    if (titleEl) titleEl.textContent = interpolar(foto.titulo || "");
    if (descEl) descEl.textContent = interpolar(foto.legenda || "");

    const single = fotos.length <= 1;
    if (prevBtn) prevBtn.classList.toggle("is-hidden", single);
    if (nextBtn) nextBtn.classList.toggle("is-hidden", single);
  }

  function abrirLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    currentLightboxIndex = index;
    atualizarLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function fecharLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function navegarLightbox(delta) {
    const fotos = dados.galeria?.fotos || [];
    if (fotos.length <= 1) return;
    currentLightboxIndex =
      (currentLightboxIndex + delta + fotos.length) % fotos.length;
    atualizarLightbox();
  }

  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const backdrop = document.getElementById("lightbox-backdrop");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const stage = document.getElementById("lightbox-stage");

    if (!lightbox) return;

    if (backdrop) backdrop.addEventListener("click", fecharLightbox);
    if (closeBtn) closeBtn.addEventListener("click", fecharLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => navegarLightbox(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => navegarLightbox(1));

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") fecharLightbox();
      if (e.key === "ArrowLeft") navegarLightbox(-1);
      if (e.key === "ArrowRight") navegarLightbox(1);
    });

    if (stage) {
      let touchStartX = 0;
      let touchStartY = 0;

      stage.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        },
        { passive: true }
      );

      stage.addEventListener(
        "touchend",
        (e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;

          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            navegarLightbox(dx < 0 ? 1 : -1);
          } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
            fecharLightbox();
          }
        },
        { passive: true }
      );
    }
  }

  /* ========================================================================
     INICIALIZAÇÃO
     ======================================================================== */

  aplicarTemaEMeta();
  renderCapa();
  renderTimeline();
  renderGaleria();
  renderCarta();
  setupMusica();
  setupNavegacaoERevelacao();
  setupLightbox();
})();
