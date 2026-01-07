<template>
  <div class="board-column" @drop="onDrop"  @dragover.prevent>
    <div class="column-header">
      <h2 class="column-title">{{ props.column.title }}</h2>
      <span class="task-count">{{ props.column.tasks.length }}</span>
      <button class="add-task-btn" @click="$emit('add-task', props.column.status)" >Add Task</button>
    </div>

    <div v-for="item in props.column.tasks" class="task-list">
      <TaskCard :task="item" />
    </div>
  </div>
</template>




<style scoped>
.board-column {
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.column-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.task-count {
  background: #e3e7ee;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
}

.add-task-btn {
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  font-size: 12px;
  cursor: pointer;
}

.add-task-btn:hover {
  background: #e5e7eb;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
<script setup lang="ts">
import TaskCard from "@/components/TaskCard.vue";
import {onMounted} from "vue";


type Column = {
  id: number;
  title: string;
  task_count: number;
  status : string;
  tasks : []
};


const props = defineProps<{
  column: Column
}>()

const emit = defineEmits(['move-task'])

const onDrop = (event: DragEvent) => {
  const taskData = event.dataTransfer?.getData('task');
  if (!taskData) return;

  const task = JSON.parse(taskData);
  // Update task status
  const updatedTask = { ...task, status: props.column.status };


  // Emit to parent to handle task movement
  emit('move-task', updatedTask);
};

</script>