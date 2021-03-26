export default {
  name: 'file-upload',
  props: ['fileTitle', 'fileType', 'selectedFile'],
  data() {
    return {
      dragging: false,
      selectedFileBase64: null
    }
  },
  methods: {
    drop(e) {
      this.handleFile(e.dataTransfer.files[0])
      this.dragging = false
    },
    handleClear() {
      this.$refs.uploadInput.value = null
      this.$emit('file-clear')
    },
    handleFile(file) {
      if (file) {
        this.$emit('file-change', file)
      }
    }
  },
  watch: {
    selectedFile() {
      if (!this.selectedFile) return
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.selectedFileBase64 = reader.result
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
        this.selectedFileBase64 = null
      };
    }
  }
}