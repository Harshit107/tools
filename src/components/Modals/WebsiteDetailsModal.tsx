import { Copy, Edit2, ExternalLink, Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TEMP_PASSKEY } from '../../constants/security.constants';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../../constants/ui.constants';
import type { Website } from '../../types';
import { decryptPassword } from '../../utils/security.utils';

interface WebsiteDetailsModalProps {
  website: Website | null;
  onClose: () => void;
  onEdit: (website: Website) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  width: 100%;
  max-width: 450px;
  border-radius: ${BORDER_RADIUS.lg};
  box-shadow: ${SHADOWS.lg};
  padding: ${SPACING.lg};
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.lg};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  padding: 4px;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
  }
`;

const DetailsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm};
  margin-bottom: ${SPACING.md};
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.md};
  background-color: ${({ theme }) => theme.background};
  border-radius: ${BORDER_RADIUS.md};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text.primary};
  font-family: monospace; /* For better readability of credentials */
  font-size: 0.95rem;
`;

const ValueText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: ${SPACING.sm};
`;

const SmallIconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.muted};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.surface};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin: ${SPACING.lg} 0;
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm};
`;

const PasskeyInputContainer = styled.div`
  display: flex;
  gap: ${SPACING.sm};
`;

const Input = styled.input`
  flex: 1;
  padding: ${SPACING.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.md};
  font-size: 0.9rem;
  outline: none;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text.primary};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  font-weight: 500;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.danger};
  font-size: 0.85rem;
  margin-top: 4px;
`;

export const WebsiteDetailsModal: React.FC<WebsiteDetailsModalProps> = ({ website, onClose, onEdit }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [decryptedInfo, setDecryptedInfo] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!website) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add extensive toast notification here
  };

  const handleDecrypt = () => {
    if (!website.encryptedPassword) return;
    
    const decrypted = decryptPassword(website.encryptedPassword, passkey, TEMP_PASSKEY);
    
    if (decrypted) {
      setDecryptedInfo(decrypted);
      setIsPasswordVisible(true);
      setError('');
    } else {
      setError('Invalid passkey');
      setDecryptedInfo(null);
    }
  };

  const resetView = () => {
    setIsPasswordVisible(false);
    setDecryptedInfo(null);
    setPasskey('');
    setError('');
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Website Details</Title>
          <ActionButtons>
            <IconButton onClick={() => onEdit(website)} title="Edit Website">
              <Edit2 size={20} />
            </IconButton>
            <IconButton onClick={onClose} title="Close">
              <X size={20} />
            </IconButton>
          </ActionButtons>
        </Header>

        <DetailsGroup>
          <Label>Title</Label>
          <ValueContainer>
            <ValueText>{website.title}</ValueText>
          </ValueContainer>
        </DetailsGroup>

        <DetailsGroup>
          <Label>URL</Label>
          <ValueContainer>
            <ValueText>{website.url}</ValueText>
            <a href={website.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
              <SmallIconButton title="Open Link">
                <ExternalLink size={16} />
              </SmallIconButton>
            </a>
          </ValueContainer>
        </DetailsGroup>

        {website.username && (
          <DetailsGroup>
            <Label>Username / Email</Label>
            <ValueContainer>
              <ValueText>{website.username}</ValueText>
              <SmallIconButton onClick={() => handleCopy(website.username!)} title="Copy Username">
                <Copy size={16} />
              </SmallIconButton>
            </ValueContainer>
          </DetailsGroup>
        )}

        {website.encryptedPassword && (
          <>
            <Divider />
            <PasswordSection>
              <Label>Password</Label>
              {isPasswordVisible && decryptedInfo ? (
                <ValueContainer style={{ borderColor: '#10B981', backgroundColor: '#ECFDF5', color: '#064E3B' }}>
                   <ValueText>{decryptedInfo}</ValueText>
                   <div style={{ display: 'flex', gap: '8px' }}>
                     <SmallIconButton onClick={() => handleCopy(decryptedInfo)} title="Copy Password">
                       <Copy size={16} />
                     </SmallIconButton>
                     <SmallIconButton onClick={resetView} title="Hide Password">
                       <EyeOff size={16} />
                     </SmallIconButton>
                   </div>
                </ValueContainer>
              ) : (
                <>
                  <PasskeyInputContainer>
                    <Input 
                      type="password" 
                      placeholder="Enter passkey to view..." 
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleDecrypt()}
                    />
                    <Button onClick={handleDecrypt}>
                      <Eye size={16} style={{ marginRight: '8px' }} />
                      View
                    </Button>
                  </PasskeyInputContainer>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </PasswordSection>
          </>
        )}
      </ModalContainer>
    </Overlay>
  );
};
