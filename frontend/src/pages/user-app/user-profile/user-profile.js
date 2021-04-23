// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '@/components/dropdown'
import fileUpload from '@/components/file-upload'
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'UserProfile',
  components: {
    Dropdown,
    fileUpload
  },
  data() {
    return {
      allCategories: [],
      allRoles: [],
      allHiringOptions: [],
      selectedFile: null,
      selectedCategories: [],
      selectedRoles: [],
      selectedHiringOptions: [],
      bio: "",
      user: {},
      isDevUser: false
    }
  },
  async created() {
    this.user = await this.fetchUserById(this.$route.params.id)
    if (this.user.user_type_id == '1') {
      this.selectedCategories = this.user.dev_categories
    } else {
      this.selectedCategories = this.user.visionary_categories
    }
    this.selectedRoles = this.user.dev_roles
    this.selectedHiringOptions = this.user.hiring_options
    this.bio = this.user.bio

    const res = await this.getDevOptions()
    this.allCategories = res.categories
    this.allRoles = res.roles
    this.allHiringOptions = res.hiring_options
    this.isDevUser = this.user.user_type_id == "1"
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapMutations(['updateLoggedInUser']),
    ...mapActions(['updateUser', 'fetchUserById', 'getDevOptions', 'updateUserProfileImg']),
    changeAccountType(type) {
      this.isDevUser = (type === 'developer')
    },
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
      let formData = new FormData(document.getElementById('upload-form'))
      try {
        await this.updateUserProfileImg({ id: this.user.id, form: formData})
        return true
      } catch {
        return false
      }
    },
    async updateProfile() {
      let id = this.$route.params.id

      let devResponse = false
      let bioResponse = false
      let visionaryResponse = false
      if (this.isDevUser) {
        let updates = {
          dev_categories: JSON.stringify(this.selectedCategories),
          dev_roles: JSON.stringify(this.selectedRoles),
          hiring_options: JSON.stringify(this.selectedHiringOptions),
          dev_bio: this.bio
        }
        devResponse = await this.updateUser({ id, updates, table: 'developers'})
      } else {
        let updates = {
          visionary_categories: JSON.stringify(this.selectedCategories)
        }
        visionaryResponse = await this.updateUser({ id, updates, table: 'users'})
      }
      bioResponse = await this.updateUser({ id, updates: {bio: this.bio}, table: 'users'})

      let profileResponse = true
      if (this.selectedFile) {
        profileResponse = await this.updateProfileImage()
      }

      let toast = {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }

      let successfullUserResponses = false
      if (this.isDevUser) {
        if (devResponse) successfullUserResponses = true
        else successfullUserResponses = false
      } else {
        if (visionaryResponse) successfullUserResponses = true
        else successfullUserResponses = false
      }
      
      if (successfullUserResponses && bioResponse && profileResponse) {
        toast.message = [{ text: 'You have', emphasis: false }, { text: 'successfully', emphasis: true }, { text: 'updated your profile', emphasis: false }],
        toast.type = 'success'
      } else {
        toast.message = [{ text: 'You have', emphasis: false }, { text: 'unsuccessfully', emphasis: true }, { text: 'updated your profile', emphasis: false }]
        toast.type = 'error'
      }
      toast.duration = 5000
      toast.isShown = true
      this.selectedFile = null
      this.$emit('toast-update', toast)

      let userResponse = await this.fetchUserById(id)
      this.updateLoggedInUser(userResponse)
    }
  }
}
