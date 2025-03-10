import axios from 'axios'

// base URL for JSON server
const baseUrl = 'http://localhost:3001/persons'

// get initial list of people from server
const getAllPeople = () => {
    return axios.get(baseUrl)
}

// add new person to server w/ POST request
const addPerson = (person) => {
    return axios
        .post(baseUrl, person)
        .then(response => {
            console.log(`Sent ${response.data.name} to server`)
        })
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