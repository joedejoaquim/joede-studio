// ── Dados dos Projectos ─────────────────────────────────────
const projects = [
  {
    nomeProjeto: "KEY FORGE",
    descricao: "Aplicação web desenvolvida para geração segura de chaves, senhas e credenciais digitais. Focada em segurança, desempenho e experiência do utilizador, oferece uma interface moderna e intuitiva para criação de dados criptograficamente robustos.",
    linkProjecto: "https://keyforge-five.vercel.app/"
  },
  {
    nomeProjeto: "COLOR PRIME",
    descricao: "Ferramenta de design voltada para desenvolvedores e designers, permitindo gerar, explorar e extrair paletas de cores harmoniosas a partir de cores personalizadas ou imagens. Desenvolvida para otimizar fluxos de trabalho criativos e acelerar a construção de interfaces modernas.",
    linkProjecto: "https://colorprime.vercel.app/"
  },
  {
    nomeProjeto: "CONVERT FLASH",
    descricao: "Plataforma de conversão de arquivos online que oferece suporte a múltiplos formatos através de uma experiência rápida, intuitiva e responsiva. O projeto foi concebido para simplificar tarefas de conversão sem exigir instalação de software adicional.",
    linkProjecto: "https://convertflash.vercel.app/"
  },
  {
  nomeProjeto: "MADFER",
  descricao: "Plataforma de comércio eletrónico especializada na venda de equipamentos e acessórios informáticos. Desenvolvida para proporcionar uma experiência de compra moderna e intuitiva, permitindo aos clientes explorar produtos, comparar opções e adquirir soluções tecnológicas de forma rápida e segura.",
  linkProjecto: "https://madfer.vercel.app/"
}
];

// Imagens associadas a cada projecto (por índice)
const projectImages = [
  { src: "assets/images/project1.PNG", alt: "Key Forge" },
  { src: "assets/images/project2.PNG", alt: "Color Prime" },
  { src: "assets/images/project3.PNG", alt: "Convert Flash" },
  { src: "assets/images/project4.PNG", alt: "Madfer" },
];

// ── Renderizar Projectos ─────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  // Ícone de seta (reutilizado em cada card)
  const arrowSVG = `
    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
    </svg>`;

  container.innerHTML = projects.map((project, index) => {
    const img    = projectImages[index] || { src: '', alt: project.nomeProjeto };
    // Alternar layout: par → texto esquerda / imagem direita | ímpar → inverso
    const isEven = index % 2 === 0;
    const rowClass    = isEven ? 'sm:flex-row' : 'sm:flex-row-reverse';
    const imageBlock  = `
      <div class="w-full sm:w-[300px] h-48 sm:h-[300px] flex-shrink-0 overflow-hidden">
        <img src="${img.src}" alt="${img.alt}"
             class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>`;
    const textBlock = `
      <div class="flex-1 p-8 sm:p-10 flex flex-col justify-center gap-4">
        <span class="text-xs font-bold tracking-widest text-purple-600 uppercase">Projecto</span>
        <h3 class="text-2xl font-extrabold text-gray-800">${project.nomeProjeto}</h3>
        <p class="text-gray-500 text-sm leading-relaxed">${project.descricao}</p>
        <a href="${project.linkProjecto}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center text-royal font-semibold text-sm hover:underline w-fit">
          Ver Projecto ${arrowSVG}
        </a>
      </div>`;

    return `
      <article class="project-card bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${rowClass}">
        ${textBlock}
        ${imageBlock}
      </article>`;
  }).join('');
}

// Executa assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', renderProjects);

// ── Hamburger menu ──────────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const lines      = document.querySelectorAll('.hamburger-line');
let menuOpen     = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);

  if (menuOpen) {
    lines[0].style.transform = 'translateY(8px) rotate(45deg)';
    lines[1].style.opacity   = '0';
    lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    lines[0].style.transform = '';
    lines[1].style.opacity   = '1';
    lines[2].style.transform = '';
  }
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.add('hidden');
  lines[0].style.transform = '';
  lines[1].style.opacity   = '1';
  lines[2].style.transform = '';
}

// ── Navbar shadow on scroll ─────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-md', window.scrollY > 10);
});

// ── Active nav link via IntersectionObserver ────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('a.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Validação do formulário ─────────────────────────────────

// Regras por campo: { id, validar(valor), mensagem }
const rules = [
  {
    id: 'name',
    validate: v => v.trim().length >= 3,
    message: 'O nome deve ter pelo menos 3 caracteres.'
  },
  {
    id: 'email',
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Insira um endereço de e-mail válido.'
  },
  {
    id: 'phone',
    // Opcional — só valida se tiver algo escrito
    validate: v => v.trim() === '' || /^[+\d][\d\s\-().]{6,19}$/.test(v.trim()),
    message: 'Número de telefone inválido.'
  },
  {
    id: 'message',
    validate: v => v.trim().length >= 10,
    message: 'A mensagem deve ter pelo menos 10 caracteres.'
  }
];

/**
 * Mostra ou limpa o erro de um campo.
 * @param {string} id  - id do input/textarea
 * @param {string|null} msg - mensagem de erro (null = limpar)
 */
function setFieldError(id, msg) {
  const field = document.getElementById(id);
  const span  = document.getElementById(id + '-error');
  if (!field || !span) return;

  if (msg) {
    field.classList.add('input-error');
    field.classList.remove('input-valid');
    span.textContent = msg;
    span.classList.remove('hidden');
  } else {
    field.classList.remove('input-error');
    field.classList.add('input-valid');
    span.textContent = '';
    span.classList.add('hidden');
  }
}

/** Valida todos os campos e devolve true se tudo estiver OK. */
function validateForm() {
  let valid = true;
  rules.forEach(({ id, validate, message }) => {
    const field = document.getElementById(id);
    if (!field) return;
    if (!validate(field.value)) {
      setFieldError(id, message);
      valid = false;
    } else {
      setFieldError(id, null);
    }
  });
  return valid;
}

/** Limpa todos os estados de validação. */
function clearValidation() {
  rules.forEach(({ id }) => {
    const field = document.getElementById(id);
    const span  = document.getElementById(id + '-error');
    if (field) { field.classList.remove('input-error', 'input-valid'); }
    if (span)  { span.textContent = ''; span.classList.add('hidden'); }
  });
}

// Valida cada campo em tempo real (ao sair do campo)
document.addEventListener('DOMContentLoaded', () => {
  rules.forEach(({ id, validate, message }) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => {
      if (field.value.trim() !== '' || id === 'name' || id === 'email' || id === 'message') {
        setFieldError(id, validate(field.value) ? null : message);
      }
    });
    // Remove erro ao começar a escrever novamente
    field.addEventListener('input', () => {
      if (field.classList.contains('input-error')) {
        setFieldError(id, validate(field.value) ? null : message);
      }
    });
  });
});

// ── Contact form — envio ─────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();

  // 1. Valida antes de tudo
  if (!validateForm()) return;

  const form       = e.target;
  const btn        = document.getElementById('submit-btn');
  const successMsg = document.getElementById('success-msg');
  const errorMsg   = document.getElementById('error-msg');

  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  btn.textContent = 'A enviar…';
  btn.disabled    = true;

  try {
    const formData = new FormData(form);
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      successMsg.classList.remove('hidden');
      form.reset();
      clearValidation();
      setTimeout(() => successMsg.classList.add('hidden'), 6000);
    } else {
      throw new Error(data.message || 'Erro desconhecido');
    }
  } catch (err) {
    errorMsg.textContent = '❌ Ocorreu um erro ao enviar. Tente novamente.';
    errorMsg.classList.remove('hidden');
    setTimeout(() => errorMsg.classList.add('hidden'), 6000);
    console.error('Web3Forms error:', err);
  } finally {
    btn.textContent = 'Enviar';
    btn.disabled    = false;
  }
}
