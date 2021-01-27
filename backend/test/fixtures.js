const users = [
  {
    id: 1,
    username: 'jeb',
    password: 'password',
    firstname: 'Jeb',
    lastname: 'Eichs',
    account_types: JSON.stringify(['entrepreneur','developer']),
    skills: JSON.stringify(['SPAs', 'Frontend', 'Websites', 'Graphic Design']),
    hiring_options: JSON.stringify(['Shares']),
    rating: 5,
    profile_image: 'profile3.jpg'
  },
  {
    id: 2,
    username: 'jen38950',
    password: 'password',
    firstname: 'Jen',
    lastname: 'Smith',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['SPAs', 'Backend', 'Websites', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 3,
    profile_image: 'profile5.jpg'
  },
  {
    id: 3,
    username: 'beny89',
    password: 'password',
    firstname: 'Ben',
    lastname: 'Antoitte',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['Java', 'Spring Boot', 'Backend']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 4,
    profile_image: 'profile2.jpg'
  },
  {
    id: 4,
    username: 'appmaker',
    password: 'password',
    firstname: 'Ben',
    lastname: 'Hill',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 4,
    profile_image: 'profile4.jpg'
  },
  {
    id: 5,
    username: 'cindyloo',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 1,
    profile_image: 'user_profile.jpg'
  },
  {
    id: 6,
    username: 'androidDev',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate']),
    rating: 5,
    profile_image: 'profile6.jpg'
  },
  {
    id: 7,
    username: 'ios-dev',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Shares']),
    rating: 5,
    profile_image: 'profile7.jpg'
  },
  {
    id: 8,
    username: 'bestapps',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 4,
    profile_image: 'profile8.jpg'
  },
  {
    id: 9,
    username: 'game-maker',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 4,
    profile_image: 'profile9.jpg'
  },
  {
    id: 10,
    username: 'yoohoo',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['Devops']),
    hiring_options: JSON.stringify(['Flat Rate','Shares']),
    rating: 4,
    profile_image: 'profile10.jpg'
  },
  {
    id: 11,
    username: 'googleplaydev',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 2,
    profile_image: 'profile11.jpg'
  },
  {
    id: 12,
    username: 'gamer3521',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 1,
    profile_image: 'profile12.jpg'
  },
  {
    id: 13,
    username: 'user1',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 4,
    profile_image: 'profile13.jpg'
  },
  {
    id: 14,
    username: 'jeffvan',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 5,
    profile_image: 'profile14.jpg'
  },
  {
    id: 15,
    username: 'joshb',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 4,
    profile_image: 'profile15.jpg'
  },
  {
    id: 16,
    username: 'waveygravy',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 4,
    profile_image: 'profile16.jpg'
  },
  {
    id: 17,
    username: 'bitcoinman',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['Frontend', 'Backend']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 3,
    profile_image: 'profile17.jpg'
  },
  {
    id: 18,
    username: 'webull',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 4,
    profile_image: 'profile18.jpg'
  },
  {
    id: 19,
    username: 'scoobydoo',
    password: 'password',
    firstname: 'Cindy',
    lastname: 'Summer',
    account_types: JSON.stringify(['developer']),
    skills: JSON.stringify(['UX/UI', 'Graphic Design']),
    hiring_options: JSON.stringify(['Hourly','Shares']),
    rating: 2,
    profile_image: 'profile19.jpg'
  },
]


const user = {
  "username":"entre360",
  "password":"password",
  "firstname":"Jeff",
  "lastname":"Swank"
}

module.exports = {
  users,
  user
}
