<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-tasks">
    <Toast
      v-if="toast && toast.isShown"
      :type="toast.type"
      :message="toast.message"
      :hasAction="toast.hasAction"
      :duration="toast.duration"
      @toast-action-click="handleToastAction"
      @toast-close="closeToast"
    >
    </Toast>
    <user-modal
      v-if="isUserModalOpen"
      title="Want to add more connections?"
      btnTxt="Find people..."
      :btnIcon="['fas','user-friends']"
      :imageName="'201brain-knowledge.png'"
      :styles="{'backgroundColor': '#FF8A85', 'color': 'black', 'buttonBackground': '#123D50'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
    <div v-for="project in projectsShown" :key="project.id" class="project-tasks">
      <div class="tasks-collapsible_header" @click="toggleCollapsed">
        <div class="tasks-collapsible_header_left">
          <font-awesome-icon :icon="collapsed ? ['fas','chevron-circle-down'] : ['fas','chevron-circle-up']" class="icon"></font-awesome-icon>
          <h2>{{ project.name }}</h2>
        </div>
        <!-- <div class="tasks-collapsible_header_right">
          <font-awesome-icon v-if="isEditable" @click.stop="$emit('edit-project', project)" :icon="['fas','ellipsis-h']" class="icon ellipse-icon"></font-awesome-icon>
        </div> -->
      </div>
      <div v-if="!collapsed" class="project-tasks_body">
        <draggable
          :list="project.tasks"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <transition-group>
            <div v-for="task in project.tasks" :key="task.id" class="task">
              <div class="task_left">
                <font-awesome-icon :icon="['fas','check']" class="check" :class="{'isChecked' : task.status === 'complete'}"></font-awesome-icon>
                <input
                  v-if="editId === task.id"
                  v-model="task.message"
                  class="edit-message"
                  @blur="editTask(project, task, task.message)"
                  @keyup.enter="editId=null; $emit('update')"
                  v-focus
                >
                <p v-else class="task-description">{{ task.message }}</p>
              </div>
              <div class="actions">
                <button v-if="task.status === 'active'" @click="completeTask(project, task)">completed</button>
                <font-awesome-icon :icon="['fas','pencil-alt']" class="icon" @click="makeEditable(task)"></font-awesome-icon>
                <font-awesome-icon :icon="['fas','trash']" class="icon" @click="removeTask(project, task)"></font-awesome-icon>
              </div>
            </div>
            <!-- <div class="task">
              <div class="task_left">
                <font-awesome-icon :icon="['fas','check']" class="check" :class="{'isChecked' : isChecked}"></font-awesome-icon>
                <p class="task-description">Find a graphic designer with UI/UX background.</p>
              </div>
              <div class="actions">
                <font-awesome-icon :icon="['fas','trash']" class="trash"></font-awesome-icon>
              </div>
            </div>
            <div class="task">
              <div class="task_left">
                <font-awesome-icon :icon="['fas','check']" class="check" :class="{'isChecked' : isChecked}"></font-awesome-icon>
                <p class="task-description">Create a GitHub account.</p>
              </div>
              <div class="actions">
                <font-awesome-icon :icon="['fas','trash']" class="trash"></font-awesome-icon>
              </div>
            </div>
            <div class="task">
              <div class="task_left">
                <font-awesome-icon :icon="['fas','check']" class="check" ></font-awesome-icon>
                <p class="task-description">Open a Business checking account.</p>
              </div>
              <div class="actions">
                <button>mark complete</button>
                <font-awesome-icon :icon="['fas','trash']" class="trash"></font-awesome-icon>
              </div> -->
            <!-- </div> -->
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script src="./user-tasks.js"></script>
<style src="./user-tasks.scss" lang="scss" scoped></style>
