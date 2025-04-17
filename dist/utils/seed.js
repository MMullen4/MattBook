// import { Connection } from "mongoose";
import mongoose from "mongoose";
import users from "./data.js"; // import user data
// import connection from "../src/config/connection.js"; // import connection to the db
import { User } from "../models/index.js"; // import user & thought models
const connection = mongoose.connection;
connection.on("error", (err) => err);
// open connecttion to the database
connection.once("open", async () => {
    console.log("connected");
    // Type the collection check
    const userCheck = await connection.db?.listCollections({ name: "users" }).toArray();
    if (userCheck && userCheck.length) {
        await connection.dropCollection("users");
    }
    const userSeed = [];
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
