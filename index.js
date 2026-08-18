document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Service Tabs Interactivity ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      tabPanels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- Form Validation & Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve values
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Basic client side validation checks
      if (!name) {
        alert('Please enter your name.');
        nameInput.focus();
        return;
      }

      if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!message) {
        alert('Please describe your needs/message.');
        messageInput.focus();
        return;
      }

      // Action: Trigger loading state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style="opacity: 0.75;"></path>
        </svg>
        Sending...
      `;

      // Inject spinner animation styles temporarily
      const style = document.createElement('style');
      style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
      document.head.appendChild(style);

      // Simulate backend endpoint delay (1.5 seconds)
      setTimeout(() => {
        // Reset state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Display Success Toast
        showToast();

        // Clear Form fields
        contactForm.reset();
      }, 1500);
    });
  }

  // Helper: Email Validation Regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Toast control helper
  function showToast() {
    if (toastMsg) {
      toastMsg.classList.add('show');
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 4000);
    }
  }
});
