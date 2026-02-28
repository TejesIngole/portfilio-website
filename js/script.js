// ============================================
//   TEJES RAJU INGOLE — PORTFOLIO JAVASCRIPT
// ============================================

// ── 1. TYPING ANIMATION ──
const roles = ["Jr. Data Scientist", "Data Analyst", "AI/ML Engineer"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById("typing");

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// ── 2. STICKY NAVBAR ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.background = "rgba(11,15,26,0.99)";
    navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    navbar.style.background = "rgba(11,15,26,0.95)";
    navbar.style.boxShadow = "none";
  }
});

// ── 3. HAMBURGER MENU ──
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ── 4. ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ── 5. SCROLL REVEAL ──
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── 6. CONTACT FORM ──
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      form.reset();
    }, 3000);
  });
}