// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const roles = ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager'];
const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS'];
const skills = ['JavaScript', 'React', 'VueJs', 'Android Developement', 'Photoshop', 'Zeplin', 'Python']
const hiring_options = ['Shares', 'Flat Rate'];

// Users 1 - 15 are either developers or dual-account's

module.exports = [
  {
    dev_roles: JSON.stringify([roles[0],roles[2]]),
    dev_categories: JSON.stringify([...categories]),
    dev_skills: JSON.stringify([skills[0], skills[2], skills[4]]),
    hiring_options: JSON.stringify([...hiring_options]),
    dev_bio: 'Frontend and Backend developer with 5 years of experience building webapps and saas projects.',
    dev_rating: 4,
    user_id: 1
  },
  {
    dev_roles: JSON.stringify([roles[2]]),
    dev_categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[4], skills[5]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Graphic designer with master photoshop and illustrator skills. Can create graphics for any type of project.',
    dev_rating: 5,
    user_id: 2
  },
  {
    dev_roles: JSON.stringify([roles[2], roles[3]]),
    dev_categories: JSON.stringify([categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[4], skills[5]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    dev_bio: 'Capable of taking on any graphic role. UX/UI and graphic designer.',
    dev_rating: 4,
    user_id: 3
  },
  {
    dev_roles: JSON.stringify([roles[4]]),
    dev_categories: JSON.stringify([categories[0], categories[1]]),
    dev_skills: JSON.stringify([skills[3]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    dev_bio: 'Skilled devops engineer. Experience with CI/CD like jenkins and gitlab. Setting up production environments and pipelines.',
    dev_rating: 5,
    user_id: 4
  },
  {
    dev_roles: JSON.stringify([roles[5]]),
    dev_categories: JSON.stringify([...categories]),
    dev_skills: JSON.stringify([skills[0], skills[1], skills[2]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: '8 years of project managment experience. Use Agile SDLC methodoligies. Can organize your team and get the best output out of the team.',
    dev_rating: 3,
    user_id: 5
  },
  {
    dev_roles: JSON.stringify([roles[1]]),
    dev_categories: JSON.stringify([...categories]),
    dev_skills: JSON.stringify([skills[0]]),
    hiring_options: JSON.stringify([...hiring_options]),
    dev_bio: 'Junior backend developer. Proficient in C# as well as Java with Spring Boot. 3 years developing backend API\'s and services',
    dev_rating: 2,
    user_id: 6
  },
  {
    dev_roles: JSON.stringify([roles[0]]),
    dev_categories: JSON.stringify([categories[1], categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[1], skills[2]]),
    hiring_options: JSON.stringify([hiring_options[1]]),
    dev_bio: 'Can build any web application using ReactJs, Bootstrap and other 3rd party services. Have experience designing authoriztion logic and managing large number of users',
    dev_rating: 5,
    user_id: 7
  },
  {
    dev_roles: JSON.stringify([roles[0]]),
    dev_categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[2]]),
    hiring_options: JSON.stringify([...hiring_options]),
    dev_bio: 'Have been building websites for 10 years. Familiar with all frontend frameworks inclucing React, Angular and VueJS.',
    dev_rating: 4,
    user_id: 18
  },
  {
    dev_roles: JSON.stringify([roles[5]]),
    dev_categories: JSON.stringify([categories[0], categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[0]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: '8 years of project managment experience. Use Agile SDLC methodoligies. Can organize your team and get the best output out of the team.',
    dev_rating: 3,
    user_id: 21
  },
  {
    dev_roles: JSON.stringify([roles[2], roles[3]]),
    dev_categories: JSON.stringify([categories[1], categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[4], skills[5]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Capable of taking on any graphic role. UX/UI and graphic designer.',
    dev_rating: 4,
    user_id: 16
  },
  {
    dev_roles: JSON.stringify([roles[0]]),
    dev_categories: JSON.stringify([categories[1], categories[2]]),
    dev_skills: JSON.stringify([skills[0], skills[1], skills[2]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Frontend and Backend developer with 5 years of experience building webapps and saas projects.',
    dev_rating: 3,
    user_id: 11
  },
  {
    dev_roles: JSON.stringify([roles[4]]),
    dev_categories: JSON.stringify([categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[6]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Master of Devops',
    dev_rating: 5,
    user_id: 12
  },
  {
    dev_roles: JSON.stringify([roles[4]]),
    dev_categories: JSON.stringify([categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[6]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Looking for someone to setup your pipelines and get your project setup for production. I\'m your guy!',
    dev_rating: 2,
    user_id: 8
  },
  {
    dev_roles: JSON.stringify([roles[5]]),
    dev_categories: JSON.stringify([categories[1], categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[1], skills[4]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Project manager. Have worked for startups before and am familiar with the fast pace of a startup.',
    dev_rating: 5,
    user_id: 14
  },
  {
    dev_roles: JSON.stringify([roles[0]]),
    dev_categories: JSON.stringify([categories[1], categories[2], categories[3]]),
    dev_skills: JSON.stringify([skills[0], skills[2]]),
    hiring_options: JSON.stringify([hiring_options[0]]),
    dev_bio: 'Years of experience building ecommerce sites. Woocommerce, custom builds. DM me.',
    dev_rating: 1,
    user_id: 15
  },
]
