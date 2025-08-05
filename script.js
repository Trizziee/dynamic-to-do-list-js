document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText = null, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Add event to remove task
        removeBtn.onclick = () => {
            li.remove();
            updateLocalStorage();
        };

        // Append to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";

        // Save to localStorage
        if (save) {
            updateLocalStorage();
        }
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            const text = li.firstChild.textContent;
            tasks.push(text.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Button click event
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Enter key event
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
