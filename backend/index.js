const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const accounts = [
  { id: 2200, username: 'jem', firstname: 'Jem', lastname: 'Ever', accountType: ['Entrepreneur','Professional'], skills: ['SPAs', 'Ecommerce', 'Websites', 'Graphic Design'], hiringOptions: ['Shares'], rating: 5},
  { id: 2190, username: 'jen38950', firstname: 'Jen', lastname: 'Smith', accountType: ['Professional'], skills: ['SPAs', 'Ecommerce', 'Websites', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 3},
  { id: 2180, username: 'betho89', firstname: 'Beth', lastname: 'Antoitte', accountType: ['Entrepreneur'], skills: ['Java', 'Spring Boot', 'Backend Developer'], hiringOptions: ['Hourly','Shares'], rating: 4},
  { id: 2170, username: 'appmaker', firstname: 'Ben', lastname: 'Hill', accountType: ['Professional'], skills: ['UX/UI', 'Graphic Design'], hiringOptions: ['Hourly','Shares'], rating: 4},
]
app.get('/accounts', (req,res) => {
  console.log('accounts called');
  res.send(accounts);
})

app.listen(port, () => console.log('server listening...'));
