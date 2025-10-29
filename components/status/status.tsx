"use client";

import { useEffect, useState } from "react";
import styles from "./status.module.css";
import { apiFetch } from "@/lib/fetcher";

interface ICurrentSocketStatus {
  clients: number;
}

export default function Status() {
  const [socketStatus, setSocketStatus] = useState<ICurrentSocketStatus | null>(
    null
  );

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const json = await apiFetch<ICurrentSocketStatus>("/v1/socket-status");
        setSocketStatus(json.data);
      } catch (e) {
        console.error("데이터 가져오기 실패:", e);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.bar}>
      <div className={styles.amounts}>
        <p>현재 접속자 수</p>
        <p>{socketStatus?.clients}</p>
      </div>
    </div>
  );
}
