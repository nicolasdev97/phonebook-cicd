const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
