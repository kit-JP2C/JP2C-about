"use client";

import { Activity, useEffect, useState } from "react";
import styles from "./status.module.css";
import classNames from "classnames";
import { apiFetch } from "@/lib/fetcher";

export interface ICurrentSocketStatus {
  clients: number;
}

export default function Status() {
  const [socketStatus, setSocketStatus] = useState<ICurrentSocketStatus | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const data = await apiFetch<ICurrentSocketStatus>("/api/socket-status");
        setSocketStatus(data);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        console.error("데이터 가져오기 실패:", e);
        setIsError(true);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={classNames(styles.bar, styles.amounts)}>
      <p>현재 접속자 수</p>
      {isError ? (
        <p className={styles.error}>
          에러가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      ) : isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <p>{socketStatus?.clients}</p>
      )}
    </div>
  );
}
