document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.addEventListener('click', () => {
            alert(`You clicked on section ${index + 1}`);
        });
    });
});

// Change background on scroll
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    document.body.style.background = scrollPosition > 120 ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)" : "linear-gradient(135deg, #ffecd2, #fcb69f)";
});