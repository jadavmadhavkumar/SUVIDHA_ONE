"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api, API_BASE_URL } from "@/lib/api";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await api.health.check();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    retry: false,
    refetchInterval: 30000,
  });
}

export function useTtsLanguages() {
  return useQuery({
    queryKey: ["tts", "languages"],
    queryFn: async () => {
      const response = await api.tts.getLanguages();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    staleTime: Infinity,
  });
}

export function useTtsSynthesize() {
  return useMutation({
    mutationFn: async ({ text, language }: { text: string; language: string }) => {
      const response = await api.tts.synthesize(text, language);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
}

export function useBills(consumerNumbers?: string[]) {
  return useQuery({
    queryKey: ["bills", consumerNumbers],
    queryFn: async () => {
      const response = await api.bills.fetch(consumerNumbers);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: typeof window !== "undefined",
  });
}

export function useBill(billId: string) {
  return useQuery({
    queryKey: ["bill", billId],
    queryFn: async () => {
      const response = await api.bills.get(billId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!billId,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await api.services.list();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export { API_BASE_URL };
