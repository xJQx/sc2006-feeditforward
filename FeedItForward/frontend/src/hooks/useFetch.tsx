import { serverDomainUrl } from "../utils/serverDomainUrl";

// Helper functions
const handleResponse = async (response: Response) => {
  if (response.ok) return response.json();

  // Status not ok
  try {
    const data = await response.json();
    return Promise.reject(data || response.status);
  } catch {
    // Could not parse the JSON
    return Promise.reject(response.status);
  }
};

// Custom fetch hook
const useFetch = () => {
  const get = async (url: string) => {
    const requestOptions: RequestInit = {
      method: "GET",
      credentials: "include"
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const post = async (url: string, body: any) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const put = async (url: string, body: any) => {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };

  // prefixed with underscored because delete is a reserved word in javascript
  const _delete = async (url: string) => {
    const requestOptions: RequestInit = {
      method: "DELETE",
      credentials: "include"
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  return { get, post, put, _delete };
};

export default useFetch;