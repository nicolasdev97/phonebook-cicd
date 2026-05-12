import axios from "axios";

const baseUrl = "/api/persons";

const get = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

export default { get, create, remove, update };
