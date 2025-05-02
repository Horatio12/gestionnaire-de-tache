// class TaskManager {
//     constructor() {
//         this.tabTaskId = [];
//         this.addNewTask = document.querySelector('#addTask');
//         this.addNewTaskModal = document.querySelector('#taskModal');
//         this.closeModal = document.querySelector('#closeModal');
//         this.mainTask = document.querySelector('#main-task__content');
//         this.filterSelect = document.querySelector('.main_header_actions_right_filter');
//         this.addTaskForm = document.querySelector('.form');
//         this.deleteTaskSelectedButton = document.querySelector('.main_header_actions_right_btnDel');

//         this.init();
//     }

//     init() {
//         this.setupEventListeners();
//         this.displayTask();
//     }

//     setupEventListeners() {
//         this.addNewTask.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.addNewTaskModal.classList.add('active');
//         });

//         this.closeModal.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.addNewTaskModal.classList.remove('active');
//         });

//         this.addTaskForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.addTask();
//         });

//         this.deleteTaskSelectedButton.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.deleteTaskSelected();
//         });

//         this.filterSelect.addEventListener('change', () => {
//             this.displayTask();
//         });
//     }

//     initTask() {
//         const task = localStorage.getItem('tasks');
//         if (task) {
//             return JSON.parse(task);
//         } else {
//             localStorage.setItem('tasks', JSON.stringify([]));
//             return [];
//         }
//     }

//     displayTask() {
//         let taskList = this.initTask();
//         this.mainTask.innerHTML = '';

//         const selectedFilter = this.filterSelect.value;
//         if (selectedFilter !== '0') {
//             taskList = taskList.filter(task => task.status === selectedFilter);
//         }

//         if (taskList.length > 0) {
//             this.mainTask.style.display = 'grid';
//             taskList.forEach((item) => {
//                 let statusText = '';
//                 let statusClass = '';
//                 switch (item.status) {
//                     case '2':
//                         statusText = 'Annulé';
//                         statusClass = 'canceled';
//                         break;
//                     case '3':
//                         statusText = 'Terminé';
//                         statusClass = 'completed';
//                         break;
//                     default:
//                         statusText = 'En cours';
//                         statusClass = 'pending';
//                         break;
//                 }

//                 const tagDiv = document.createElement('div');
//                 tagDiv.classList.add('main-task__content-item');

//                 const shortDescription = item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description;

//                 tagDiv.innerHTML = `
//           <div class="main-task__content-item__title">
//             ${item.title}
//           </div>
//           <p class="main-task__content-item__desc">
//             ${shortDescription}
//             <span class="full-description" style="display:none;">${item.description}</span>
//           </p>
//           <div class="main-task__content-item__date">
//             ${item.date}
//           </div>
//           <div class="main-task__content-item__actions">
//             <span class="main-task__content-item__actions_status ${statusClass}">
//               ${statusText}
//             </span>
//             <div>
//               <button class="rounded-btn see-more">v+</button>
//               <button class="rounded-btn modify">m</button>
//               <button class="rounded-btn validate"   >va</button>
//             </div>
//           </div>
//           <input type="checkbox" name="checkTask${item.id}" class="checkTask" data-id=${item.id} >
//         `;

//                 const seeMoreBtn = tagDiv.querySelector('button.see-more');
//                 if (seeMoreBtn) {
//                     seeMoreBtn.addEventListener('click', (e) => {
//                         e.preventDefault();
//                         const descElement = tagDiv.querySelector('.main-task__content-item__desc');
//                         const fullDescription = tagDiv.querySelector('.full-description').textContent;
//                         descElement.textContent = fullDescription;
//                     });
//                 }

//                 const modifyBtn = tagDiv.querySelector('button.modify');
//                 if (modifyBtn) {
//                     modifyBtn.addEventListener('click', (e) => {
//                         e.preventDefault();
//                         this.openModifyModal(item.id);
//                     });
//                 }

//                 const validateBtn = tagDiv.querySelector('button.validate');
//                 if (validateBtn) {
//                     validateBtn.addEventListener('click', (e) => {
//                         e.preventDefault();
//                         this.validateTask(item.id);
//                     });
//                 }

//                 const inputTask = tagDiv.querySelector('input');
//                 if (inputTask) {
//                     inputTask.onchange = (e) => {
//                         const currentDataIdAttribute = e.currentTarget.getAttribute('data-id');
//                         let checkIdTask = this.tabTaskId.find(item => Number(item) == Number(currentDataIdAttribute));
//                         if (checkIdTask) {
//                             this.tabTaskId = this.tabTaskId.filter(item => Number(item) !== Number(currentDataIdAttribute));
//                         } else {
//                             this.tabTaskId.push(Number(currentDataIdAttribute));
//                         }
//                     };
//                 }
//                 this.mainTask.appendChild(tagDiv);
//             });
//         } else {
//             this.mainTask.style.display = 'block';
//             this.mainTask.innerHTML = `
//         <section class="box box-center">
//           <h1>Aucune tache disponible...</h1>
//         </section>
//       `;
//         }
//     }

//     addTask() {
//         const taskTitle = this.addTaskForm.querySelector('input[name="taskTitle"]').value;
//         const taskDescription = this.addTaskForm.querySelector('textarea[name="taskDescription"]').value;
//         const taskDate = this.addTaskForm.querySelector('input[name="taskDate"]').value;

//         if (!taskTitle || !taskDescription || !taskDate) {
//             alert('Please fill in all the fields.');
//             return;
//         }

//         const task = {
//             id: Date.now().toString(),
//             title: taskTitle,
//             description: taskDescription,
//             date: taskDate,
//             status: '1' 
//         };

//         let taskList = this.initTask();
//         taskList.push(task);
//         localStorage.setItem('tasks', JSON.stringify(taskList));
//         this.addTaskForm.reset();
//         this.addNewTaskModal.classList.remove('active');
//         this.displayTask();
//     }

//     validateTask(id) {
//         let taskList = this.initTask();
//         const taskItem = taskList.find(item => item.id === id);
//         if (taskItem) {
//             taskItem.status = '3'; 
//             localStorage.setItem('tasks', JSON.stringify(taskList));
//             this.displayTask();
//         }
//     }

//     openModifyModal(id) {
//         let taskList = this.initTask();
//         const taskItem = taskList.find(item => item.id === id);

//         if (taskItem) {
//             this.addTaskForm.querySelector('input[name="taskTitle"]').value = taskItem.title;
//             this.addTaskForm.querySelector('textarea[name="taskDescription"]').value = taskItem.description;
//             this.addTaskForm.querySelector('input[name="taskDate"]').value = taskItem.date;

//             this.addNewTaskModal.classList.add('active');

//             const submitButton = this.addTaskForm.querySelector('button[type="submit"]');
//             submitButton.textContent = 'Update Task';

//             submitButton.removeEventListener('click', this.updateTask.bind(this, taskItem));

//             submitButton.addEventListener('click', this.updateTask.bind(this, taskItem));
//         }
//     }

//     updateTask(taskItem, e) {
//         e.preventDefault();

//         const updatedTitle = this.addTaskForm.querySelector('input[name="taskTitle"]').value;
//         const updatedDescription = this.addTaskForm.querySelector('textarea[name="taskDescription"]').value;
//         const updatedDate = this.addTaskForm.querySelector('input[name="taskDate"]').value;

//         if (!updatedTitle || !updatedDescription || !updatedDate) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         taskItem.title = updatedTitle;
//         taskItem.description = updatedDescription;
//         taskItem.date = updatedDate;

//         let taskList = this.initTask();
//         localStorage.setItem('tasks', JSON.stringify(taskList));

//         this.addTaskForm.reset();
//         this.addNewTaskModal.classList.remove('active');
//         this.addTaskForm.querySelector('button[type="submit"]').textContent = 'Add Task';
//         this.displayTask();
//     }

//     deleteTaskSelected() {
//         let taskList = this.initTask();

//         if (!Array.isArray(taskList)) {
//             console.error('taskList is not an array. It might be corrupted in localStorage.');
//             return;
//         }

//         const tabTaskIdsNumbers = this.tabTaskId.map(Number);

//         const result = taskList.filter(item => !tabTaskIdsNumbers.includes(Number(item.id)));

//         localStorage.setItem('tasks', JSON.stringify(result));
//         this.displayTask();
//         this.tabTaskId = [];
//     }
// }

// const taskManager = new TaskManager();








// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//   .then(response=> response.json())
//   .then(data=>{
//     console.log(data);
//   })
//   .catch(error=> {
//     console.error('Erreur:',error);
//   })



// axios.get('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//   .then((reponse) => {
//     console.log(reponse.data);
//   })
//   .catch((error) => {
//     console.error("Erreur:", error);
//   });

axios.get('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then((response) => {
    const commits = response.data;
    const commitData = [];

    commits.forEach(commit => {
      const authorName = commit.commit.author.name;
      const authorEmail = commit.commit.author.email;
      const commitMessage = commit.commit.message;
      const commitDate = commit.commit.author.date;
      const commitUrl = commit.html_url;

      const commitInfo = {
        Author: authorName,
        Email: authorEmail,
        Message: commitMessage,
        Date: commitDate,
        URL: commitUrl
      };
      commitData.push(commitInfo);
    });
    console.table(commitData);
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });