// Mobile menu toggle + scroll animations + number counters
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Scroll-triggered fade-in
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.3,
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Animated counters for stats
  const counters = document.querySelectorAll('.stat strong');
  counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;

      const increment = target / 100;

      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };

    // Only animate when in viewport
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          updateCounter();
          obs.unobserve(counter);
        }
      });
    }, {threshold: 1});

    obs.observe(counter);
  });

  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
});
