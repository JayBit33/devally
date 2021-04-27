import { mount, createLocalVue } from '@vue/test-utils'
import ConnectionCard from '@/components/connection-card'

const localVue = createLocalVue()
localVue.config.productionTip = false

describe('ConnectionCard.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(ConnectionCard, {
      localVue,
      propsData: {
        connection: {
          username: 'jeb',
          email: 'jeb352@gmail.com',
          password: '4872908ifopsjifolsjfiojfklsjlfjskljf',
          firstname: 'Jeb',
          lastname: 'Eichs',
          rating: 4,
          user_type_id: "1",
          bio: 'Ready to dedicate time to moving this idea forward.',
          visionary_categories: ['Website', 'SAAS'],
          profile_image: 'uploads/profile19.jpg',
          connections: [1,7,12],
          notifications: [
            { senderId: 4, projectId: null, message: 'wants to add you as a connection', type: 'received' },
            { senderId: 12, projectId: 4, message: 'Project Invitation:', type: 'received' }],
          tasks: [{ projectId: 3, message: 'Find a front-end developer that has experience with VueJS' },{ projectId: 11, message: 'Create designs. Jen should have them completed by noon today' },{ projectId: 21, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.'}],
          notification_settings: { messages: true, added_connection: true, project_invitation: true },
          subscription_settings: { featured_projects: true, weekly_news: true, updates: true },
          dev_roles: ['Frontend', 'Backend'],
          dev_categories: ['Website', 'Mobile App', 'Ecommerce', 'SAAS'],
          dev_skills: ['JavaScript', 'VueJs', 'Photoshop'],
          hiring_options: ['Shares', 'Flat Rate'],
          portfolio: [],
          dev_bio: 'Frontend and Backend developer with 5 years of experience building webapps and saas projects.',
          dev_rating: 4,
          user_id: 1
        },
        isMinimized: false,
        isChecked: false
      }
    })
  })

  it('renders root component', () => {
    expect(cmp.find('.connection-card').exists()).toBe(true)
  })

  describe('test all connection card computed properties', () => {
    it('computed property fullNamee', () => {
      expect(cmp.vm.fullName).toBe('Jeb Eichs')
    })

    it('computed property accountType', () => {
      expect(cmp.vm.accountType).toBe('developer | visionary')
    })

    it('computed property roles', () => {
      expect(cmp.vm.roles).toEqual(['FE','BE'])
    })
  })

  describe('test all connection card methods', () => {
    it('getImage method', () => {
      const filePath = 'profile_img12.jpg'
      expect(cmp.vm.getImage(filePath)).toBe(`http://localhost:3000/${filePath}`)
    })
  })

})
