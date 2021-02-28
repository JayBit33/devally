// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
const express = require('express');
const router = express.Router();
const queries = require('../db/project-queries');

function validProject(project) {
  const hasCreator = typeof project.creator_id == 'number' && project.creator_id.trim() != '';
  const hasName = typeof project.name == 'string' && project.name.trim() != '';
  const hasCategory = typeof project.category == 'string' &&  project.category.trim() != '';
  const hasDescription = typeof project.description == 'string' &&  project.description.trim() != '';
  return hasCreator && hasName && hasCategory && hasDescription;
}

// Create new project
router.post('/create-project', (req, res, next) => {
  if (validProject(req.body)) {
    queries.createProject(req.body).then(project => {
      res.send(project[0]);
    })
  } else {
    next(new Error('Invalid Project Data'));
  }
})

router.get('/', (_, res) => {
  queries.getProjects().then(projects => {
    res.json(projects);
  })
})


module.exports = router;
