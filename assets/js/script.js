const whatsappPhone = "5586999992577";

function buildWhatsappUrl(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function wireWhatsappLinks() {
  const defaultMessage = "Olá, vim pelo site e gostaria de solicitar um orçamento.";
  const ids = ["headerWhatsapp", "heroWhatsapp", "floatingWhatsapp"];

  ids.forEach((id) => {
    const link = document.getElementById(id);
    if (!link) return;
    link.href = buildWhatsappUrl(defaultMessage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((item) => {
    item.addEventListener("click", () => nav.classList.remove("open"));
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const messageArea = document.getElementById("formMessage");

  if (!form || !messageArea) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const empresa = form.empresa.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const servico = form.servico.value.trim();

    if (!nome || !empresa || !telefone || !email || !servico) {
      messageArea.textContent = "Preencha todos os campos para enviar o orçamento.";
      return;
    }

    const text = [
      "Olá, vim pelo site da Escalando Piauí e quero um orçamento.",
      `Nome: ${nome}`,
      `Empresa/Condomínio: ${empresa}`,
      `Telefone: ${telefone}`,
      `E-mail: ${email}`,
      `Serviço desejado: ${servico}`
    ].join("\n");

    window.open(buildWhatsappUrl(text), "_blank", "noopener,noreferrer");
    messageArea.textContent = "Redirecionando para o WhatsApp...";
    form.reset();
  });
}

wireWhatsappLinks();
setupMobileMenu();
setupContactForm();
