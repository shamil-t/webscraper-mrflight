const puppeteer = require("puppeteer");
const express = require("express");
const PORT = 3000;
const app = express();

/* JSON body parse*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/getdata", (req, res) => {
  console.log(req.query.s);
  var query = req.query.s;

  puppeteer
  .launch()
  .then(async (browser) => {
    //opening a new page and navigating to Reddit
    const page = await browser.newPage();
    await page.goto(query);
    await page.waitForSelector("body");

    //manipulating the page's content
    let grabPosts = await page.evaluate(() => {
      table = document.body.querySelectorAll(".flightsTable");

      var lists = [];

      var element = table[0];
      console.log(element.getElementsByTagName("tr").length);

      var trL = element.getElementsByTagName("tr").length;

      for (var i = 1; i < trL; i++) {
        var elementTd = element.getElementsByTagName("tr")[i];
        var tdL = elementTd.querySelectorAll("td");

        console.log(tdL.length);

        var flightNum = tdL[0].querySelector("a");
        console.log(flightNum.innerHTML);
        var FromA = tdL[1].querySelector("a");
        console.log(FromA.textContent.trim());
        var Airline = tdL[2].querySelector("a").textContent.trim();
        console.log(Airline);
        var schedule = tdL[3].textContent;
        console.log(schedule.trim());
        var Arrival = tdL[4].textContent;
        console.log(Arrival.trim());
        var status = tdL[5].textContent;
        console.log(status.trim());

        lists.push({
          FlightNum: flightNum.innerHTML,
          From: FromA.textContent.trim(),
          Aname: Airline,
          Schedule: schedule.trim(),
          Arrival: Arrival.trim(),
          Status: status.trim(),
        });
      }

      var element = table[1];
      console.log(element.getElementsByTagName("tr").length);

      var trL = element.getElementsByTagName("tr").length;

      var listss = [];

      for (var i = 1; i < trL; i++) {
        var elementTd = element.getElementsByTagName("tr")[i];
        var tdL = elementTd.querySelectorAll("td");

        console.log(tdL.length);

        var flightNum = tdL[0].querySelector("a");
        console.log(flightNum.innerHTML);
        var FromA = tdL[1].querySelector("a");
        console.log(FromA.textContent.trim());
        var Airline = tdL[2].querySelector("a").textContent.trim();
        console.log(Airline);
        var schedule = tdL[3].textContent;
        console.log(schedule.trim());
        var Arrival = tdL[4].textContent;
        console.log(Arrival.trim());
        var status = tdL[5].textContent;
        console.log(status.trim());

        listss.push({
          FlightNum: flightNum.innerHTML,
          From: FromA.textContent.trim(),
          Aname: Airline,
          Schedule: schedule.trim(),
          Arrival: Arrival.trim(),
          Status: status.trim(),
        });
      }

      let list = {
        Arrivals: lists,
        Departure: listss,
      };

      status = list;
      return list;
    });
    //outputting the scraped data
  res.send(grabPosts)
    console.log(grabPosts);
    //console.log(posts)
    //closing the browser
    await browser.close();
  })
  //handling any errors
  .catch(function (err) {
    console.error(err);
  });

});

//initiating Puppeteer

app.listen(PORT, () => {
  console.info("Server is running on PORT:", PORT);
});
module.exports = app;
