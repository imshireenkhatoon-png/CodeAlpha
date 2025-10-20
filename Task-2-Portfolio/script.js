 // Fade-in animation
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Typing animation text
    const typingText = document.getElementById('typing-text');
    const roles = ['Cyber Security Enthusiast', 'Web Developer', 'Problem Solver'];
    let index = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      const text = roles[index];
      typingText.textContent = isDeleting
        ? text.substring(0, charIndex--)
        : text.substring(0, charIndex++);

      let speed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === text.length) {
        speed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;
        speed = 500;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();
    // Animate skill bars when visible
    const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
        skillObserver.unobserve(entry.target);
        }
    });
    });

    const skillsSection = document.getElementById('skills');
    skillObserver.observe(skillsSection);
