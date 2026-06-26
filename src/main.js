import "./style.css";

// Current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Copy email to clipboard on click
const copyBtn = document.getElementById("copy-email");
if (copyBtn) {
  const label = copyBtn.querySelector(".copy-label");
  const email = copyBtn.dataset.email;
  const defaultText = label.textContent;
  let resetTimer;

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts / older browsers
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      label.textContent = "✓ Copied!";
    } catch {
      label.textContent = email;
    }
    copyBtn.classList.add("copied");
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      label.textContent = defaultText;
      copyBtn.classList.remove("copied");
    }, 1800);
  });
}

// Reveal elements on scroll
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
