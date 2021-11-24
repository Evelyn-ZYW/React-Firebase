// import useFetch from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import { useState, useEffect } from "react";
import "./Home.css";

import RecipeList from "../../components/RecipeList";
export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load :(");
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
