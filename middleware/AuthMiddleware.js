const jwt = require('jsonwebtoken');
const Client = require('../../client-api/models/Client'); // Assurez-vous que le chemin est correct
const Doctor = require('../../doctor-api/models/Doctor'); // Assurez-vous que le chemin est correct

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed, token missing' });
        }
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        
        let user;
        if (decoded.type === 'client') {
            user = await Client.findById(decoded.id);
        } else if (decoded.type === 'doctor') {
            user = await Doctor.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed, user not found' });
        }

        req.user = user; // Attach the user object to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;
