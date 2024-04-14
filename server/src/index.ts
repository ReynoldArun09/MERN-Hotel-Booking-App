import { app } from "./app";
import 'dotenv/config'
import AppLogger from "./utils/AppLogger";

const port = process.env.PORT


app.listen(port, () => {
  AppLogger.info(`Server started on port ${port}`);
}); 