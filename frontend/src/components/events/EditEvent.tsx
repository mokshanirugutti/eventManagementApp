import React from "react";
import { useParams } from "react-router";
import EventForm from "./EventForm";
import useFetchEventById from "@/hooks/useFetchEventById";
import { updateEvent } from "@/hooks/useEventForm";

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useFetchEventById(id);

  const handleUpdateEvent = async (eventData: { title: string; description: string; date: string }) => {
    if (!id) return;
    await updateEvent(id, eventData);
  };
//   console.log('event data')
//   console.log(event)
  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return <EventForm initialValues={event} onSubmit={handleUpdateEvent} isEditing />;
};

export default EditEvent;
