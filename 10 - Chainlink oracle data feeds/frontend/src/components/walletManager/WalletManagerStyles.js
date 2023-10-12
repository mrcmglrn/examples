import styled from 'styled-components';

export const ConnectionAddress = styled.div`
  background-color: #0056b3;
  color: #fff;
  padding: 0.65rem 1rem;
  margin: 0.3rem 0.5rem;
  border: none;
  border-radius: 5px;
  min-width: 8rem;
  text-align: center;
  font-size: 1.2rem;
`;

export const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

export const ConnectionButton = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 0.65rem 1rem;
  margin: 0.3rem 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 8rem;
  text-align: center;
  font-size: 1.2rem;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 1rem 0.5rem #007fff;
    transition: box-shadow 0.4s ease-in;
  }
`;

export const OracleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;