const express = require('express');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();
const PORT = process.env.PORT || 3004;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://wafid:wafid@ouafid.aihn5iq.mongodb.net/RCW";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Appointment API running on port ${PORT}`);
});
