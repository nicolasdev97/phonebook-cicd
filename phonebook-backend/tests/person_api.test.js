const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("Phonebook API", () => {
    test("persons are returned as json", async () => {
        await api
            .get("/api/persons")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});