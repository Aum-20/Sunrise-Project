const { Router } = require('express'); // Router class
const { getContactUs,contactUs } = require('../controllers/workInProgress.controllers');

const router = Router();

// routes declaration
router.route('/').get(getContactUs).post(contactUs);   



module.exports = router; // Export router