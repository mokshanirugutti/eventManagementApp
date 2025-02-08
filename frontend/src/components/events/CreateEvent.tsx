import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';

const CreateEvent: React.FC = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');
    // State to hold form data
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error and success messages
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any authentication token if required
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    date
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const data = await response.json();
            console.log(data)
            setSuccess('Event created successfully!');


            // Optionally reset form fields
            setTitle('');
            setDescription('');
            setDate('');
            navigate('/events');
        } catch (error) {
            if (error instanceof Error) {
                setError(`Error: ${error.message}`);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-background shadow-lg rounded-xl py-10">
  <h2 className="text-2xl font-semibold text-center mb-4">Create Event</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Title */}
    <div>
      <label htmlFor="title" className="block text-sm font-medium">
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 mt-1 border rounded-md bg-transparent focus:ring-2 focus:ring-primary"
      />
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium">
        Description:
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-3 py-2 mt-1 border rounded-md bg-transparent focus:ring-2 focus:ring-primary"
      />
    </div>

    {/* Date */}
    <div>
      <label htmlFor="date" className="block text-sm font-medium">
        Date:
      </label>
      <input
        type="datetime-local"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full px-3 py-2 mt-1 border rounded-md bg-transparent focus:ring-2 focus:ring-primary"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-2 mt-4 font-semibold text-white rounded-md bg-primary hover:bg-primary-dark transition-all"
    >
      Create Event
    </button>
  </form>

  {/* Error & Success Messages */}
  {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
  {success && <p className="mt-3 text-green-500 text-sm">{success}</p>}
</div>

    );
};

export default CreateEvent;