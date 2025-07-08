function typeText(element, text, speed = 80) {
    let index = 0;
    const typing = () => {
        if (index <= text.length) {
            element.textContent = text.slice(0, index);
            index++;
            setTimeout(typing, speed);
        }
    };
    typing();
}

// Voor paginatitel (typewriter effect)
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("visible")) {
            entry.target.classList.add("visible");
            const text = entry.target.getAttribute("data-text");
            typeText(entry.target, text);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.page-title').forEach(el => {
    titleObserver.observe(el);
});

// Voor dienstkaarten (fade-in animatie)
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.dienst-card').forEach(card => {
    cardObserver.observe(card);
});
// Voor voordelen-sectie
const voordeelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.voordeel').forEach(el => {
    voordeelObserver.observe(el);
});
