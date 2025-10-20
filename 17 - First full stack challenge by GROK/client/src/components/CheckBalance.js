import { useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  InputContainer,
  InputLabel,
  Input,
  ButtonContainer,
  ResultContainer,
  ErrorContainer,
  ErrorStyle,
  ResponseContainer,
  ResponseTitle,
  ResponseStyle,
  LoadingStyle
} from "./CheckBalanceStyled.js";

function CheckBalance() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Change this to your server API endpoint as needed
  const API_URL = process.env.REACT_APP_API_URL;

    async function callApi() {
      setLoading(true);
      setError(null);
      setResponse(null);
      try {
        // Use GET and send the input as a path segment: GET ${API_URL}/{input}
        const safeInput = encodeURIComponent(input);
        const url = `${API_URL.replace(/\/$/, "")}/${safeInput}`;
        const res = await axios.get(url);
        
        setResponse(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

  function resetView() {
    setInput("");
    setResponse(null);
    setError(null);
    setLoading(false);
  }

  return (
    <Container>
      <Title>API Interaction Demo</Title>

      <InputContainer>
        <InputLabel>
          Enter text to send to server:
        </InputLabel>
        <Input
          id="textInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
      </InputContainer>

      <ButtonContainer>
        <button onClick={callApi} disabled={loading || input.trim() === ""}>
          {loading ? "Calling..." : "Call API"}
        </button>
        <button onClick={resetView} disabled={loading && !error}>
          Reset View
        </button>
      </ButtonContainer>

      <ResultContainer>
        {error && (
          <ErrorContainer>
            <ErrorStyle>Error:</ErrorStyle> {error}
          </ErrorContainer>
        )}

        {response && (
          <ResponseContainer>
            <ResponseTitle>Server response</ResponseTitle>
            <ResponseStyle>
              {JSON.stringify(response, null, 2)}
            </ResponseStyle>
          </ResponseContainer>
        )}

        {!response && !error && !loading && (
          <LoadingStyle>
            No response yet. Enter text and click "Call API".
          </LoadingStyle>
        )}
      </ResultContainer>
    </Container>
  );
}

export default CheckBalance;
