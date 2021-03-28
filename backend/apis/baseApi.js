// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
const express = require('express');
const knexfile = require('../knexfile')
import queries from '../db/baseApi-queries';
const router = express.Router();

// to view swagger: http://localhost:3000/api-docs/

/**
 * @swagger
 * /api/v1/dev-options:
 *   get:
 *     summary: Get all developer options
 *     description: Get all developer options for categories, roles and hiring options
 *     tags: [{ 'name': 'BaseApi'}]
 *     responses:
 *       200:
 *         description: An object with all of the options for developer accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  roles:
 *                    type: array
 *                    description: List of available developer roles.
 *                    example: ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager']
 *                  categories:
 *                    type: array
 *                    example: ['Website', 'Mobile App', 'Ecommerce', 'SAAS']
 *                  hiring_options:
 *                    type: array
 *                    example: ['Shares', 'Flat Rate']
 */
router.get('/dev-options', (_, res) => {
  const roles = ['Frontend', 'Backend', 'Graphic Designer', 'UX/UI', 'Devops', 'Project Manager'];
  const categories = ['Website', 'Mobile App', 'Ecommerce', 'SAAS'];
  const hiring_options = ['Shares', 'Flat Rate'];
  res.json({ roles, categories, hiring_options });
})

router.patch('/upload-profile-img/:id', async (req, res) => {
  const data  = req.body;
  const response = await queries.uploadProfileImg(req.params.id, data);
  if (response) {
    res.status(200).json(response);
  } else {
    console.log(`no user with id ${req.params.id}`)
    res.status(404);
    next(new Error('User Does Not Exist'))
  }
})


module.exports = router;
