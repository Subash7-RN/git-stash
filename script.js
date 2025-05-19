document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute("href").substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Change background on scroll
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    document.body.style.background = scrollPosition > 100 ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)" : "linear-gradient(135deg, #ffecd2, #fcb69f)";
});