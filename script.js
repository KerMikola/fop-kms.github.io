const slides = document.getElementById("slides");
const images = slides.querySelectorAll("img");

let index = 0;
const visible = 3; // скільки фото видно одночасно

function slide(dir) {
  index += dir;

  if (index < 0) {
    index = images.length - visible;
  }

  if (index > images.length - visible) {
    index = 0;
  }

  slides.style.transform = `translateX(${-index * 380}px)`;
}


function openForm() {
  document.getElementById("contacts").scrollIntoView({behavior: "smooth"});
}

// Lightbox
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "none";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}


const form = document.getElementById("contactForm");
const success = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  const nameValid = /^[А-Яа-яЇїІіЄєҐґA-Za-z]{2,}\s+[А-Яа-яЇїІіЄєҐґA-Za-z]{2,}$/.test(name);
  const phoneValid = /^\+380\d{9}$/.test(phone);

  if (!nameValid) {
    alert("Вкажіть коректне ім’я та прізвище");
    return;
  }

  if (!phoneValid) {
    alert("Телефон у форматі +380XXXXXXXXX");
    return;
  }

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(() => {
    form.reset();
    success.style.display = "block";
  });
});
