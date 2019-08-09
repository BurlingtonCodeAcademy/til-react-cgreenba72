/*
  Today I Learned webapp
*/
const assert = require("assert");
const FactStore = require("./lib/factStore");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("static")); // static file server
app.use(express.urlencoded({ extended: true })); // all POST bodies are expected to be URL-encoded

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";
const store = new FactStore(dbUrl);

app.get("/facts", getAll);

app.get("/facts/:objectId", getOne);

app.post("/facts/:objectId", editFact)

async function getOne(request, response) {
  console.log("Hit")
  let cursor = await store.one(request.params.objectId);
  let output = [];
  cursor.forEach(
    entry => {
      output.push(entry);
    },
    function(err) {
      assert.equal(null, err);
      console.log("Sending " + output.length + " records to client");
      response.type("application/json").send(JSON.stringify(output));
    }
  );
}

async function getAll(request, response) {
  let cursor = await store.all();
  let output = [];
  cursor.forEach(
    entry => {
      output.push(entry);
    },
    function(err) {
      assert.equal(null, err);
      console.log("Sending " + output.length + " records to client");
      response.type("application/json").send(JSON.stringify(output));
    }
  );
}

async function editFact(request,response){
  let id = request.params.objectId
  let result = await store.edit(request.body.text.trim(),id);
  console.log(result)
  response.redirect(`/fact/${id}`)
}

app.post("/facts", addFact);

async function addFact(request, response) {
  let result = await store.addFact(request.body.text.trim());
  let output = {
    status: "ok",
    id: result.id
  };
  response.type("application/json").send(JSON.stringify(output));
}

app.listen(port, () => console.log(`TIL web app listening on port ${port}!`));
