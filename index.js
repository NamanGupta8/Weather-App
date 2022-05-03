import { createServer } from "http";
import { readFileSync } from "fs";

const homeFile = readFileSync("home.html", "utf-8");

const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/home") {
  }
});

server.listen(8000);
