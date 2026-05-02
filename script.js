document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Запрещаем стандартную перезагрузку страницы

    const form = event.target;
    const button = document.getElementById('submit-button');
    const status = document.getElementById('form-status');
    const formData = new FormData(form);

    // Визуальный фидбек: меняем текст кнопки
    button.disabled = true;
    button.innerHTML = "Отправка...";

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "✅ Спасибо! Сообщение успешно отправлено.";
            status.style.color = "green";
            form.reset(); // Очищаем форму
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "❌ Ошибка при отправке. Попробуйте еще раз.";
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "❌ Произошла ошибка сети. Проверьте соединение.";
        status.style.color = "red";
    }).finally(() => {
        button.disabled = false;
        button.innerHTML = "Отправить сообщение";
    });
});
document.addEventListener('DOMContentLoaded', () => {
  // Находим все карточки проектов внутри сетки
  const projectCards = document.querySelectorAll('.projects-grid .card');
  // Находим сам элемент счетчика
  const countElement = document.querySelector('.section-count');

  if (countElement) {
    const count = projectCards.length;
    // Обновляем текст, учитывая правильное окончание
    countElement.textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  }
});