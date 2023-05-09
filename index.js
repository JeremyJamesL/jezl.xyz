const modeToggle = document.querySelector('.form-check-input');
const modeToggleLabel = document.querySelector('.form-check-label');
const htmlDoc = document.querySelector('html');

modeToggle.addEventListener('change', () => {
    const activeTheme = htmlDoc.getAttribute('data-bs-theme');
    if(activeTheme === 'light') {
        localStorage.setItem("theme", "dark");
        htmlDoc.setAttribute("data-bs-theme", "dark")
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-sun fs-4 text-white"></i>'
    } else {
        localStorage.setItem("theme", "light");
        htmlDoc.setAttribute("data-bs-theme", "light")
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-moon fs-4 text-white"></i>'
    }
})

window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");
    if(theme === "dark") {
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-sun fs-4 text-white"></i>'
        return
    }
    if(theme === "light") {
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-moon fs-4 text-white"></i>';
        return
    }

})