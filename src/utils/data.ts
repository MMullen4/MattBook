interface User {
  username: string;
  email: string;
  thoughts: string;
  friends: string;
}

const users: User[] = [
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
  {
    username: "Joe",
    email: "Joe@icloud.com",
    thoughts: "I'm thinking",
    friends: "test",
  },
];

export default users;
