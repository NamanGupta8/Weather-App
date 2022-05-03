import { createServer } from "http";
import { readFileSync } from "fs";
import requests from "requests";

const homeFile = readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);

  return temperature;
};

const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/home") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=Jammu&appid=18acb6bc86e02add0947bc654216ff17&units=metric"
    )
      .on("data", function (chunk) {
        const obj_data = JSON.parse(chunk);
        const arr_data = [obj_data];
        // console.log(arr_data[0].main.temp);
        const realTime_data = arr_data
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTime_data);
      })
      .on("end", function (err) {
        if (err) return console.log("connection closed due to errors", err);
        console.log("end");
        res.end();
      });
  } else {
    res.end("File Not found");
  }
});

server.listen(8000);
