import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchCandidates } from "./store/slices/candSlice";
import Map from "./components/Map";
import Register from "./components/Register";
import Login from "./components/Login";
import { fetchUser } from "./store/slices/userSlice";
import Vote from "./components/Vote";



function App() {
  const candidates = useAppSelector((s) => s.candidates.candidates);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <div>
        <Vote/>
        <Register/>
        <Login/>
        <Map/>
        {candidates.map((c) => (
          <p>{JSON.stringify(c)}</p>
        ))}
      </div>
    </>
  );
}

export default App;
