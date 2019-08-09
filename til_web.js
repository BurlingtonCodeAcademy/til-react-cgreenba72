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

app.post("/facts/:objectId", editFact);

app.post("/facts", addFact);

app.post("/deletefact/:objectId", deleteFact)

async function getOne(request, response) {
  //console.log("Hit")
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
  let result = await store.edit(request.body.text.trim(), id);
  console.log(result)
  response.redirect(`/fact/${id}`)
}


async function addFact(request, response) {
  let result = await store.addFact(request.body.text.trim());
  let output = {
    status: "ok",
    id: result.id
  };
  response.type("application/json").send(JSON.stringify(output));
}

async function deleteFact(request, response){
  console.log("top of delete fact")
  let id = request.params.objectId
  let result = await store.delete(id)
  console.log(result)
  let output = {
    status: "200",
  };
  //response.type("application/json").send(JSON.stringify(output));
  response.redirect("/")
}

app.listen(port, () => console.log(`TIL web app listening on port ${port}!`));
