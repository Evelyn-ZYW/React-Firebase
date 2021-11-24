import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import RecipeList from "../../components/RecipeList";

import "./Search.css";

export default function Search() {
  const queryString = useLocation().search;

  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  // const url = `http://localhost:3000/recipes?q=${query}`;

  // const { error, isPending, data } = useFetch(url);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    projectFirestore
      .collection("recipes")
      .where("title", ">=", query.toLowerCase())
      .where("title", "<=", query.toLowerCase() + "~")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No recipes found.");
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
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
