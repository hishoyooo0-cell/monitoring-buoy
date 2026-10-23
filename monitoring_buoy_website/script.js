/* =====================================================
   OUR SOLUTIONS — ANIMASI CARD
   Menggunakan class HTML asli kamu
===================================================== */

const solutionShowcase = document.querySelector(".solution-showcase");

if (solutionShowcase) {
  const mainCard = solutionShowcase.querySelector(".solution-main");
  const sideCards = solutionShowcase.querySelectorAll(".solution-side");
  const allCards = [mainCard, ...sideCards].filter(Boolean);

  function activateCard(selectedCard) {
    allCards.forEach((card) => {
      card.classList.toggle("solution-active", card === selectedCard);
    });
  }

  // Card pertama aktif saat halaman dibuka
  if (mainCard) {
    activateCard(mainCard);
  }

  // Aktifkan card yang sedang diarahkan kursor
  allCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      activateCard(card);
    });

    // Dukungan keyboard
    card.addEventListener("focus", () => {
      activateCard(card);
    });
  });

  // Kembali ke Real-Time Monitoring saat kursor keluar
  solutionShowcase.addEventListener("mouseleave", () => {
    if (mainCard) {
      activateCard(mainCard);
    }
  });
}

// KODE ANIMASI OUR SOLUTIONS
// ...kode animasi kamu yang sudah ada...

// ==============================
// NAVBAR DROPDOWN - OUR PROJECT
// ==============================

document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");

  if (!toggle) return;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  dropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      dropdown.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdown.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
});
