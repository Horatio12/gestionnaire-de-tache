const addNewTask = document.querySelector('#addTask');
const addNewTaskModal = document.querySelector('#taskModal');
const closeModal = document.querySelector('#closeModal');
const filterSelect = document.querySelector('.main_header_actions_right_filter'); // Sélection du select de filtre

addNewTask.addEventListener('click', (e) => {
  e.preventDefault();
  addNewTaskModal.classList.add('active');
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  addNewTaskModal.classList.remove('active');
});

const TASK = {
  tabTaskId: [],
  initTask: function() {
    const task = localStorage.getItem('tasks');
    if (task) {
      return JSON.parse(task);
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
      return [];
    }
  },
  displayTask: () => {
    let taskList = TASK.initTask(); // Récupère la liste complète des tâches
    const mainTask = document.querySelector('#main-task__content');
    mainTask.innerHTML = ``;

    // Appliquer le filtre avant d'afficher les tâches
    const selectedFilter = filterSelect.value; // Valeur sélectionnée dans le select
    if (selectedFilter !== '0') { // '0' = Tous
        taskList = taskList.filter(task => task.status === selectedFilter);
    }

    if (taskList.length > 0) {
      mainTask.style.display = 'grid';
      taskList.forEach((item) => {
        let statusText = '';
        let statusClass = '';
        switch (item.status) {
          case '2':
            statusText = 'Annulé';
            statusClass = 'canceled';
            break;
          case '3':
            statusText = 'Terminé';
            statusClass = 'completed';
            break;
          default:
            statusText = 'En cours';
            statusClass = 'pending';
            break;
        }
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('main-task__content-item');

        const shortDescription = item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description;

        tagDiv.innerHTML = `
          <div class="main-task__content-item__title">
            ${item.title}
          </div>
          <p class="main-task__content-item__desc">
            ${shortDescription}
            <span class="full-description" style="display:none;">${item.description}</span>
          </p>
          <div class="main-task__content-item__date">
            ${item.date}
          </div>
          <div class="main-task__content-item__actions">
            <span class="main-task__content-item__actions_status ${statusClass}">
              ${statusText}
            </span>
            <div>
              <button class="rounded-btn see-more">v+</button>
              <button class="rounded-btn modify">m</button>
              <button class="rounded-btn validate"   >va</button>
            </div>
          </div>
          <input type="checkbox" name="checkTask${item.id}" class="checkTask" data-id=${item.id} >
        `;

        const seeMoreBtn = tagDiv.querySelector('button.see-more');
        if (seeMoreBtn) {
          seeMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const descElement = tagDiv.querySelector('.main-task__content-item__desc');
            const fullDescription = tagDiv.querySelector('.full-description').textContent;
            descElement.textContent = fullDescription;
          });
        }

        const modifyBtn = tagDiv.querySelector('button.modify');
        if (modifyBtn) {
          modifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            TASK.openModifyModal(item.id);
          });
        }

        const validateBtn = tagDiv.querySelector('button.validate');
        if (validateBtn) {
          validateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            TASK.validateTask(item.id);
          });
        }

        const inputTask = tagDiv.querySelector('input');
        if (inputTask) {
          inputTask.onchange = (e) => {
            const currentDataIdAttribute = e.currentTarget.getAttribute('data-id');
            let checkIdTask = TASK.tabTaskId.find(item => Number(item) == Number(currentDataIdAttribute));
            if (checkIdTask) {
              TASK.tabTaskId = TASK.tabTaskId.filter(item => Number(item) !== Number(currentDataIdAttribute));
            } else {
              TASK.tabTaskId.push(Number(currentDataIdAttribute));
            }
          };
        }
        mainTask.appendChild(tagDiv);
      });

    } else {
      mainTask.style.display = 'block';
      mainTask.innerHTML = `
        <section class="box box-center">
          <h1>Aucune tache disponible...</h1>
        </section> 
      `;
    }
  },
  addTask: () => {
    const taskList = TASK.initTask();
    const addTaskForm = document.querySelector('.form');
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = addTaskForm.querySelector('input[name="taskTitle"]').value;
      const taskDescription = addTaskForm.querySelector('textarea[name="taskDescription"]').value;
      const taskDate = addTaskForm.querySelector('input[name="taskDate"]').value;

      if (!taskTitle || !taskDescription || !taskDate) {
        alert('Please fill in all the fields.');
        return;
      }

      const task = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        status: '1' // Statut par défaut à "En cours"
      };
      taskList.push(task);
      localStorage.setItem('tasks', JSON.stringify(taskList));
      addTaskForm.reset();
      addNewTaskModal.classList.remove('active');
      TASK.displayTask();
    });
  },
  validateTask: (id) => {
    const taskList = TASK.initTask();
    const taskItem = taskList.find(item => item.id === id);
    if (taskItem) {
        taskItem.status = '3'; // Définit le statut à "Terminé"
        localStorage.setItem('tasks', JSON.stringify(taskList));
        TASK.displayTask();
    }
  },
  openModifyModal: (id) => {
    const taskList = TASK.initTask();
    const taskItem = taskList.find(item => item.id === id);

    if (taskItem) {
      const addTaskForm = document.querySelector('.form');
      addTaskForm.querySelector('input[name="taskTitle"]').value = taskItem.title;
      addTaskForm.querySelector('textarea[name="taskDescription"]').value = taskItem.description;
      addTaskForm.querySelector('input[name="taskDate"]').value = taskItem.date;

      addNewTaskModal.classList.add('active');

      const submitButton = addTaskForm.querySelector('button[type="submit"]');
      submitButton.textContent = 'Update Task';

      submitButton.removeEventListener('click', TASK.addTask);

      submitButton.addEventListener('click', function updateTask(e) {
        e.preventDefault();

        const updatedTitle = addTaskForm.querySelector('input[name="taskTitle"]').value;
        const updatedDescription = addTaskForm.querySelector('textarea[name="taskDescription"]').value;
        const updatedDate = addTaskForm.querySelector('input[name="taskDate"]').value;

        if (!updatedTitle || !updatedDescription || !updatedDate) {
            alert('Please fill in all fields.');
            return;
        }

        taskItem.title = updatedTitle;
        taskItem.description = updatedDescription;
        taskItem.date = updatedDate;

        localStorage.setItem('tasks', JSON.stringify(taskList));

        addTaskForm.reset();
        addNewTaskModal.classList.remove('active');
        submitButton.textContent = 'Add Task';

        TASK.displayTask();
      });
    }
  },
  deleteTaskSelected: () => {
    const deleteTaskSelected = document.querySelector('.main_header_actions_right_btnDel');

    deleteTaskSelected.addEventListener('click', e => {
      e.preventDefault();
      let taskList = TASK.initTask();

      if (!Array.isArray(taskList)) {
        console.error('taskList is not an array. It might be corrupted in localStorage.');
        return;
      }

      const tabTaskIdsNumbers = TASK.tabTaskId.map(Number);

      const result = taskList.filter(item => !tabTaskIdsNumbers.includes(Number(item.id)));

      localStorage.setItem('tasks', JSON.stringify(result));
      TASK.displayTask();
      TASK.tabTaskId = [];
    });
  },

  setupFilterListener: () => { // Fonction pour gérer le changement de filtre
      filterSelect.addEventListener('change', () => {
          TASK.displayTask(); // Re-afficher les tâches en fonction du filtre
      });
  }

}

TASK.initTask();
TASK.displayTask();
TASK.addTask();
TASK.deleteTaskSelected();
TASK.setupFilterListener(); // Initialiser l'écouteur d'événements pour le filtre