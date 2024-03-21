import mongoose from 'mongoose';

const uri = "mongodb+srv://tosiek22:okrutnik22@cluster0.parqk0n.mongodb.net/UserData?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

export default db;
