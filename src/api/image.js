import apiClient from './apiClient';
import { v1 as uuidv1 } from 'uuid';

const getImages = () => apiClient.get('/image');
const deleteImage = (id) => apiClient.delete(`/image/${id}`);
const getImageById = (id) => apiClient.get(`/image/${id}`);
const uploadImage = (file, dimension, thumbnail) => {
  const { size, type, lastModifiedDate: created } = file;

  const items = new FormData();
  const uploaded = new Date();
  const id = uuidv1();

  items.append('name', id);
  items.append('size', size);
  items.append('type', type);
  items.append('dimension', dimension);
  items.append('created', created);
  items.append('uploaded', uploaded);
  items.append('thumbnail', thumbnail);
  items.append('file', file, id);
  return apiClient.post('/image/upload', items);
};

const exportedObject = {
  getImages,
  deleteImage,
  getImageById,
  uploadImage,
};

export default exportedObject;
