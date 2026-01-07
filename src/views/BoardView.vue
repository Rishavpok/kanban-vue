<template>
  <div class="board-view">
    <div class="board-header">
      <h1 class="board-title">Kanban Board</h1>
    </div>

    <div class="board-columns">

      <div v-for="item in taskStore.columns" :key="item.id">
        <BoardColumn :column="item" @add-task="onAddTask"  @move-task="moveTasks" />

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


  </div>
</template>


<script setup lang="ts">
import BoardColumn from "@/components/BoardColumn.vue";
import {onBeforeMount, onMounted, provide, ref} from "vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
import {useTasks} from "@/stores/tasks";


const showAddTaskModal = ref(false);
const taskStore = useTasks()
const tasks = ref(null)
const editTask = ref(false)

provide("sendToBoardView", receive)

function receive(data:any) {
  tasks.value = data
  showAddTaskModal.value = true
  editTask.value = true
}

function addTask(task : any) {
  taskStore.addTask(task);
  showAddTaskModal.value = false;
}

function  update(task : any) {
  taskStore.updateTask(task);
  showAddTaskModal.value = false;
}

function  deleteTask(task : any) {
     taskStore.removeTask(task);
     showAddTaskModal.value = false;
}

function  moveTasks(taks) {
  taskStore.updateTask(taks);
}

function onAddTask() {
  showAddTaskModal.value = true;
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
</style>

