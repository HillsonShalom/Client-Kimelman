import { useState } from "react";
import { useAppSelector } from "../store/store";

const fetchVote = async (choice: string) => {
  try {
    const res = await fetch("http://localhost:8200/election/vote", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization")!,
      },
      body: JSON.stringify({ candidate: choice }),
    });

    if (res.status != 201) throw new Error("Voting failed!")
  } catch (err) {
    alert((err as Error).message)
  }
};

const Vote = () => {
  const candidates = useAppSelector((s) =>
    s.candidates.candidates.map((c) => c.name)
  );
  const [choice, setChoice] = useState(candidates[0]);

  return (
    <div>
      <select value={choice} onChange={(e) => setChoice(e.target.value)}>
        {candidates.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </select>
      <button onClick={() => fetchVote(choice)}>Vote</button>
    </div>
  );
};

export default Vote;
