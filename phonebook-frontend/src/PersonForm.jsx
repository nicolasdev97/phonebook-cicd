const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
