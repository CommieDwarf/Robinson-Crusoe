import mongoose from 'mongoose';
import { config } from './config';




async function connectToDb() {
    try {
        await mongoose.connect(config.database.uri);
    } catch {
        connectToDb();
    }
}

connectToDb();


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

export default db;
