import type { Folder } from '../types';
import apiClient from './client';

export const fetchFolders = async (): Promise<Folder[]> => {
  const response = await apiClient.get<Folder[]>('/folders');
  return response.data;
};

export const createFolder = async (name: string, description?: string): Promise<Folder> => {
  const response = await apiClient.post<Folder>('/folders', { name, description });
  return response.data;
};

export const deleteFolder = async (id: string): Promise<void> => {
  await apiClient.delete(`/folders/${id}`);
};
