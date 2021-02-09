// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const roles = ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager'];
const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS'];
const hiring_options = ['Shares', 'Flat Rate'];

// Users 1 - 15 are either developers or dual-account's

module.exports = [
  {
    roles: JSON.stringify([roles[0],roles[2]]),
    categories: JSON.stringify([...categories]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 4,
    bio: 'Frontend and Backend developer with 5 years of experience building webapps and saas projects.',
    user_id: 1
  },
  {
    roles: JSON.stringify([roles[2]]),
    categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 1,
    bio: 'Graphic designer with master photoshop and illustrator skills. Can create graphics for any type of project.',
    user_id: 2
  },
  {
    roles: JSON.stringify([roles[2], roles[3]]),
    categories: JSON.stringify([categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    rating: 5,
    bio: 'Capable of taking on any graphic role. UX/UI and graphic designer.',
    user_id: 3
  },
  {
    roles: JSON.stringify([roles[4]]),
    categories: JSON.stringify([categories[0], categories[1]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    rating: 4,
    bio: 'Skilled devops engineer. Experience with CI/CD like jenkins and gitlab. Setting up production environments and pipelines.',
    user_id: 4
  },
  {
    roles: JSON.stringify([roles[5]]),
    categories: JSON.stringify([...categories]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 3,
    bio: '8 years of project managment experience. Use Agile SDLC methodoligies. Can organize your team and get the best output out of the team.',
    user_id: 5
  },
  {
    roles: JSON.stringify([roles[1]]),
    categories: JSON.stringify([...categories]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 3,
    bio: 'Junior backend developer. Proficient in C# as well as Java with Spring Boot. 3 years developing backend API\'s and services',
    user_id: 6
  },
  {
    roles: JSON.stringify([roles[0]]),
    categories: JSON.stringify([categories[1], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    rating: 3,
    bio: 'Can build any web application using ReactJs, Bootstrap and other 3rd party services. Have experience designing authoriztion logic and managing large number of users',
    user_id: 7
  },
  {
    roles: JSON.stringify([roles[0]]),
    categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    hiring_options: JSON.stringify([...hiring_options]),
    rating: 5,
    bio: 'Have been building websites for 10 years. Familiar with all frontend frameworks inclucing React, Angular and VueJS.',
    user_id: 8
  },
  {
    roles: JSON.stringify([roles[5]]),
    categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: '8 years of project managment experience. Use Agile SDLC methodoligies. Can organize your team and get the best output out of the team.',
    user_id: 9
  },
  {
    roles: JSON.stringify([roles[2], roles[3]]),
    categories: JSON.stringify([categories[1], categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: 'Capable of taking on any graphic role. UX/UI and graphic designer.',
    user_id: 10
  },
  {
    roles: JSON.stringify([roles[0]]),
    categories: JSON.stringify([categories[1], categories[2]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: 'Frontend and Backend developer with 5 years of experience building webapps and saas projects.',
    user_id: 11
  },
  {
    roles: JSON.stringify([roles[4]]),
    categories: JSON.stringify([categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: 'Master of Devops',
    user_id: 12
  },
  {
    roles: JSON.stringify([roles[4]]),
    categories: JSON.stringify([categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 4,
    bio: 'Looking for someone to setup your pipelines and get your project setup for production. I\'m your guy!',
    user_id: 13
  },
  {
    roles: JSON.stringify([roles[5]]),
    categories: JSON.stringify([categories[1], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: 'Project manager. Have worked for startups before and am familiar with the fast pace of a startup.',
    user_id: 14
  },
  {
    roles: JSON.stringify([roles[0]]),
    categories: JSON.stringify([categories[1], categories[2], categories[3]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    rating: 5,
    bio: 'Years of experience building ecommerce sites. Woocommerce, custom builds. DM me.',
    user_id: 15
  },
]
