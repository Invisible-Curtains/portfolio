/* ── CUSTOM CURSOR ─────────────────────────────── */
const curDot  = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  curDot.style.left = mouseX + 'px';
  curDot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  curRing.style.left = ringX + 'px';
  curRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow cursor on interactive elements
document.querySelectorAll('a, button, .project-row, .skill-pill').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    document.body.classList.add('cursor-grow');
  });
  el.addEventListener('mouseleave', function() {
    document.body.classList.remove('cursor-grow');
  });
});


/* ── MOBILE MENU ───────────────────────────────── */
const menuToggle  = document.getElementById('menuToggle');
const mobileMenu  = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', function() {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', !isOpen);
  mobileMenu.setAttribute('aria-hidden', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});


/* ── ACTIVE NAV LINK ON SCROLL ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';

  sections.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


/* ── SCROLL REVEAL ─────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px 0px 0px'
});

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});


/* ── CONTACT FORM (FORMSPREE AJAX) ─────────────── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Success state
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = 'var(--lime)';
        submitBtn.style.color = 'var(--ink)';
        submitBtn.style.borderColor = 'var(--lime)';
        contactForm.reset();

        // Reset button after 5 seconds
        setTimeout(function() {
          submitBtn.textContent = 'Send Message →';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
        }, 5000);

      } else {
        // Error state
        submitBtn.textContent = 'Something went wrong — Try Again';
        submitBtn.disabled = false;
      }

    } catch (error) {
      submitBtn.textContent = 'Network Error — Try Again';
      submitBtn.disabled = false;
    }
  });
}


/* ── NAV BACKGROUND ON SCROLL ──────────────────── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
  if (window.scrollY > 20) {
    nav.style.borderBottomColor = 'var(--border)';
  } else {
    nav.style.borderBottomColor = 'transparent';
  }
});