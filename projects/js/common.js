document.addEventListener("DOMContentLoaded", () => {

  /* ================= Hamburger Menu ================= */
  const header = document.querySelector("header");
  const navLinks = document.querySelector(".nav-links");
  if (header && navLinks) {
    const burger = document.createElement("div");
    burger.classList.add("hamburger");
    burger.innerHTML = `<span></span><span></span><span></span>`;
    header.appendChild(burger);

    burger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }

  /* ================= Tabs (制作実績) ================= */
  const tabs = document.querySelectorAll(".tab");
  const allWorkCards = document.querySelectorAll(".work-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.filter;

      allWorkCards.forEach(card => {
        const match = category === "all" || card.dataset.category.includes(category);
        card.style.display = match ? "block" : "none";
        card.classList.toggle("fade-in", match);
      });
    });
  });

  /* ================= Skill Bars Animation ================= */
  let skillsAnimated = false;
  function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      skillsAnimated = true;
      document.querySelectorAll(".skills-grid .bar").forEach((bar, idx) => {
        setTimeout(() => { bar.style.width = bar.dataset.percent + "%"; }, idx * 180);
      });
    }
  }

  /* ================= Smooth Scroll ================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks?.classList.remove("nav-active");
      header.querySelector(".hamburger")?.classList.remove("toggle");
    });
  });

  /* ================= Hero Background Fade ================= */
  const heroBg = document.querySelector(".hero-bg-img");
  if (heroBg) {
    const minBrightness = 1.06;
    const maxBrightness = 1.06;
    const speed = 0.000001;
    let t = 0;

    function fade() {
      t += speed;
      const sine = (Math.sin(t * Math.PI * 2) + 1) / 2;
      const brightness = minBrightness + sine * (maxBrightness - minBrightness);
      heroBg.style.filter = `brightness(${brightness})`;
      requestAnimationFrame(fade);
    }

    fade();
  }

  /* ================= Scroll Fade-in for Sections ================= */
  const observerOptions = { threshold: 0.2 };
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, observerOptions);
  document.querySelectorAll("section").forEach(section => sectionObserver.observe(section));

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("show"); });
  }, observerOptions);
  document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

  /* ================= Scroll Event ================= */
  window.addEventListener("scroll", animateSkillBars);

  /* ================= Hero Text Split & Glass Bubble Animation ================= */
  const heroTextElems = document.querySelectorAll('.hero-title, .hero-subtitle');
  heroTextElems.forEach(el => {
    if (!el.dataset.splitDone) {
      const text = el.textContent.trim();
      el.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        el.appendChild(span);
      });
      el.dataset.splitDone = 'true';
    }
  });

  const bubble = document.querySelector('.glass-bubble');
  const letters = document.querySelectorAll('.hero-title span, .hero-subtitle span');

  if (bubble && letters.length) {
    const bubbleSpeed = 12;
    const scaleMax = 2;
    const scaleMin = 1;
    const threshold = 100;
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = ((timestamp - startTime) / 1000) % bubbleSpeed / bubbleSpeed;
      const x = Math.sin(progress * Math.PI * 2) * 460 + 390;
      bubble.style.transform = `translate(${x}px, -50%)`;

      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const bubbleRect = bubble.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
        const distance = Math.abs(bubbleCenterX - letterCenterX);

        const scale = scaleMin + (scaleMax - scaleMin) * Math.max(0, 1 - distance / threshold);
        letter.style.transform = `scale(${scale})`;
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* ================= "全てのプロジェクトを見る" ================= */
  const allProjectsBtn = document.getElementById('all-projects-btn');
  const firstWorkCardLink = document.querySelector('.work-card a');

  if (allProjectsBtn && firstWorkCardLink) {
    allProjectsBtn.addEventListener('click', e => {
      e.preventDefault();
      const href = firstWorkCardLink.getAttribute('href');
      if (href) window.location.href = href;
    });
  }

});
const scrollContainer = document.getElementById("worksScroll");
const scrollLeftBtn = document.querySelector(".scroll-btn.left");
const scrollRightBtn = document.querySelector(".scroll-btn.right");

const scrollAmount = 360; // 1クリックでスクロールする距離（カード幅＋余白）

scrollLeftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

scrollRightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});


