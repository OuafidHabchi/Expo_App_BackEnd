const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

// Routes pour gérer les rendez-vous
router.post('/create', appointmentController.createAppointment);
router.get('/get', appointmentController.getAppointments);
router.get('/getAll', appointmentController.getAllAppointments);
router.post('/update', appointmentController.UpdateAppointments);
router.post('/delete', appointmentController.deleteAppointment);

module.exports = router;
