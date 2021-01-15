const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dev_accounts = [
  { id: 2200, username: 'jeb', firstname: 'Jeb', lastname: 'Eichs', accountType: ['Entrepreneur','Professional'], skills: ['SPAs', 'Ecommerce', 'Websites', 'Graphic Design'], hiringOptions: ['Shares'], rating: 5, profileImage: 'profile3.jpg'},
  { id: 2190, username: 'jen38950', firstname: 'Jen', lastname: 'Smith', accountType: ['Professional'], skills: ['SPAs', 'Ecommerce', 'Websites', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 3, profileImage: 'profile5.jpg'},
  { id: 2180, username: 'beny89', firstname: 'Ben', lastname: 'Antoitte', accountType: ['Entrepreneur'], skills: ['Java', 'Spring Boot', 'Backend Developer'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile2.jpg'},
  { id: 2170, username: 'appmaker', firstname: 'Ben', lastname: 'Hill', accountType: ['Professional'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'profile4.jpg'},
  { id: 2171, username: 'cindyloo', firstname: 'Cindy', lastname: 'Summer', accountType: ['Professional'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4, profileImage: 'user_profile.jpg'},
]
app.get('/dev-accounts', (req,res) => {
  console.log('dev-accounts called');
  res.send(dev_accounts);
})

app.listen(port, () => console.log('server listening...'));
