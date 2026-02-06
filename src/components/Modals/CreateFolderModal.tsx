import { X } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../../constants/ui.constants';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.form`
  background-color: ${({ theme }) => theme.surface};
  border-radius: ${BORDER_RADIUS.lg};
  box-shadow: ${SHADOWS.lg};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.border};
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.lg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.muted};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: ${SPACING.lg};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
`;

const Input = styled.input`
  padding: ${SPACING.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${SPACING.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  transition: border-color 0.2s;
  resize: none;
  min-height: 80px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.md};
  padding: ${SPACING.lg};
  background-color: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-radius: 0 0 ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'secondary'
      ? `
      background-color: transparent;
      border: 1px solid ${theme.border};
      color: ${theme.text.primary};
      &:hover { background-color: ${theme.surface}; }
    `
      : `
      background-color: ${theme.primary};
      color: white;
      &:hover { background-color: ${theme.primaryHover}; }
    `}
`;

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, description });
      setName('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay $isOpen={isOpen} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalContainer onSubmit={handleSubmit}>
        <ModalHeader>
          <Title>New Folder</Title>
          <CloseButton type="button" onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="folder-name">Name</Label>
            <Input
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Work Projects"
              autoFocus
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="folder-desc">Description (Optional)</Label>
            <TextArea
              id="folder-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this collection for?"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="button" $variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Folder</Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};
