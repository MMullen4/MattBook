import { Connection } from "mongoose";
import users from "./data"; // import user data
import connection from "../config/connection"; // import connection to the db
import { User, Thought } from "../models"; // import user & thought models

// Define interfaces for your data structures
interface IUser {
  username: string;
  email: string;
}

interface IUserSeed {
  userName: string;
  email: string;
}

// open connecttion to the database
connection.once("open", async (): Promise<void> => {
  console.log("connected");

  // Type the collection check
  const userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const userSeed: IUserSeed[] = [];

  // Assuming users is an array of IUser, loop thru the user data
  for (let i = 0; i < 5; i++) {
    const userName = users[i].username;
    const email = users[i].email;
    userSeed.push({ userName, email }); // push user data to userSeed array
  }

  // Insert the users into the database
  await User.collection.insertMany(userSeed);
  console.table(users);

  process.exit(0);
});
