import axios from 'axios'

// base URL for backend server storing persons JSON
const baseUrl = '/api/persons'

// get initial list of people from server
const getAllPeople = () => {
    return axios.get(baseUrl)
}

// add new person to server w/ POST request
const addPerson = (person) => {
    return axios
        .post(baseUrl, person)
        // return full person object
        .then(response => response.data);
}

// delete person from server w/ DELETE request
const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(`Deleted ${response.data.name} from server`)
        })
}

export default { getAllPeople, addPerson, deletePerson }