import { useState } from "react";
import "./NewEventForm.css";

export default function NewEventForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleReset = () => {
    setTitle("");
    setDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      title: title,
      date: date,
      id: Math.floor(Math.random() * 10000),
    };
    console.log(event);
    handleReset();
  };

  return (
    <form className="new-event-form" onSubmit={handleSubmit}>
      <label>
        <span>Event Title:</span>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
      </label>
      <label>
        <span>Event Date:</span>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        ></input>
      </label>
      <button>Submit</button>
    </form>
  );
}
