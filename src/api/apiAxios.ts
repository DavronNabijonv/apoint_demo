const BASE_URL = "http://apialfa.apoint.uz/v1";

export const request = async <T = any>(
  url: string,
  method: string = "GET",
  data?: any,
  customHeaders?: HeadersInit
): Promise<T> => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error ${response.status}: ${errorBody}`);
  }

  return response.json();
};
