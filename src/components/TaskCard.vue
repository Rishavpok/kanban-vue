<template>
  <div v-if="props.task?.title" class="task-card">
    <div class="task-title">{{ props.task?.title }}</div>
    <div class="task-meta">
      <span class="tag">{{ props.task.description }}</span>
      <span class="assignee"> {{ props.task.priority.slice(0,1).toUpperCase() }} </span>
    </div>
  </div>

  <div v-else >
    No tasks found.
  </div>

</template>

<script setup lang="ts" >

  import {onMounted} from "vue";

  type Task = {
    id : number,
    title : string,
    description : string,
    status : string,
    priority : string,
  }

  const props = defineProps<{
    task : Task
  }>()

  // onMounted(() => {
  //   console.log(props.task)
  // })

</script>



<style scoped>
.task-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  cursor: grab;
  border: 1px solid #e5e7eb;
  margin-top: 10px;
}

.task-card:active {
  cursor: grabbing;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  background: #eef2ff;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 11px;
}

.assignee {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #c7d2fe;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
}
</style>