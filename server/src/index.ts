import { app } from "./app";
import 'dotenv/config'
import AppLogger from "./utils/AppLogger";
import MongoConnection from "./database/MongoConnection";

const port = process.env.PORT

MongoConnection()
app.listen(port, () => {
  AppLogger.info(`Server started on port ${port}`);
}); 