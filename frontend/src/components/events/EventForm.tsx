import React, { useState, FormEvent } from "react";

interface EventFormProps {
  initialValues?: {
    title: string;
    description: string;
    date: string;
  };
  onSubmit: (data: { title: string; description: string; date: string }) => void;
  isEditing?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, isEditing }) => {
  // if(initialValues){
  //   console.log('initial values')
  //   console.log(initialValues)
  // }
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [date, setDate] = useState(initialValues?.date || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await onSubmit({ title, description, date });
      setSuccess(isEditing ? "Event updated successfully!" : "Event created successfully!");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-background shadow-lg rounded-xl py-10">
      <h2 className="text-2xl font-semibold text-center mb-4">{isEditing ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md bg-transparent focus:ring-2 focus:ring-primary" />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md bg-transparent focus:ring-2 focus:ring-primary" />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium">Date:</label>
          <input type="datetime-local" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md  focus:ring-2 focus:ring-foreground" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 mt-4 font-semibold rounded-md bg-foreground text-background transition-all">
          {isEditing ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* Error & Success Messages */}
      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
      {success && <p className="mt-3 text-green-500 text-sm">{success}</p>}
    </div>
  );
};

export default EventForm;
