import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

export interface EventData {
  title: string;
  description: string;
  date: string;
}

export async function createEvent(eventData: EventData) {
  try {
    const response = await axios.post(`${URL}/events`, eventData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

export async function updateEvent(eventId: string, eventData: EventData) {
  try {
    const response = await axios.put(`${URL}/events/${eventId}`, eventData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}
