// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const hiring_options = ['Equity (Shares)', 'Flat Rate'];
const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS', 'Software', 'Other'];
const regions = ['US','South America','Africa','Asia','Europe'];
const funding_types = ['Bootstrapped', 'Venture Capital', 'Crowdfunding', 'Friends & Family', 'Debt Capital']
const roles = ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager', 'Dev Agency']

module.exports = [
  {
    creator_id: 1,
    team_member_ids: JSON.stringify([2,4,6]),
    members_needed: JSON.stringify([{ position: roles[6], skills: ['Java', 'Spring Boot'] }]),
    name: 'StrayCat Saver',
    category: categories[0],
    description: 'Helps find homes for stray cats',
    tasks: JSON.stringify([{ id: 1, message: 'Find a front-end developer that has experience with VueJS', status: 'active' },{ id: 2, message: 'Create designs. Jen should have them completed by noon today', status: 'active'},{ id: 3, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.', status: 'active'}]),
    hiring_options: JSON.stringify([...hiring_options]),
    viewable_regions: JSON.stringify([regions[0],regions[4]]),
    funding_types: JSON.stringify([funding_types[0]]),
    is_public: true,
    is_active: true,
    is_featured: true,
  },
  {
    creator_id: 3,
    team_member_ids: JSON.stringify([12,5,7]),
    members_needed: JSON.stringify([{ position: roles[0], skills: ['VueJS', 'Javascript', 'HTML', 'SCSS']}]),
    name: 'Cash App',
    category: categories[1],
    description: 'Send money to anyone anywhere anytime.',
    tasks: JSON.stringify([{ id: 1, message: 'Find a front-end developer that has experience with VueJS', status: 'active' },{ id: 2, message: 'Create designs. Jen should have them completed by noon today', status: 'active'},{ id: 3, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.', status: 'active'}]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    viewable_regions: JSON.stringify([regions[0]]),
    funding_types: JSON.stringify([funding_types[1]]),
    is_public: true,
    is_active: true,
    is_featured: true,
  },
  {
    creator_id: 5,
    team_member_ids: JSON.stringify([11,8,1]),
    members_needed: JSON.stringify([{ position: roles[0], skills: ['VueJS', 'Javascript', 'HTML', 'SCSS']}]),
    name: 'Task Manager',
    category: categories[3],
    description: 'Collaborate with team by assigning tasks to each member and tracking progress.',
    tasks: JSON.stringify([{ id: 1, message: 'Find a front-end developer that has experience with VueJS', status: 'active' },{ id: 2, message: 'Create designs. Jen should have them completed by noon today', status: 'active'},{ id: 3, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.', status: 'active'}]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    viewable_regions: JSON.stringify([regions[0],regions[1]]),
    funding_types: JSON.stringify([funding_types[2]]),
    is_seeking_allys: false,
    is_public: true,
    is_active: false,
    is_featured: false,
  },
  {
    creator_id: 6,
    team_member_ids: JSON.stringify([9,10,13]),
    members_needed: JSON.stringify([{ position: roles[0], skills: ['VueJS', 'Javascript', 'HTML', 'SCSS']}]),
    name: 'Get It Now',
    category: categories[2],
    description: 'Buy any product and have it at your door tomorrow',
    tasks: JSON.stringify([{ id: 1, message: 'Find a front-end developer that has experience with VueJS', status: 'active' },{ id: 2, message: 'Create designs. Jen should have them completed by noon today', status: 'active'},{ id: 3, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.', status: 'active'}]),
    hiring_options: JSON.stringify([...hiring_options]),
    viewable_regions: JSON.stringify([...regions]),
    funding_types: JSON.stringify([funding_types[3]]),
    is_public: false,
    is_active: true,
    is_featured: true,
  },
  {
    creator_id: 16,
    team_member_ids: JSON.stringify([15,1,13]),
    members_needed: JSON.stringify([{ position: roles[0], skills: ['VueJS', 'Javascript', 'HTML', 'SCSS']}, { position: roles[1], skills: ['C#']}]),
    name: 'MediaTree',
    category: categories[0],
    description: 'Find all your favorite movies, music and entertainment in one place.',
    tasks: JSON.stringify([{ id: 1, message: 'Find a front-end developer that has experience with VueJS', status: 'active' },{ id: 2, message: 'Create designs. Jen should have them completed by noon today', status: 'active'},{ id: 3, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.', status: 'active'}]),
    hiring_options: JSON.stringify([...hiring_options]),
    viewable_regions: JSON.stringify([...regions]),
    funding_types: JSON.stringify([funding_types[4]]),
    is_public: true,
    is_active: false,
    is_featured: true,
  }
]
