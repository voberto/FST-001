import axios, { AxiosError } from 'axios';

let using_docker : boolean = true;

const addr_api_local = { baseURL: 'http://localhost:8000', withCredentials: true };
const addr_api_docker = { baseURL: '/', withCredentials: true };
let addr_api_curr = addr_api_docker;
if(Boolean(using_docker) === false)
{
  addr_api_curr = addr_api_local;
}
const api = axios.create(addr_api_curr);

// Function to get CSRF token
export const getCsrfToken = async (): Promise<string> => {
  const response = await api.get('/api/csrf/');
  return response.data.csrfToken; // Adjust based on your response structure
};

// Function to log in
export const login = async (email: string, password: string): Promise<{ access: string; refresh: string }> => {
  const csrfToken = await getCsrfToken(); // Get CSRF token
  const response = await api.post('/api/login/', { email, password }, {
    headers: {
      'X-CSRFToken': csrfToken, // Include CSRF token in headers
    },
  });
  return response.data; // Adjust based on your response structure
};

// Alias the login function
export const apiLogin = login;

// Function to refresh access token
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await api.post('/api/token/refresh/', {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem('accessToken', access); // Update access token
    return access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null; // Handle token refresh failure
  }
};

// Function to make authenticated requests
export const apiRequest = async (url: string, method: 'GET' | 'POST' = 'GET', data: any = null): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`, // Ensure the token is included
    },
    data,
  };

  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError; // Type assertion to AxiosError
    if (axiosError.response?.status === 401) {
      // Token expired, try to refresh
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the original request with the new access token
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        const retryResponse = await api(config);
        return retryResponse.data;
      }
    }
    console.error('API request error:', axiosError); // Log the error
    throw error; // Rethrow the error if not handled
  }
};

export default api;