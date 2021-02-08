// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const roles = ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager'];
const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS'];
const hiring_options = ['Shares', 'Flat Rate'];


module.exports = [
  {
    roles: JSON.stringify([roles[0],roles[2]]),
    categories: JSON.stringify([...categories]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 1,
    bio: 'this is a bio',
    profile_image: 'user_profile.jpg',
    user_id: 1
  },
  {
    roles: JSON.stringify([roles[0],roles[1]]),
    categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 1,
    bio: 'this is a bio',
    profile_image: 'user_profile.jpg',
    user_id: 2
  },
  {
    roles: JSON.stringify([roles[0], roles[1]]),
    categories: JSON.stringify([categories[2], categories[3]]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 1,
    bio: 'this is a bio',
    profile_image: 'user_profile.jpg',
    user_id: 3
  },
]
