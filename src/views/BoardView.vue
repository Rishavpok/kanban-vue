<template>
  <div class="board-view">
    <div class="board-header">
      <h1 class="board-title">Kanban Board</h1>
    </div>

    <div class="board-columns">

      <div v-for="item in columns" :key="item.id">
        <BoardColumn :column="item" @add-task="onAddTask($event)" />

      </div>

    </div>

    <AddTaskModal
        v-if="showAddTaskModal"
        @close-task="showAddTaskModal = false"
        @clicked="addTask"
    />

  </div>
</template>


<script setup lang="ts">
import BoardColumn from "@/components/BoardColumn.vue";
import {ref} from "vue";
import AddTaskModal from "@/components/AddTaskModal.vue";


const showAddTaskModal = ref(false);

function addTask(task : any) {
  columns.value.forEach((item) => {
    if(item.status === task.status ) {
       item.tasks.push(task);
    }
  })

  showAddTaskModal.value = false;
}

const columns = ref([
  {
    "id" : 1,
    "title" : "To do",
    "status" : "todo",
    "task_count" : 1,
    "tasks" : []
  },
  {
    "id" : 2,
    "title" : "In Progress",
    "status" : "progress",
    "task_count" : 2,
    "tasks" : []
  },
  {
    "id" : 3,
    "title" : "Completed",
    "status" : "completed",
    "task_count" : 3,
    "tasks" : []
  }
])

function onAddTask(event) {
  console.log("onAddTask", event);
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

