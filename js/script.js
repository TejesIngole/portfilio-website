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

// ── 6. CONTACT FORM — Formspree ──
// Replace YOUR_FORM_ID with your Formspree form ID (e.g. xyzabcde)
const FORMSPREE_ID = "xeelwlav";

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn      = form.querySelector("button[type='submit']");
    const statusEl = document.getElementById("formStatus");

    const from_name  = document.querySelector("[name='from_name']").value.trim();
    const from_email = document.querySelector("[name='from_email']").value.trim();
    const subject    = document.querySelector("[name='subject']").value.trim();
    const message    = document.querySelector("[name='message']").value.trim();

    // Validation
    if (!from_name || !from_email || !subject || !message) {
      showStatus(statusEl, "⚠️ Please fill in all fields.", "warning");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
      showStatus(statusEl, "⚠️ Please enter a valid email address.", "warning");
      return;
    }

    // Sending state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    try {
      const response = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name    : from_name,
          email   : from_email,
          subject : subject,
          message : message
        })
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
        showStatus(statusEl, "✅ Thanks! I'll get back to you soon.", "success");
        form.reset();

        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.style.background = "";
          btn.disabled = false;
          hideStatus(statusEl);
        }, 4000);

      } else {
        const data = await response.json();
        throw new Error(data?.errors?.[0]?.message || "Unknown error");
      }

    } catch (error) {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      btn.disabled = false;
      showStatus(statusEl, "❌ Error: " + error.message, "error");
    }
  });
}

function showStatus(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  if (type === "success") {
    el.style.background = "rgba(34,197,94,0.12)";
    el.style.color = "#4ade80";
    el.style.border = "1px solid rgba(34,197,94,0.25)";
  } else if (type === "error") {
    el.style.background = "rgba(239,68,68,0.12)";
    el.style.color = "#f87171";
    el.style.border = "1px solid rgba(239,68,68,0.25)";
  } else {
    el.style.background = "rgba(251,191,36,0.12)";
    el.style.color = "#fbbf24";
    el.style.border = "1px solid rgba(251,191,36,0.25)";
  }
}

function hideStatus(el) {
  if (el) el.style.display = "none";
}