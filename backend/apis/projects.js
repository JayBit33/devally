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

/**
 * @swagger
 * /api/v1/projects/:
 *   get:
 *     summary: Retrieve all projects
 *     description: Retrieve a list of projects
 *     tags: [{ 'name': 'Projects'}]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The project ID.
 *                     example: 3
 *                   creator_id:
 *                     type: integer
 *                     example: 7
 *                   team_member_ids:
 *                     type: array
 *                     example: [11,8,0]
 *                   name:
 *                     type: string
 *                     example: 'Task Manager'
 *                   category:
 *                     type: string
 *                     example: 'Mobile App'
 *                   description:
 *                     type: string
 *                     example: 'Collaborate with team by assigning tasks to each member and tracking progress.'
 *                   hiring_options:
 *                     type: array
 *                     example: ['Shares', 'Flat Rate']
 *                   viewable_regions:
 *                     type: array
 *                     example: ['US','South America','Africa','Asia','Europe']
 *                   funding_types:
 *                     type: array
 *                     example: ['Bootstrapped', 'Venture Capital', 'Friends & Family']
 *                   is_seeking_allys:
 *                     type: boolean
 *                     example: false
 *                   is_public:
 *                     type: boolean
 *                     example: true
 *                   is_featured:
 *                     type: boolean
 *                     example: false
*/
router.get('/', (_, res) => {
  queries.getProjects().then(projects => {
    res.json(projects);
  })
})


module.exports = router;
