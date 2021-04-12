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
    this.selectedCategories = this.user.categories
    this.selectedRoles = this.user.roles
    this.selectedHiringOptions = this.user.hiring_options
    this.bio = this.user.bio

    const res = await this.getDevOptions()
    this.allCategories = res.categories
    this.allRoles = res.roles
    this.allHiringOptions = res.hiring_options
    this.isDevUser = (this.user.user_type_id == "1" || this.user.user_type_id == "3")
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapMutations(['updateLoggedInUser']),
    ...mapActions(['updateUser', 'fetchUserById', 'getDevOptions', 'updateUserProfileImg']),
    changeAccountType(type) {
      if (!(this.user.user_type_id == "3")) return
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
        let res = await this.updateUserProfileImg({ id: this.user.id, form: formData})
        this.updateLoggedInUser(res)
        return true
      } catch {
        return false
      }
    },
    async updateProfile() {
      let id = this.$route.params.id
      let updates = {
        categories: JSON.stringify(this.selectedCategories),
        roles: JSON.stringify(this.selectedRoles),
        hiring_options: JSON.stringify(this.selectedHiringOptions),
        bio: this.bio
      }
      let table = this.isDevUser ? 'developers' : 'visionaries'
      const response = await this.updateUser({id, updates, table})

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
      if (response && profileResponse) {
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
    }
  }
}
