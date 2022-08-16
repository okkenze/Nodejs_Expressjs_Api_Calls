require("dotenv").config();
const https = require("https");
const http = require("http");

const getPosts = (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  https
    .get(process.env.External_URL, options, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        // console.log(JSON.parse(data));
        res.status(200).json(JSON.parse(data));

        //console.log(JSON.stringify(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

const getPostsById = (req, res) => {
  const { id } = req.params;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  https
    .get(process.env.External_URL + "/" + id, options, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        // console.log(JSON.parse(data));
        if (Object.keys(JSON.parse(data)).length === 0) {
          return res.status(404).json({ response: "Record not found" });
        }

        return res.status(200).json(JSON.parse(data));

        //console.log(JSON.stringify(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

const postData = (req, res) => {
  const data = JSON.stringify(req.body);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const postReq = https
    .request(process.env.External_URL, options, (resp) => {
      let data = "";

      //console.log('Status Code:', res.statusCode);

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        //console.log('Body: ', JSON.parse(data));
        return res.status(201).json(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
  postReq.write(data);
  postReq.end();
};

module.exports = { getPosts, getPostsById, postData };
