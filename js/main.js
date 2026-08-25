document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Glassmorphic Header on Scroll
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    document.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Contact Form Submission with Spinner & Toast
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm && submitBtn && toastMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // UI Loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Request...
      `;

      setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Show toast
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 5000);
      }, 1000);
    });
  }
});
