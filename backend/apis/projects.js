// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
const express = require('express');
const router = express.Router();
const queries = require('../db/queries/project-queries');
const authChecker = require('./middelware/auth-checker');

function validProject(project) {
  const hasCreator = typeof project.creator_id == 'number' && project.creator_id.trim() != '';
  const hasName = typeof project.name == 'string' && project.name.trim() != '';
  const hasCategory = typeof project.category == 'string' &&  project.category.trim() != '';
  const hasDescription = typeof project.description == 'string' &&  project.description.trim() != '';
  const hasIsPublic = project.is_public != null
  const hasIsSeeking = project.is_seeking_allys != null
  const hasHiringOptions = project.hiring_options.length >= 1;
  const hasViewableRegions = project.viewable_regions.length >= 1;
  const hasFunding = project.funding_types.length >= 1;
  const hasIsFeatured = project.is_featured != null
  return hasCreator && hasName && hasCategory && hasDescription && hasIsPublic && hasIsSeeking && hasHiringOptions && hasViewableRegions && hasFunding && hasIsFeatured;
}

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

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
    res.status(200).json(projects);
  })
})

/**
 * @swagger
 * /api/v1/projects/:id:
 *   get:
 *     summary: Retrieve project by id
 *     description: Retrieve single project by id
 *     tags: [{ 'name': 'Projects'}]
 *     parameters:
 *       - name: id
 *         description: project id
 *         required: true
 *         in: params
 *         type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Project with matching id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
router.get('/:id', (req, res) => {
  queries.getProject(req.params.id).then(project => {
    res.status(200).json(project);
  })
})

/**
 * @swagger
 * /api/v1/projects/create:
 *   post:
 *     summary: Create new project
 *     description: Create a new project
 *     tags: [{ 'name': 'Projects'}]
 *     parameters:
 *       - name: project
 *         description: project data
 *         required: true
 *         in: body
 *         type: object
 *         example: { id: 3, creator_id: 7, team_member_ids: [118,0], name: Task Manager, category: Mobile App, description: Collaborate with team by assigning tasks to each member and tracking progress., hiring_options: ["Shares","Flat Rate"], viewable_regions: ["US","South America","Africa","Asia","Europe"], funding_types: ["Bootstrapped","Venture Capital","Friends & Family"], is_seeking_allys: false, is_public: true, is_featured: false }
 *       - name: token
 *         description: user auth token
 *         required: true
 *         in: headers
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdmV5Yml0c0BnbWFpbC5jb20iLCJ1c2VySWQiOjUsImlhdCI6MTYxODAxMDk3NCwiZXhwIjoxNjE4MDE0NTc0fQ.REKKslAtHUu4kF_kLgdjNKxFpBaQw2NyU7byjOefuYA
 *         responses:
 *          200:
 *           description: Project with matching id.
 *           content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
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
router.post('/', authChecker, (req, res, next) => {
  if (validProject(req.body.project)) {
    queries.createProject(req.body.project).then(project => {
      res.status(201).json({ project });
    })
  } else {
    next(new Error('Invalid Project Data'));
  }
})

/**
 * @swagger
 * /api/v1/projects/:id :
 *   put:
 *     summary: Update existing project
 *     description: Update existing project data
 *     tags: [{ 'name': 'Projects'}]
 *     parameters:
 *      - name: id
 *        description: project id
 *        required: true
 *        in: params
 *        type: integer
 *        example: 11
 *      - name: project
 *        description: project data
 *        required: true
 *        in: body
 *        type: object
 *        example: { team_member_ids: [118,12,110], hiring_options: ["Shares"] }
 *      - name: token
 *        description: user auth token
 *        required: true
 *        in: headers
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdmV5Yml0c0BnbWFpbC5jb20iLCJ1c2VySWQiOjUsImlhdCI6MTYxODAxMDk3NCwiZXhwIjoxNjE4MDE0NTc0fQ.REKKslAtHUu4kF_kLgdjNKxFpBaQw2NyU7byjOefuYA
 *     responses:
 *       200:
 *         description: Project with matching id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     description: The project ID.
 *                     example: 3
 *                   creator_id:
 *                     type: integer
 *                     example: 7
 *                   team_member_ids:
 *                     type: array
 *                     example: [118,12,110]
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
 *                     example: ['Shares']
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
router.post('/:id', authChecker, (req, res, next) => {
  queries.updateProject(req.params.id, req.body).then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404);
      next(new Error('Project Does Not Exist'))
    }
  })
})

/**
 * @swagger
 * /api/v1/projects/:id:
 *   delete:
 *     summary: Delete project record by id
 *     description: Delete a project
 *     tags: [{ 'name': 'Projects'}]
 *     parameters:
 *       - name: id
 *         description: project id
 *         required: true
 *         in: params
 *         type: integer
 *         example: 3
 *       - name: token
 *         description: user auth token
 *         required: true
 *         in: headers
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdmV5Yml0c0BnbWFpbC5jb20iLCJ1c2VySWQiOjUsImlhdCI6MTYxODAxMDk3NCwiZXhwIjoxNjE4MDE0NTc0fQ.REKKslAtHUu4kF_kLgdjNKxFpBaQw2NyU7byjOefuYA
 *     responses:
 *       200:
 *         description: Whether project was succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: boolean
 *                     example: true
*/
router.delete('/:id', authChecker, isValidId, (req, res) => {
  queries.deleteProject(req.params.id).then(() => {
    res.json({
      deleted: true
    })
  })
})


module.exports = router;
