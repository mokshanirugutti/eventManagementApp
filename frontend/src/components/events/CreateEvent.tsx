import React from "react";
import { useNavigate } from "react-router";
import EventForm from "./EventForm";
import { createEvent } from "@/hooks/useEventForm";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (eventData: { title: string; description: string; date: string }) => {
    await createEvent(eventData);
    navigate("/events");
  };

  return <EventForm onSubmit={handleCreateEvent} />;
};

export default CreateEvent;
