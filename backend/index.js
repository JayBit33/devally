const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const accounts = [
  { id: 2200, username: 'jeb', firstname: 'Jeb', lastname: 'Eichs', accountType: ['entrepreneur','developer'], skills: ['SPAs', 'Frontend', 'Websites', 'Graphic Design'], hiringOptions: ['Shares'], rating: 5, profileImage: 'profile3.jpg'},
  { id: 2190, username: 'jen38950', firstname: 'Jen', lastname: 'Smith', accountType: ['developer'], skills: ['SPAs', 'Backend', 'Websites', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 3, profileImage: 'profile5.jpg'},
  { id: 2380, username: 'beny89', firstname: 'Ben', lastname: 'Antoitte', accountType: ['developer'], skills: ['Java', 'Spring Boot', 'Backend'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile2.jpg'},
  { id: 2170, username: 'appmaker', firstname: 'Ben', lastname: 'Hill', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile4.jpg'},
  { id: 2171, username: 'cindyloo', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares', 'Project Fee'], rating: 1, profileImage: 'user_profile.jpg'},
  { id: 2172, username: 'androidDev', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 5, profileImage: 'profile6.jpg'},
  { id: 2173, username: 'ios-dev', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 5, profileImage: 'profile7.jpg'},
  { id: 2174, username: 'bestapps', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile8.jpg'},
  { id: 2175, username: 'game-maker', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile9.jpg'},
  { id: 2176, username: 'yoohoo', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['Devops'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile10.jpg'},
  { id: 2177, username: 'googleplaydev', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 2, profileImage: 'profile11.jpg'},
  { id: 2178, username: 'gamer3521', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 1, profileImage: 'profile12.jpg'},
  { id: 2179, username: 'user1', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile13.jpg'},
  { id: 2181, username: 'jeffvan', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 5, profileImage: 'profile14.jpg'},
  { id: 2182, username: 'joshb', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile15.jpg'},
  { id: 2183, username: 'waveygravy', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile16.jpg'},
  { id: 2184, username: 'bitcoinman', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['Frontend', 'Backend'], hiringOptions: ['Hourly','Shares'], rating: 3, profileImage: 'profile17.jpg'},
  { id: 2185, username: 'webull', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile18.jpg'},
  { id: 2186, username: 'scoobydoo', firstname: 'Cindy', lastname: 'Summer', accountType: ['developer'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 2, profileImage: 'profile19.jpg'},
]
app.get('/dev-accounts', (req,res) => {
  console.log('dev-accounts called');
  setTimeout(() => {
    res.send(accounts.filter(a => a.accountType.includes('developer')));
  }, 0);
})

app.listen(port, () => console.log('server listening...'));
