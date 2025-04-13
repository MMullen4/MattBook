interface User {
  username: string;
  email: string;
  thoughts: string[];
  friends: string[];
}

const users = [
  {
    username: "admin",
    email: "admin@icloud.com",
    thoughts: "test",
    friends: "matt",
  },
  {
    username: "matt",
    email: "matt@icloud.com",
    thoughts: "test",
    friends: "admin",
  },
  {
    username: "test",
    email: "test@icloud.com",
    thoughts: "More testing needed",
    friends: "Joe",
  },
];

export default users;
