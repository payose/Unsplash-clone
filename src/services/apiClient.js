import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL; 
const API_KEY = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${API_KEY}`,
  },
});

export const searchPhotos = async (query, page = 1, perPage = 8) => {
  try {
    const response = await apiClient.get(`/search/photos`, {
      params: { query, page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching photos:', error);
    throw error;
  }
};

export default apiClient;
