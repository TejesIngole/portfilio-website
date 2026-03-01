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

// ── 6. CONTACT FORM — EmailJS ──
const EMAILJS_SERVICE_ID  = "service_1i0a7m4";
const EMAILJS_TEMPLATE_ID = "template_z0fekhm";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");

    // Validation
    const name    = form.querySelector("[name='from_name']").value.trim();
    const email   = form.querySelector("[name='from_email']").value.trim();
    const subject = form.querySelector("[name='subject']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    if (!name || !email || !subject || !message) {
      showStatus("⚠️ Please fill in all fields.", "warning");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus("⚠️ Please enter a valid email address.", "warning");
      return;
    }

    // Sending
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
      showStatus("✅ Thanks! I'll get back to you soon.", "success");
      form.reset();

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = "";
        btn.disabled = false;
        hideStatus();
      }, 4000);

    } catch (error) {
      console.error("EmailJS error:", error);
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      btn.disabled = false;
      showStatus("❌ Something went wrong. Email me at ingoletejes@gmail.com", "error");
    }
  });
}

function showStatus(msg, type) {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.style.display = "block";
  if (type === "success") {
    statusEl.style.background = "rgba(34,197,94,0.12)";
    statusEl.style.color = "#4ade80";
    statusEl.style.border = "1px solid rgba(34,197,94,0.25)";
  } else if (type === "error") {
    statusEl.style.background = "rgba(239,68,68,0.12)";
    statusEl.style.color = "#f87171";
    statusEl.style.border = "1px solid rgba(239,68,68,0.25)";
  } else {
    statusEl.style.background = "rgba(251,191,36,0.12)";
    statusEl.style.color = "#fbbf24";
    statusEl.style.border = "1px solid rgba(251,191,36,0.25)";
  }
}

function hideStatus() {
  if (statusEl) statusEl.style.display = "none";
}