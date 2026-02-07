import type { Website } from '../types';
import apiClient from './client';

const addFavicon = (website: Website): Website => ({
  ...website,
  favicon: `https://www.google.com/s2/favicons?domain=${website.url}&sz=64`
});

export const fetchWebsites = async (folderId: string): Promise<Website[]> => {
  const response = await apiClient.get<Website[]>(`/websites/folder/${folderId}`);
  return response.data.map(addFavicon);
};

export const addWebsite = async (website: Omit<Website, 'id' | 'createdAt'>): Promise<Website> => {
  const response = await apiClient.post<Website>('/websites', website);
  return addFavicon(response.data);
};

export const deleteWebsite = async (id: string): Promise<void> => {
  await apiClient.delete(`/websites/${id}`);
};

export const updateWebsite = async (website: Website): Promise<Website> => {
  const { id, ...data } = website;
  const response = await apiClient.put<Website>(`/websites/${id}`, data);
  return addFavicon(response.data);
};
