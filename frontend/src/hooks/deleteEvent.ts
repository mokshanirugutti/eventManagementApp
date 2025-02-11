import axios from "axios";

interface deleteEventProps{
    id:string;
    token:string;
}
export default async function deleteEvent({id,token}:deleteEventProps) {
    const URL = import.meta.env.VITE_BACKEND_URL
    try {
        const data =await axios.delete(`${URL}/events/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}