import { connect, Connection } from "mongoose";

// Connect to the local MongoDB database called postsTags
const dbConnection: Connection = connect(
  "mongodb://127.0.0.1:27017/postsTags"
).connection;

export default dbConnection;
