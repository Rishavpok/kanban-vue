import { defineStore } from "pinia";
import { ref } from "vue";

export const useTasks = defineStore("tasks", () => {

    const defaultColumns = [
        { id: 1, title: "To do", status: "todo", tasks: [] },
        { id: 2, title: "In Progress", status: "progress", tasks: [] },
        { id: 3, title: "Completed", status: "completed", tasks: [] }
    ];

    // Load from localStorage OR fallback to defaults
    const columns = ref(
        JSON.parse(localStorage.getItem("columns") || "null") || defaultColumns
    );

    function addTask(task) {
        const column = columns.value.find(c => c.status === task.status);
        if (column) {
            column.tasks.push(task);
        }

        save();
    }

    function setTasksByStatus(status: string, tasks: any[]) {
        const column = columns.value.find(c => c.status === status);
        if (!column) return;
        column.tasks = tasks;
    }

    function updateTask(updatedTask) {
        const currentColumn = columns.value.find(col =>
            col.tasks.some(t => t.id === updatedTask.id)
        );
        if (!currentColumn) return;

        const taskIndex = currentColumn.tasks.findIndex(t => t.id === updatedTask.id);
        if (taskIndex === -1) return;

        const [task] = currentColumn.tasks.splice(taskIndex, 1);

        const newTask = { ...task, ...updatedTask };

        const newColumn = columns.value.find(c => c.status === newTask.status);
        if (newColumn) {
            newColumn.tasks.push(newTask);
        }

        save();
    }
    function removeTask(task :any) {
        const currentColumn = columns.value.find(col =>
            col.tasks.some(t => t.id === task.id)
        );
        if (!currentColumn) return;

        const taskIndex = currentColumn.tasks.findIndex(t => t.id === task.id);
        if (taskIndex === -1) return;

        currentColumn.tasks.splice(taskIndex, 1);

        save()

    }


    function save() {
        // localStorage.setItem("columns", JSON.stringify(columns.value));
    }

    function resetBoard() {
        columns.value = JSON.parse(JSON.stringify(defaultColumns));
        save();
    }

    return { columns, addTask  , updateTask, removeTask, setTasksByStatus};
});
