"use client";

import styles from "./status.module.css";
import classNames from "classnames";
import { apiFetch } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export interface ICurrentSocketStatus {
  clients: number;
}

export default function Status() {
  const {
    data: socketStatus,
    isLoading,
    isError,
  } = useQuery<ICurrentSocketStatus>({
    queryKey: ["socketStatus"],
    queryFn: async () =>
      await apiFetch<ICurrentSocketStatus>("/api/socket-status"),
    refetchInterval: 5000,
    staleTime: 4000,
    retry: false,
  });

  return (
    <div className={classNames(styles.bar, styles.amounts)}>
      <p>현재 접속자 수</p>
      {isError ? (
        <>
          <p className={styles.error}>
            에러가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        </>
      ) : isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <p>{socketStatus?.clients}</p>
      )}
    </div>
  );
}
