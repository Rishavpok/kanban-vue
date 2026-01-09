<template>
  <div class="board-view">
    <div class="board-header">
      <h1 class="board-title">Kanban Board</h1>
    </div>

    <div class="board-columns">

      <div v-for="item in taskStore.columns" :key="item.id">
        <BoardColumn
            :column="item"
            @add-task="onAddTask"
            @move-task="moveTasks" />

      </div>

    </div>

    <AddTaskModal
        v-if="showAddTaskModal"
        @close-task="showAddTaskModal = false"
        @clicked="addTask"
        @updated="update"
        @deleted="deleteTask"
        :task="tasks"
        :editMode="editTask"
    />

    <button class="logout-btn" @click="logout">
      Logout
    </button>

  </div>
</template>


<script setup lang="ts">
import BoardColumn from "@/components/BoardColumn.vue";
import {onBeforeMount, onMounted, provide, ref} from "vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
import {useTasks} from "@/stores/tasks";
import { getTasks , createTask, updateTask , deleteTasks} from "@/service/tasks/tasks.service";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";


const showAddTaskModal = ref(false);
const taskStore = useTasks()
const tasks = ref(null)
const editTask = ref(false)
const error = ref("")
const toast  = useToast()
const  router = useRouter()

provide("sendToBoardView", receive)

function receive(data:any) {
  tasks.value = data
  showAddTaskModal.value = true
  editTask.value = true
}

async function addTask(task : any) {
  try {
    const res = await createTask(task)
    if(res) {
        toast.success("Task added successfully.")
        await fetchTasks()
        showAddTaskModal.value = false;
    }
  } catch (e) {
     error.value = "Something went wrong";
  } finally {
    showAddTaskModal.value = false;
  }
}

 async function  update(task : any) {
  try {
    const  res = await updateTask(task)
    if(res) {
      toast.success("Task updated successfully.")
      await fetchTasks()
    }
  } catch (e) {
    error.value = "Something went wrong";
  } finally {
    showAddTaskModal.value = false;
  }

}

 async function deleteTask(task : any) {
     try {
       const res = await deleteTasks(task.id)
       if(res) {
         toast.success("Task deleted successfully.")
         await fetchTasks()
       }
     } catch (e) {
       error.value = "Something went wrong";
       toast.error("Something went wrong");
     } finally {
       showAddTaskModal.value = false;
     }
}

 async function  moveTasks(tasks) {

  try {
    const  res = await updateTask(tasks)
    if(res) {
      toast.success("Task updated successfully.")
      await fetchTasks()
    }
  } catch (e) {
    error.value = "Something went wrong";
    toast.error("Something went wrong");
  } finally {
    showAddTaskModal.value = false;
  }

}

function onAddTask() {
  // tasks.value = null
  editTask.value = false
  showAddTaskModal.value = true;
}

onMounted(  () => {
   fetchTasks()
})

 async function fetchTasks() {

  try {
     const [todoRes , inProgressRes, completedRes] = await Promise.all([
         getTasks('todo'),
         getTasks('progress'),
         getTasks('completed'),
     ])

    taskStore.setTasksByStatus("todo", todoRes.data.data);
    taskStore.setTasksByStatus("progress", inProgressRes.data.data);
    taskStore.setTasksByStatus("completed", completedRes.data.data);
  } catch (e) {
    error.value = "Something went wrong";
  }

}

function logout() {
  localStorage.removeItem("token"); // or whatever key you use
  // taskStore.$reset?.(); // optional: clear pinia state
  router.push("/login");
}



</script>

<style scoped>
.board-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f4f5f7;
  padding: 16px;
  box-sizing: border-box;
}

.board-header {
  margin-bottom: 12px;
}

.board-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.board-columns {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  align-items: flex-start;
}

.logout-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.logout-btn:hover {
  background-color: #dc2626;
}

</style>

