// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ProfileBio from '../../components/profile-bio';
import FilterSearch from '../../components/filter-search';
import PaginationMixin from '../../mixins/paginationMixin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Devs",
  data() {
    return {
      allHiringOption: null,
      allSkills: null,
      isLoading: true,
      refreshUsers: false,
      searchInput: null,
      // pageSize: 5,
      // currentPageIdx: 1,
      // startIdx: 0,
      // endIdx: 5,
      filters: null
    }
  },
  components: {
    FilterSearch,
    ProfileBio
  },
  mixins: [PaginationMixin],
  computed: {
    ...mapGetters(['getDevUsers']),
    users() {
      if (!this.filters) {
        if (this.searchInput) {
          return this.getDevUsers.filter(user => {
            let filterBool = true
            let letters = [...this.searchInput]
            letters.forEach((letter, i) => {
              let username = user.username
              let firstname = user.firstname
              if (letter.toLowerCase() != username[i].toLowerCase() && letter.toLowerCase() != firstname[i].toLowerCase())  {
                filterBool = false
              }
            });
          return filterBool
          })
        } else {
          return this.getDevUsers;
        }
      } else {
        return this.getDevUsers.filter(user => {
          return user.hiring_options.some(option => this.filters.hiringOption.includes(option)) &&
            user.roles.some(skill => this.filters.skills.includes(skill))  &&
            Number(user.rating) >= Number(this.filters.rating.split('')[2])
        })
      }
    },
    usersShown() {
      return this.users ? this.users.slice(this.startIdx, this.endIdx) : [];
    }
  },
  async created() {
    this.fetchDevUsers()
    const { roles, hiring_options } = await this.getDevOptions()
    this.allHiringOption = hiring_options
    this.allSkills = roles
  },
  methods: {
    ...mapActions(['fetchDevUsers', 'getDevOptions']),
    // updateDisplayedUsers(page) {
    //   if (page === 1) {
    //     this.startIdx = 0;
    //     this.currentPageIdx = 1
    //   } else {
    //     this.startIdx = (page * this.pageSize) - this.pageSize;
    //     this.currentPageIdx = page
    //   }
    //   this.endIdx = this.pageSize * page;
    //   window.scrollTo(0,0);
    // },
    showRefresh() {
      this.refreshUsers = true
      setTimeout(() => {
        this.refreshUsers = false
      }, 200)
    },
    searchInputChange(input) {
      this.filters = null;
      this.searchInput = input
      this.updateDisplayedUsers(1);
      this.showRefresh()
    },
    updateUsersShown(filters) {
      this.filters = filters;
      if (filters === null) {
        this.searchInput = null
        return
      }
      // Make sure to add all possible values for hiringOptin, skills & rating when they are null
      if (this.filters.hiringOption === null) { this.filters.hiringOption = this.allHiringOption }
      if (this.filters.skills === null || this.filters.skills.length === 0) { this.filters.skills = this.allSkills; }
      if (this.filters.rating === null) { this.filters.rating = '>=1'; }
      this.updateDisplayedUsers(1); // send pagination back to page 1 on filter
      this.showRefresh()
    },
  },
  watch: {
    users() {
      if (this.users && this.users.length > 0) this.isLoading = false;
    }
  }
};
