import { useEffect, useState } from "react";
import "./App.css";
import PlayerBox from "./components/PlayerBox/PlayerBox";

function App() {
  const [go, setGo] = useState(false);
  const [count, setCount] = useState(3);
  const [pickRandom, setPickRandom] = useState(false);
  const [pickGroup, setPickGroup] = useState({ user: "", computer: "" });
  const [result, setResult] = useState("");
  const [reset, setReset] = useState(false);

  const handleGo = () => {
    if (pickGroup.user === "") {
      alert("Please choose first");
      return;
    }
    setGo(true);
    handleCount();
  };

  const handleCount = () => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setGo(false);
          setPickRandom(true);
          return 0;
        }
      });
    }, 1000);
  };

  const userIsPaper = (computer) => {
    if (computer === "Paper") setResult("Draw");
    if (computer === "Rock") setResult("Win");
    if (computer === "Scissors") setResult("Lose");
  };

  const userIsRock = (computer) => {
    if (computer === "Paper") setResult("Lose");
    if (computer === "Rock") setResult("Draw");
    if (computer === "Scissors") setResult("Win");
  };

  const userIsScissors = (computer) => {
    if (computer === "Paper") setResult("Win");
    if (computer === "Rock") setResult("Lose");
    if (computer === "Scissors") setResult("Draw");
  };

  const handleResult = (user, computer) => {
    if (user === "Paper") userIsPaper(computer);
    if (user === "Rock") userIsRock(computer);
    if (user === "Scissors") userIsScissors(computer);
  };

  const handleReset = (status) => {
    if (status) {
      setReset(true);
      setResult("");
      setCount(3);
      setPickGroup({ user: "", computer: "" });
      return;
    }
    setReset(false);
  };

  useEffect(() => {
    const { user, computer } = pickGroup;
    if (user !== "" && computer !== "") {
      handleResult(user, computer);
    }
  }, [pickGroup]);

  return (
    <div className="App">
      <h1 className="title">Rock, Paper , Scissors</h1>
      <div className="container">
        <div className="info">
          {!go && result === "" && <span onClick={handleGo}>GO!</span>}
          {go && <div className="count">{count}</div>}
          {result !== "" && (
            <div
              className={`count ${
                result === "Lose" ? "lose" : result === "Draw" ? "draw" : ""
              }`}
            >
              {result}
            </div>
          )}
        </div>
        <div className="pkArea">
          <PlayerBox
            type="Challenger"
            title="Challenger"
            color="#c65f0b"
            setPickGroup={setPickGroup}
            reset={reset}
            handleReset={handleReset}
          />
          <PlayerBox
            type="Computer"
            title="Computer"
            color="#002D71"
            pickRandom={pickRandom}
            setPickRandom={setPickRandom}
            setPickGroup={setPickGroup}
            reset={reset}
            handleReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
