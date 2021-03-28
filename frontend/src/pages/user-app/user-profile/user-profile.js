// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '@/components/dropdown'
import fileUpload from '@/components/file-upload'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  components: {
    Dropdown,
    fileUpload
  },
  data() {
    return {
      selectedFile: null,
      selectedCategories: [],
      selectedRoles: [],
      selectedHiringOptions: [],
      bio: "",
      user: {}
    }
  },
  async created() {
    this.user = await this.fetchUserById(this.$route.params.id)
    this.selectedCategories = this.user.categories
    this.selectedRoles = this.user.roles
    this.selectedHiringOptions = this.user.hiring_options
    this.bio = this.user.bio
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    allCategories() {
      return ['one', 'two', 'three']
    },
    allRoles() {
      return ['one', 'two', 'three']
    },
    allHiringOptions() {
      return ['one', 'two', 'three']
    },
    isDevUser() {
      return (this.user.user_type_id == "1" || this.user.user_type_id == "3")
    }
  },
  methods: {
    ...mapActions(['updateUser', 'fetchUserById', 'updateUserProfileImg']),
    handleCategoriesSelection(e) {
      this.selectedCategories = e
    },
    handleRolesSelection(e) {
      this.selectedRoles = e
    },
    handleHiringOptionsSelection(e) {
      this.selectedHiringOptions = e
    },
    async updateProfileImage() {
      // TODO
      const res = await this.updateUserProfileImg(this.user.id, this.selectedFile)
      console.log(res)
    }
  }
}
