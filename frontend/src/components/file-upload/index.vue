<template>
  <div
    class="file-upload"
    :class="{'dragging': dragging, 'bottom-margin': selectedFile}"
  >
    <input type="file" class="upload-input" name="image" :accept="fileType + '/*'" ref="uploadInput" @change="handleFile($event.target.files[0])">

    <div v-if="!selectedFile" class="no-file" @click="$refs.uploadInput.click()">
      <h4>{{fileTitle}}</h4>
      <div class="btn">Upload</div>
    </div>

    <div v-if="selectedFile" class="has-file" @click="$refs.uploadInput.click()">
      <img v-if="fileType == 'image' && selectedFileBase64" class="selected-image" :src="selectedFileBase64" alt="image">

      <div class="selected-image-text">
        <p>Selected image</p>
        <h6>{{selectedFile.name}}</h6>
      </div>

      <div class="btn">Change</div>

      <div class="remove-btn" @click.stop="handleClear">
        <h4>Clear {{fileType}}</h4>
        <font-awesome-icon :icon="['fas','backspace']" class="icon"></font-awesome-icon>
      </div>
    </div>

    <div
      class="dragzone"
      @drop.prevent="drop"
      @dragover.prevent="dragging=true"
      @dragleave="dragging = false"
      @click="$refs.uploadInput.click()"
    ></div>
  </div>
</template>

<script src="./file-upload.js"></script>
<style src="./file-upload.scss" lang="scss"></style>
