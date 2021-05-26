import apiClient from './apiClient';

const getImages = () => apiClient.get('/image');
const deleteImage = (id) => apiClient.delete(`/image/${id}`);
const getImageById = (id) => apiClient.get(`/image/${id}`);
const uploadImage = (data) => apiClient.post('/image/upload', data);

const exportedObject = {
  getImages,
  deleteImage,
  getImageById,
  uploadImage,
};

export default exportedObject;
