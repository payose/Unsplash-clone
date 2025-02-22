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

export const fetchPhotos = async (page = 1, perPage = 10) => {
  try {
    const response = await apiClient.get(`/photos`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

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

export const fetchPhotoById = async (photoId) => {
  try {
    const response = await apiClient.get(`/photos/${photoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
};

export const likePhoto = async (photoId) => {
  try {
    const response = await apiClient.post(`/photos/${photoId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking photo:', error);
    throw error;
  }
};

export const uploadPhoto = async (file, description) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    
    const response = await apiClient.post(`/photos/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export default apiClient;
