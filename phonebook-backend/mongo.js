const mongoose = require("mongoose");

// Conecttion to MongoDB

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nicolas_db_user:${password}@cluster0.nhphrws.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Schema and Model

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Get all persons

if (process.argv.length === 3) {
  console.log("phonebook:");

  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });

  return;
}

// Add a new person
const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name,
  number,
});

person.save().then(() => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});
