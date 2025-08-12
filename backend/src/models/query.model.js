import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
const querySchema = new Schema(
  {
    username: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [20],
      required: [true, "please provide the username"],
    },
    email: {
      type: String,
      trim: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    query: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [2000],
      required: [true, "please provide the query"],
    },
    queryStatus: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
      required: [true, "please provide the query status"],
    },
  },
  {
    timestamps: true,
  }
);
const Query = models.Query || model("Query", querySchema);

export default Query;
