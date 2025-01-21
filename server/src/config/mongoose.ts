import mongoose from 'mongoose';
import { config } from './config';

mongoose.connect(config.database.uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

export default db;
