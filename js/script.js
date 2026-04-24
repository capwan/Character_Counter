document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");
    const btnCopy = document.getElementById("btn-copy");
    const btnClear = document.getElementById("btn-clear");

    const counters = {
        chars: document.getElementById("characters"),
        words: document.getElementById("words"),
        sentences: document.getElementById("sentences"),
        paragraphs: document.getElementById("paragraphs")
    };

    let timeout = null;

    // Функция обновления статистики
    const updateStats = () => {
        const text = textarea.value;

        counters.chars.textContent = text.length;
        
        const words = text.trim().split(/\s+/).filter(item => item !== "");
        counters.words.textContent = words.length;

        const sentences = text.split(/[.!?]+/).filter(item => item.trim() !== "");
        counters.sentences.textContent = sentences.length;

        const paragraphs = text.split(/\n+/).filter(item => item.trim() !== "");
        counters.paragraphs.textContent = paragraphs.length;
    };

    // Слушатель ввода с оптимизацией (Debounce)
    textarea.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(updateStats, 50);
    });

    // Логика кнопки очистки
    btnClear.addEventListener("click", () => {
        textarea.value = "";
        updateStats();
        textarea.focus();
    });

    // Логика кнопки копирования
    btnCopy.addEventListener("click", () => {
        const textToCopy = textarea.value;

        if (!textToCopy) return; // Если текста нет, ничего не делаем

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Визуальный отклик
            const originalText = btnCopy.textContent;
            btnCopy.textContent = "Copied!";
            btnCopy.style.backgroundColor = "#00b894"; // Зеленый цвет успеха
            
            setTimeout(() => {
                btnCopy.textContent = originalText;
                btnCopy.style.backgroundColor = "#6c5ce7"; // Возвращаем исходный
            }, 1500);
        }).catch(err => {
            console.error("Ошибка при копировании: ", err);
        });
    });
});