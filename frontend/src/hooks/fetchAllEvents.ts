import axios from "axios";

export default async function fetchAllEvents() {
    const URL = import.meta.env.VITE_BACKEND_URL
    try {
        const data =await axios.get(`${URL}/events`)

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}