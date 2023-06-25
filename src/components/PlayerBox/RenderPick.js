import styles from "./PlayerBox.module.css";

const RenderPick = ({ item }) => {
  return (
    <div className={styles.imgBlock}>
      <h2>{item.title}</h2>
      <img src={item.src} alt={item.title} />
    </div>
  );
};

export default RenderPick;
