document.addEventListener('DOMContentLoaded', () => {
  // 1. Получаем ID проекта из ссылки (например, ?id=petalora)
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const errorBlock = document.getElementById('error-message');
  const contentBlock = document.getElementById('project-content');

  // Если ID вообще нет в ссылке, сразу показываем ошибку
  if (!projectId) {
    errorBlock.style.display = "block";
    return; // Останавливаем выполнение скрипта
  }

  // 2. Загружаем данные из нашего "бэкенда" (файла projects.json)
  fetch('projects.json')
    .then(response => {
      // Проверяем, успешно ли загрузился файл
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Превращаем текст файла в рабочий объект JavaScript
      return response.json();
    })
    .then(projectsData => {
      // 3. Этот код выполнится ТОЛЬКО когда данные загрузятся
      
      // Проверяем, есть ли запрошенный проект в загруженных данных
      if (projectsData[projectId]) {
        const project = projectsData[projectId];

        // Заполняем текстовые данные
        document.getElementById('proj-title').textContent = project.title;
        document.getElementById('proj-subtitle').textContent = project.subtitle;
        document.getElementById('proj-about').textContent = project.about;
        document.getElementById('proj-features').textContent = project.features;
        
        // Заполняем картинку
        document.getElementById('proj-image').src = project.imageFull;
        document.getElementById('proj-image').alt = project.title;

        // Настраиваем ссылки
        const liveLink = document.getElementById('proj-live');
        const githubLink = document.getElementById('proj-github');
        
        // Скрываем Live кнопку, ТОЛЬКО если ссылка "#" или пустая
        if (project.liveLink === "#" || !project.liveLink) {
            liveLink.style.display = "none";
        } else {
            liveLink.href = project.liveLink;
            liveLink.style.display = "inline-flex"; // Показываем кнопку, если она была скрыта ранее
        }

        // Скрываем GitHub кнопку, ТОЛЬКО если ссылка "#" или пустая
        if (project.githubLink === "#" || !project.githubLink) {
            githubLink.style.display = "none";
        } else {
            githubLink.href = project.githubLink;
            githubLink.style.display = "inline-flex"; // Показываем кнопку
        }
        // Генерируем список технологий
        const techList = document.getElementById('proj-tech');
        // Очищаем список перед добавлением (на всякий случай)
        techList.innerHTML = ''; 
        project.tech.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${item}</strong>`;
          techList.appendChild(li);
        });

        // Показываем контент
        contentBlock.style.display = "block";
        document.title = `${project.title} — Denis Sokolov`;

      } else {
        // Проекта с таким ID нет в файле JSON
        errorBlock.style.display = "block";
      }
    })
    .catch(error => {
      console.error("Ошибка при загрузке данных:", error);
      errorBlock.innerHTML = "<h1>Ошибка загрузки данных</h1><p>Пожалуйста, попробуйте позже.</p>";
      errorBlock.style.display = "block";
    });
});