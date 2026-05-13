const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
  searchRegistrations,
} = require('../controllers/registrationController');

// All routes are protected
router.use(authMiddleware);

router.get('/search', searchRegistrations);
router.route('/').get(getRegistrations).post(createRegistration);
router.route('/:id').get(getRegistration).put(updateRegistration).delete(deleteRegistration);

module.exports = router;
