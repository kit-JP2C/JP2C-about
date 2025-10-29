import { BASE_URL } from "@/common/server";

export async function apiFetch<T>(path: string, options?: RequestInit) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }
  return res.json() as Promise<T>;
}
