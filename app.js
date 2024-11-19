const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const dUrl = process.env.MONGODB_URL;

mongoose.connect(dUrl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});



const userRoutes = require('./routes/user-routes');


// Use the routes
app.use('/api/users', userRoutes);