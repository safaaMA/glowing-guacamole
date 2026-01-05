 
  // ---------- Slider (only if exists) ----------
  const slides = document.querySelector('.slides');
  const dotsContainer = document.querySelector('.dots');

  if (slides && dotsContainer) {
    const images = document.querySelectorAll('.slides img');
    let index = 0;
    let startX = 0;
    let isDragging = false;
    let prevTranslate = 0;
    let autoSlide;

    // create dots
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
      });
    });

    const dots = dotsContainer.querySelectorAll('span');

    function updateSlider() {
      slides.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
      prevTranslate = -index * slides.clientWidth;
    }

    function nextSlide() {
      index = (index + 1) % images.length;
      updateSlider();
    }

    autoSlide = setInterval(nextSlide, 3000);

    // drag handlers (basic, safe)
    slides.addEventListener('mousedown', dragStart);
    slides.addEventListener('touchstart', dragStart, {passive: true});
    slides.addEventListener('mouseup', dragEnd);
    slides.addEventListener('mouseleave', dragEnd);
    slides.addEventListener('touchend', dragEnd);
    slides.addEventListener('mousemove', dragAction);
    slides.addEventListener('touchmove', dragAction, {passive: true});

    function dragStart(e) {
      isDragging = true;
      startX = getPositionX(e);
      slides.style.transition = 'none';
      clearInterval(autoSlide);
    }

    function dragAction(e) {
      if (!isDragging) return;
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startX;
      slides.style.transform = `translateX(${prevTranslate + diff}px)`;
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      // حساب تقريبي للحركة — نضبط على عرض العنصر
      const computed = window.getComputedStyle(slides).transform;
      let translateX = 0;
      if (computed && computed !== 'none') {
        const match = computed.match(/matrix\((.+)\)/);
        if (match) {
          // matrix(a, b, c, d, tx, ty) -> tx = 5th item
          const parts = match[1].split(',').map(s => s.trim());
          translateX = parseFloat(parts[4]) || 0;
        }
      }
      const movedBy = prevTranslate - translateX;

      if (movedBy < -50 && index < images.length - 1) index++;
      if (movedBy > 50 && index > 0) index--;

      slides.style.transition = 'transform 0.3s ease';
      updateSlider();
      // استئناف التشغيل التلقائي
      autoSlide = setInterval(nextSlide, 3000);
    }

    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // تعديل على تغيير حجم النافذة
    window.addEventListener('resize', () => {
      prevTranslate = -index * slides.clientWidth;
      updateSlider();
    });
  } // end slider guard
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    reveals.forEach((reveal) => {
        var windowHeight = window.innerHeight;
        var elementTop = reveal.getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add("active");
        } else {
            reveal.classList.remove("active");
        }
    });
}
window?.addEventListener("scroll", reveal);

document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        const progressValue = circle.getAttribute('data-progress');
        if (progressValue) {
            console.log(`Setting --progress to ${progressValue}%`); // Print to console for debugging
            circle.style.setProperty('--progress', `${progressValue}%`);
        }
    });
});