import { Schema, model } from "mongoose";
import { UserModelType } from "../../types.def";

const userSchema = new Schema<UserModelType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export default model<UserModelType>("User", userSchema);
