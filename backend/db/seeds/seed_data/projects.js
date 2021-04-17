// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const hiring_options = ['Shares', 'Flat Rate'];
const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS'];
const regions = ['US','South America','Africa','Asia','Europe'];
const funding_types = ['Bootstrapped', 'Venture Capital', 'Crowdfunding', 'Friends & Family', 'Debt Capital']

module.exports = [
  {
    creator_id: 1,
    team_member_ids: JSON.stringify([2,4,6]),
    name: 'StrayCat Saver',
    category: categories[0],
    description: 'Helps find homes for stray cats',
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
    name: 'Cash App',
    category: categories[1],
    description: 'Send money to anyone anywhere anytime.',
    hiring_options: JSON.stringify([hiring_options[0]]),
    viewable_regions: JSON.stringify([regions[0]]),
    funding_types: JSON.stringify([funding_types[1]]),
    is_public: true,
    is_active: true,
    is_featured: true,
  },
  {
    creator_id: 5,
    team_member_ids: JSON.stringify([11,8,0]),
    name: 'Task Manager',
    category: categories[3],
    description: 'Collaborate with team by assigning tasks to each member and tracking progress.',
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
    name: 'Get It Now',
    category: categories[2],
    description: 'Buy any product and have it at your door tomorrow',
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
    name: 'MediaTree',
    category: categories[0],
    description: 'Find all your favorite movies, music and entertainment in one place.',
    hiring_options: JSON.stringify([...hiring_options]),
    viewable_regions: JSON.stringify([...regions]),
    funding_types: JSON.stringify([funding_types[4]]),
    is_public: true,
    is_active: false,
    is_featured: true,
  }
]
