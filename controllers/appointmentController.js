const { log } = require('console');
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        // Récupérer le clientID depuis les paramètres de requête
        const clientID = req.query.clientID;
        const Role = req.query.Role;
        
        // Vérifier si clientID est fourni
        if (!clientID) {
            return res.status(400).json({ message: 'clientID is required' });
        }
        // Rechercher les rendez-vous avec le clientID spécifié
        if (Role!=="Docter") {
            
            const appointments = await Appointment.find({ idClient: clientID });       
            res.status(200).json(appointments);
        }
        if (Role==="Docter") {
            
            const appointments = await Appointment.find({ idDoctor: clientID });
            res.status(200).json(appointments);
        }
        

        // Retourner les rendez-vous trouvés
        // res.status(200).json(appointments);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

exports.UpdateAppointments = async (req, res) => {
    const { appointmentId } = req.body; // Assurez-vous que l'ID est correctement extrait du corps de la requête
    console.log(appointmentId);

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId, // Utilisez le champ approprié ici
            { Status: 'Confirmed' },
            { new: true } // Renvoie le document mis à jour
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment status:', error); // Ajoutez un log pour plus de détails
        res.status(500).json({ message: 'Error updating appointment status', error });
    }
}

exports.deleteAppointment = async (req, res) => {
    const { appointmentId } = req.body; // Récupère l'ID depuis les paramètres de la requête
    console.log(appointmentId);
    

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully', deletedAppointment });
    } catch (error) {
        console.error('Error deleting appointment:', error); // Ajoutez un log pour plus de détails
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
};
exports.getAllAppointments = async (req, res) => {
    try {
        // Récupérer tous les rendez-vous
        const appointments = await Appointment.find({});
        
        // Vérifier si des rendez-vous ont été trouvés
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        // Retourner les rendez-vous trouvés
        res.status(200).json(appointments);
    } catch (error) {
        // Gérer les erreurs
        console.error('Error fetching all appointments:', error); // Ajoutez un log pour plus de détails
        res.status(500).json({ message: 'Error fetching all appointments', error });
    }
};

