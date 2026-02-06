import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SPACING } from '../../constants/ui.constants';
import { useFolders } from '../../hooks/useFolders';
import { FolderList } from '../FolderList/FolderList';
import { CreateFolderModal } from '../Modals/CreateFolderModal';

interface SidebarProps {
  selectedFolderId: string | null;
  onSelectFolder: (id: string) => void;
}

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px); /* Subtract header height */
  position: fixed; /* Fixed within the layout */
  top: 64px;
  left: 0;
  padding: ${SPACING.lg};
  transition: background-color 0.3s ease, border-color 0.3s ease;
  z-index: 5;
`;

const SidebarHeader = styled.div`
  margin-bottom: ${SPACING.lg};
`;

const SidebarTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${SPACING.xs};
`;

const SidebarDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.muted};
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: ${SPACING.md};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const NewFolderButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm};
  background-color: ${({ theme }) => theme.background};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.md};
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.text.secondary}10; /* slight tint */
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Sidebar: React.FC<SidebarProps> = ({ selectedFolderId, onSelectFolder }) => {
  const { createFolder } = useFolders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (data: { name: string; description?: string }) => {
    await createFolder(data);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>My Collections</SidebarTitle>
        <SidebarDescription>Organize your important websites</SidebarDescription>
      </SidebarHeader>

      <ScrollArea>
        <FolderList selectedFolderId={selectedFolderId || ''} onSelectFolder={onSelectFolder} />
      </ScrollArea>

      <Footer>
        <NewFolderButton onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> New Folder
        </NewFolderButton>
      </Footer>

      <CreateFolderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreate} 
      />
    </SidebarContainer>
  );
};
