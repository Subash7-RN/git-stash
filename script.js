document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.addEventListener('click', () => {
            alert(`You clicked on section ${index + 1}`);
        });
    });
});