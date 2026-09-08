document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".cabecalho");
  const menuMobile = document.getElementById("menuMobile");
  const navegacao = document.getElementById("navegacao");
  const linksNavegacao = document.querySelectorAll(".navegacao a");
  const botaoTopo = document.getElementById("voltarTopo");
  const anoAtual = document.getElementById("anoAtual");
  const elementosReveal = document.querySelectorAll(".reveal");
  const secoes = document.querySelectorAll("main section[id]");

  /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* =====================================================
       HEADER AO ROLAR
    ====================================================== */

  function atualizarHeader() {
    if (window.scrollY > 30) {
      header.classList.add("rolagem");
    } else {
      header.classList.remove("rolagem");
    }
  }

  /* =====================================================
       BOTÃO VOLTAR AO TOPO
    ====================================================== */

  function atualizarBotaoTopo() {
    if (window.scrollY > 600) {
      botaoTopo.classList.add("visivel");
    } else {
      botaoTopo.classList.remove("visivel");
    }
  }

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =====================================================
       MENU MOBILE
    ====================================================== */

  function fecharMenu() {
    navegacao.classList.remove("aberta");

    document.body.classList.remove("menu-aberto");

    menuMobile.setAttribute("aria-expanded", "false");

    menuMobile.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  menuMobile.addEventListener("click", () => {
    const estaAberto = navegacao.classList.toggle("aberta");

    document.body.classList.toggle("menu-aberto", estaAberto);

    menuMobile.setAttribute("aria-expanded", estaAberto.toString());

    menuMobile.innerHTML = estaAberto
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  linksNavegacao.forEach((link) => {
    link.addEventListener("click", () => {
      fecharMenu();
    });
  });

  /* =====================================================
       ANIMAÇÃO DAS SEÇÕES
    ====================================================== */

  const observadorReveal = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");

          observadorReveal.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  elementosReveal.forEach((elemento) => {
    observadorReveal.observe(elemento);
  });

  /* =====================================================
       DESTACAR ITEM DO MENU CONFORME A SEÇÃO
    ====================================================== */

  const observadorSecoes = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
          return;
        }

        const id = entrada.target.id;

        linksNavegacao.forEach((link) => {
          link.classList.remove("ativo");

          const destino = link.getAttribute("href");

          if (destino === `#${id}`) {
            link.classList.add("ativo");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  secoes.forEach((secao) => {
    observadorSecoes.observe(secao);
  });

  /* =====================================================
       EVENTOS DE SCROLL
    ====================================================== */

  function aoRolar() {
    atualizarHeader();
    atualizarBotaoTopo();
  }

  window.addEventListener("scroll", aoRolar, { passive: true });

  /* =====================================================
       ESTADO INICIAL
    ====================================================== */

  atualizarHeader();
  atualizarBotaoTopo();
});
