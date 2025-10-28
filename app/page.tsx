import classNames from "classnames";
import styles from "./page.module.css";
import Status from "@/components/status/status";

export default function Home() {
  return (
    <div>
      <h1 className={classNames(styles.title, styles.gradient)}>JP2C</h1>
      <h2 className={classNames(styles.gradient, styles.body)}>
        웹소켓 기반 리치마작 점수 계산기
      </h2>
      <Status></Status>
    </div>
  );
}
