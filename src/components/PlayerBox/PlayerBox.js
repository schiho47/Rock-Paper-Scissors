import { useEffect, useState } from "react";
import styles from "./PlayerBox.module.css";
import RenderPick from "./RenderPick";

const PlayerBox = ({
  type,
  title,
  color,
  pickRandom,
  setPickRandom,
  setPickGroup,
  reset,
  handleReset,
}) => {
  const choice = [
    { title: "Paper", src: "./assets/paper.png" },
    { title: "Rock", src: "./assets/rock.png" },
    { title: "Scissors", src: "./assets/scissors.png" },
  ];

  const [pick, setPick] = useState({});
  const [computerPick, setComputerPick] = useState({});

  const handlePick = (target) => {
    setPick(target);
    setPickGroup((prev) => ({ ...prev, user: target.title }));
  };

  const handleRandomPick = () => {
    const random = Math.floor(Math.random() * 3);
    const target = choice.filter((item, index) => index === random);
    setComputerPick(target[0]);
    setPickGroup((prev) => ({ ...prev, computer: target[0].title }));
    setPickRandom(false);
    handleReset(false);
  };

  useEffect(() => {
    if (type === "Computer" && pickRandom) {
      handleRandomPick();
    }
  }, [pickRandom]);

  useEffect(() => {
    if (reset) {
      setPick({});
      setComputerPick({});
    }
  }, [reset]);

  return (
    <div className={styles.playerBox} style={{ backgroundColor: `${color}` }}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.choices}>
        {Object.keys(pick).length === 0 &&
          Object.keys(computerPick).length === 0 &&
          choice.map((item) => {
            return (
              <div
                key={item.title}
                className={`${styles.imgBlock} ${styles.imgBlockHover} ${
                  type === "Challenger" ? styles.userImgBlockHover : null
                }`}
                onClick={
                  type === "Challenger"
                    ? () => handlePick({ title: item.title, src: item.src })
                    : () => null
                }
              >
                <h2>{item.title}</h2>
                <img src={item.src} alt={item.title} />
              </div>
            );
          })}
        {Object.keys(pick).length !== 0 && type === "Challenger" && (
          <div>
            <RenderPick item={pick} />
            <div className={styles.reset} onClick={() => handleReset(true)}>
              Reset
            </div>
          </div>
        )}

        {Object.keys(computerPick).length !== 0 && type === "Computer" && (
          <RenderPick item={computerPick} />
        )}
      </div>
    </div>
  );
};

export default PlayerBox;
