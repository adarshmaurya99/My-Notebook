const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://adarsh:pfaXD12wQ97Z1OdE@cluster0.4blbd5h.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () => {

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    
}

module.exports = connectToMongo