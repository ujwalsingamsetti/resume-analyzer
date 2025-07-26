const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/resumes', resumeRoutes);

const PORT = 5050; // Changed from 5000 to 5050 to avoid AirTunes conflict
console.log('running');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});