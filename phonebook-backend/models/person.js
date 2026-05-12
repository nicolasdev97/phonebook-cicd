const mongoose = require("mongoose");

const phoneValidator = (value) => {
  // Min length 8 characters
  if (value.length < 8) {
    return false;
  }

  // Format XX-XXXXXXX or XXX-XXXXXXX
  const regex = /^\d{2,3}-\d+$/;

  return regex.test(value);
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message:
        "Phone number must be at least 8 characters and in format XX-XXXXXXX or XXX-XXXXXXX",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
