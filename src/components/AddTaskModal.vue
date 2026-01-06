<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">Add Task</h3>
      </div>

      <div class="modal-body">

        <form>
          <div class="field-group" >
            <label for="taskName">Task title</label>
            <input
                v-model="title"
                class="input"
                type="text"
                placeholder="Task title" />

            <span class="error"> {{ titleError }} </span>

          </div>

          <div class="field-group" >
            <label>Task description</label>
            <textarea
                v-model="description"
                class="input"
                type="text"
                placeholder="Task Description" ></textarea>

            <span class="error"> {{ descriptionError }} </span>

          </div>

          <div class="field-group" >
            <label for="status" >Task Status</label>

            <select v-model="status" id="status">
              <option value="todo">To do</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <span class="error"> {{ statusError }} </span>
          </div>


          <div class="field-group" >
            <label for="priority" >Task Priority</label>

            <select v-model="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <span class="error">{{ priorityError }} </span>
          </div>

        </form>

      </div>

      <div class="modal-footer">
        <button class="btn cancel" @click="$emit('close-task')" >Cancel</button>
        <button class="btn primary" @click="onSubmit" >Add Task</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import AddTaskModal from "@/components/AddTaskModal.vue";
import { defineEmits } from 'vue'

const emit = defineEmits(['clicked'])

// form validation and setup

const schema = yup.object({
  title : yup.string().required("Title is required"),
  description : yup.string().required("Description is required"),
  status : yup.string().required("Status is required"),
  priority : yup.string().required("Priority is required"),
})

const { handleSubmit  } = useForm({
   validationSchema: schema,
  initialValues: {
     status: "To do",
     priority: "Low",
  }
});

const { value : title , errorMessage : titleError } = useField("title");
const { value : description , errorMessage : descriptionError } = useField("description");
const { value : status , errorMessage : statusError } = useField("status");
const { value : priority , errorMessage : priorityError } = useField("priority");

const onSubmit = handleSubmit( ( values ) => {
    emit('clicked',values);
} )




</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  border-radius: 12px;
  width: 360px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.modal-header {
  margin-bottom: 10px;
}

.modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.input,
.textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  font-size: 13px;
  box-sizing: border-box;
}

.textarea {
  min-height: 80px;
  resize: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
}

.btn.cancel {
  background: #e5e7eb;
}

.btn.primary {
  background: #6366f1;
  color: #ffffff;
}
</style>
