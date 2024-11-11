import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchCandidates } from "./store/slices/candSlice";

function App() {
  const candidates = useAppSelector((s) => s.candidates.candidates);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  return (
    <>
      <div>
        {candidates.map((c) => (
          <p>{JSON.stringify(c)}</p>
        ))}
      </div>
    </>
  );
}

export default App;
