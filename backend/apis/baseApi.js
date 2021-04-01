// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
const express = require('express');
const knexfile = require('../knexfile')
import queries from '../db/baseApi-queries';
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});

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

router.patch('/upload-profile-img/:id', upload.single('profile_image'), async (req, res) => {
  console.log(req.file)
  queries.uploadProfileImg(req.params.id, req.file.path).then(user => {
    res.json(user)
    res.send(200)
  }).catch(error => {
    console.log(error)
    res.send(500)
  })
})


module.exports = router;
