const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Request failed",
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export const api = {
  health: {
    check: () => fetchApi<{ status: string; service: string }>("/health"),
  },

  tts: {
    getLanguages: () =>
      fetchApi<Array<{ code: string; name: string }>>("/api/tts/languages"),

    synthesize: (text: string, language: string = "hi-IN") =>
      fetchApi<{ audio_url: string; duration: number }>("/api/tts/synthesize", {
        method: "POST",
        body: JSON.stringify({ text, language }),
      }),
  },

  bills: {
    fetch: (consumerNumbers?: string[]) =>
      fetchApi<BillsResponse>("/api/bills/fetch", {
        method: "POST",
        body: JSON.stringify({ consumer_numbers: consumerNumbers }),
      }),

    get: (billId: string) =>
      fetchApi<Bill>("/api/bills/" + billId),
  },

  services: {
    list: () => fetchApi<Service[]>("/api/services"),
  },
};

interface BillsResponse {
  bills: Bill[];
  total_amount: number;
}

interface Bill {
  id: string;
  provider: string;
  consumer_number: string;
  amount: number;
  due_date: string;
  period: string;
  status: "pending" | "paid" | "overdue";
  utility_type: "electricity" | "water" | "gas";
}

interface Service {
  id: string;
  name: string;
  name_hindi: string;
  icon: string;
  color: string;
  has_pending: boolean;
  pending_amount?: number;
}

export { API_BASE_URL };
export type { Bill, Service };
