import { useState } from "react";
import "./TripList.css";
import useFetch from "../hooks/useFetch";

export default function TripList() {
  //   const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const { data: trips, isPending } = useFetch(url);

  //   const fetchTrips = useCallback(async () => {
  //     const res = await fetch(url);
  //     const json = await res.json();
  //     setTrips(json);
  //   }, [url]);

  //   useEffect(() => {
  //     fetchTrips();
  //   }, [fetchTrips]);

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {isPending && <div>Loading trips...</div>}
      <ul>
        {trips && trips.map((trip) => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}>
        European Trips
      </button>
      <button onClick={() => setUrl("http://localhost:3000/trips")}>
        All Trips
      </button>
    </div>
  );
}
