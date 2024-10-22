document.addEventListener('DOMContentLoaded', () => {
    // Функція для отримання кількості завантажень для конкретного файлу
    function getDownloadCount(file) {
        return parseInt(localStorage.getItem(`downloadCount_${file}`)) || 0;
    }

    // Функція для оновлення лічильника на сторінці та в localStorage
    function updateDownloadCount(file) {
        let count = getDownloadCount(file) + 1;
        localStorage.setItem(`downloadCount_${file}`, count);

        // Знаходимо відповідний <span> для оновлення кількості завантажень
        const countSpan = document.querySelector(`.download-count[data-file="${file}"]`);
        if (countSpan) {
            countSpan.innerText = count;
        } else {
            console.error(`Елемент з data-file="${file}" не знайдено!`);
        }
    }

    // Ініціалізуємо значення лічильника при завантаженні сторінки
    document.querySelectorAll('.download-count').forEach(span => {
        const file = span.getAttribute('data-file');
        span.innerText = getDownloadCount(file);
    });

    // Додаємо обробники кліків для кнопок завантаження
    document.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', () => {
            const file = button.getAttribute('data-file');
            updateDownloadCount(file);
        });
    });
});
