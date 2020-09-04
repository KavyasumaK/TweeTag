const express = require('express');

const permissionController = require('../Controller/permissionController');
const tagController = require('../Controller/tagController');

const router = express.Router();

router.get('/gettags',tagController.getTags);
router.get('/:category',tagController.getTags)
//TBD: add permissionController method to allow only signed in users to add data.
router.post('/addtag',permissionController.protect, tagController.insertTag);
router.patch('/:id',permissionController.protect,permissionController.matchIds,tagController.updateTag);
router.delete('/:id',permissionController.protect,permissionController.matchIds,tagController.deleteTag);

module.exports = router;