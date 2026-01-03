'use client';

import styled from 'styled-components';

const StyledButtonWrapper = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: #000;
  color: #fff;
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </StyledButtonWrapper>
  );
};
