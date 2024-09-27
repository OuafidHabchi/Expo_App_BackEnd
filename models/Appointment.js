const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    idDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    jour :Date,
    heure: Date,
    sujet: String ,
    Status :String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
