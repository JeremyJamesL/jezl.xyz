const modeToggle = document.querySelector('.form-check-input');
const modeToggleLabel = document.querySelector('.form-check-label');
const htmlDoc = document.querySelector('html');

modeToggle.addEventListener('change', (e) => {
    if(e.target.checked) {
        htmlDoc.setAttribute("data-bs-theme", "dark")
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-sun fs-4 text-white"></i>'
    } else {
        htmlDoc.setAttribute("data-bs-theme", "light")
        modeToggleLabel.innerHTML = '<i class="fa-regular fa-moon fs-4 text-white"></i>'
    }
})