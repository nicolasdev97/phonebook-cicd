const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

require("dotenv").config();
const mongoose = require("mongoose");

// Connection to MongoDB

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

// Importing Person model

const Person = require("./models/person");

morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// API routes

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((persons) => {
            response.json(persons);
        })
        .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
    Person.countDocuments({})
        .then((count) => {
            const date = new Date();

            response.send(
                `<p>Phonebook has info for ${count} people</p>
         <p>${date}</p>`,
            );
        })
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).json({ error: "person not found" });
            }
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result) {
                response.status(204).end();
            } else {
                response.status(404).json({ error: "person not found" });
            }
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body;

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        {
            new: true,
            runValidators: true,
            context: "query",
        },
    )
        .then((updatedPerson) => {
            if (updatedPerson) {
                response.json(updatedPerson);
            } else {
                response.status(404).json({ error: "person not found" });
            }
        })
        .catch((error) => next(error));
});

app.get("/health", (req, res) => {
    res.send("ok");
});

// Frontend integration

app.use(express.static("dist"));

app.use((request, response) => {
    response.sendFile(__dirname + "/dist/index.html");
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).json({ error: "malformatted id" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message,
        });
    }

    next(error);
};

app.use(errorHandler);

module.exports = app;