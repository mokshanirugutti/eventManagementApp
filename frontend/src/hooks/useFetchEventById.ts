import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEventById = (eventId: string | undefined) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { event, loading, error };
};

export default useFetchEventById;
