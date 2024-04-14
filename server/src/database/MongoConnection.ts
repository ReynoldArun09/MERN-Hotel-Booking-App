import mongoose, { MongooseError } from 'mongoose';
import AppLogger from '../utils/AppLogger';



const MONGO_URL = process.env.MONGO_URI as string

async function MongoConnection() {
  await mongoose
    .connect(MONGO_URL)
    .then((success) => {
      AppLogger.info(`[Mongo]: Mongo Connected ${success.connection.host}`);
    })
    .catch((error: MongooseError) => {
        AppLogger.warn(`[Mongo]: Mongo connection failed ${error.message}`);
    });
}

export default MongoConnection;
