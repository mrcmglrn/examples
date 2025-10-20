import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h2`
  margin-bottom: 16px;
`;

export const InputContainer = styled.div`
  margin-bottom: 12px;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 6px;
`;  

export const Input = styled.input`
  padding: 8px; 
  width: 100%;
  max-width: 600px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const ResultContainer = styled.div`
  margin-top: 16px;
`;

export const ErrorContainer = styled.div`
  color: #b00020;
`;

export const ErrorStyle = styled.div`
  text-weight: bold;
`;

export const ResponseContainer = styled.div`
  margin-top: 16px;
`;

export const ResponseTitle = styled.h3`
  margin-bottom: 8px;
`;

export const ResponseStyle = styled.pre`
  background: #f5f5f5; 
  padding: 12px;
  white-space: pre-wrap;
`;

export const LoadingStyle = styled.div`
  color: #0066cc;
`;