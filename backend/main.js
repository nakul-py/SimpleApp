import express from "express";

const app = express();
// app.get('/', (req, res) => {
// res.send('Hello, World!');
// }
// );

app.get("/api/sports", (req, res) => {
  const sports = [
    {
      id: 1,
      name: "Football",
      players: 11,
      description:
        "A team sport played with a spherical ball between two teams of 11 players.",
    },
    {
      id: 2,
      name: "Basketball",
      players: 5,
      description:
        "A team sport in which two teams, usually of five players each, oppose one another on a rectangular court.",
    },
    {
      id: 3,
      name: "Tennis",
      players: 1,
      description:
        "A racket sport that can be played individually against a single opponent or between two teams of two players each.",
    },
    {
      id: 4,
      name: "Cricket",
      players: 11,
      description:
        "A bat-and-ball game played between two teams of eleven players on a field at the center of which is a 22-yard pitch with a wicket at each end.",
    },
    {
      id: 5,
      name: "Baseball",
      players: 9,
      description:
        "A bat-and-ball game played between two opposing teams who take turns batting and fielding.",
    },
  ];
  res.send(sports);
});
const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `❌ Port ${PORT} is already in use. Please use a different port.`
      );
      process.exit(1);
    } else {
      console.error("❌ Server error:", err);
      process.exit(1);
    }
  });

// lsof -i :3000
