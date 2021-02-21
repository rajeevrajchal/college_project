const express = require('express');
const router = express.Router()

const ScheduleController = require("../controllers/ScheduleController");

router.post(
    '',
    ScheduleController.schedule
)
router.post(
    '/elo',
    ScheduleController.eloRating
)

module.exports = router
