import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFolders } from '../../hooks/useFolders';
import { useWebsites } from '../../hooks/useWebsites';
import type { Website } from '../../types';
import { AddWebsiteModal } from '../Modals/AddWebsiteModal';
import { ConfirmationModal } from '../Modals/ConfirmationModal';
import { WebsiteDetailsModal } from '../Modals/WebsiteDetailsModal';
import { WebsiteCard } from '../WebsiteCard/WebsiteCard';

interface ContentAreaProps {
  folderId: string;
}

const Container = styled.div`
  
  padding: 32px;
  flex: 1;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const FolderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};

  h3 {
    margin-bottom: 8px;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    margin-bottom: 24px;
  }
`;

const LoadingState = styled.div`
  padding: 32px;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};
`;

export const ContentArea: React.FC<ContentAreaProps> = ({ folderId }) => {
  const { websites, isLoading, addWebsite, deleteWebsite, updateWebsite } = useWebsites(folderId);
  const { folders } = useFolders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [deletingWebsiteId, setDeletingWebsiteId] = useState<string | null>(null);
  const [viewingWebsite, setViewingWebsite] = useState<Website | null>(null);

  const currentFolder = folders.find(f => f.id === folderId);

  const handleSaveWebsite = async (data: { title: string; url: string; username?: string; encryptedPassword?: string }) => {
    if (editingWebsite) {
      await updateWebsite({
        ...editingWebsite,
        ...data,
      });
      setEditingWebsite(null);
    } else {
      await addWebsite({ ...data, folderId });
    }
  };

  const handleDeleteRequest = (id: string) => {
    setDeletingWebsiteId(id);
  };

  const handleViewRequest = (website: Website) => {
    setViewingWebsite(website);
  };

  const handleEditRequest = (website: Website) => {
    setViewingWebsite(null); // Close details modal
    setEditingWebsite(website); // Set editing state
    setIsModalOpen(true); // Open edit modal
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setEditingWebsite(null);
  };

  const confirmDelete = async () => {
    if (deletingWebsiteId) {
      await deleteWebsite(deletingWebsiteId);
      setDeletingWebsiteId(null);
    }
  };

  if (isLoading) return <LoadingState>Loading websites...</LoadingState>;

  return (
    <Container>
      <ContentHeader>
        <FolderTitle>{currentFolder?.name || 'Folder'}</FolderTitle>
        <HeaderActions>
          <AddButton onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Website
          </AddButton>
        </HeaderActions>
      </ContentHeader>

      {websites.length === 0 ? (
        <EmptyState>
          <h3>No websites yet</h3>
          <p>Add your first website to this collection.</p>
          <AddButton onClick={() => setIsModalOpen(true)}>
            Add Website
          </AddButton>
        </EmptyState>
      ) : (
        <Grid>
          {websites.map(site => (
            <WebsiteCard
              key={site.id}
              website={site}
              onDelete={handleDeleteRequest}
              onView={handleViewRequest}
            />
          ))}
        </Grid>
      )}

      <AddWebsiteModal
        isOpen={isModalOpen}
        onClose={closeModals}
        onSubmit={handleSaveWebsite}
        initialData={editingWebsite}
      />

      <WebsiteDetailsModal
        website={viewingWebsite}
        onClose={() => setViewingWebsite(null)}
        onEdit={handleEditRequest}
      />

      <ConfirmationModal
        isOpen={!!deletingWebsiteId}
        onClose={() => setDeletingWebsiteId(null)}
        onConfirm={confirmDelete}
        title="Delete Website"
        message="Are you sure you want to delete this website? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </Container>
  );
};
