import React, { useEffect, useState } from 'react';
import { getDataFeed } from '../../utils.js';
import {
  OracleWrapper
} from './OracleManagerStyles';

const OracleManager = ({ web3, networkId }) => {

  const [isDataDisabled, setIsDataDisabled] = useState(true);
  const [isHiddenDataDisabled, setIsHiddenDataDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const [roundId, setRoundId] = useState(undefined);
  const [answer, setAnswer] = useState(undefined);
  const [startedAt, setStartedAt] = useState(undefined);
  const [timeStamp, setTimeStamp] = useState(undefined);
  const [answeredInRound, setAnsweredInRound] = useState(undefined);

  const [phaseId, setPhaseId] = useState(undefined);
  const [aggregatorRoundId, setAggregatorRoundId] = useState(undefined);

  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [roundHystoricalId, setRoundHystoricalId] = useState(undefined);
  const [answerHystorical, setAnswerHystorical] = useState(undefined);
  const [startedAtHystorical, setStartedAtHystorical] = useState(undefined);
  const [timeStampHystorical, setTimeStampHystorical] = useState(undefined);
  const [answeredInRoundHystorical, setAnsweredInRoundHystorical] = useState(undefined);

  // [networkId] => Called once at the beginning and each time the networkId changes.
  useEffect(() => {
    setIsHiddenDataDisabled(true);
    setIsInputDisabled(true);
    setIsButtonDisabled(true);
  }, [networkId]);

  const handleRetrieveCurrentData = async () => {
    const dataFeed = await getDataFeed(web3);
    const result = await dataFeed.methods.getLatestData().call();
    //console.log("Result: "+ JSON.stringify(result, null, 2));
    
    setRoundId(result.roundID);
    setAnswer(result.answer);
    setStartedAt(result.startedAt);
    setTimeStamp(result.timeStamp);
    setAnsweredInRound(result.answeredInRound);

    setIsHiddenDataDisabled(false);
  }

  const handleRetrieveHiddenData = async () => {
    const roundIdBIGINT = BigInt(roundId);
    const maskBININT = BigInt("0xFFFFFFFFFFFFFFFF");
    console.log("roundIdBIGINT: "+roundIdBIGINT);

    const phaseIdShifted = Number(roundIdBIGINT >> 64n);
    console.log("phaseId: "+phaseIdShifted);
    setPhaseId(phaseIdShifted); 

    const _aggregatorRoundId = Number(roundIdBIGINT & maskBININT);
    console.log("aggregatorRoundId: "+_aggregatorRoundId);
    setAggregatorRoundId(_aggregatorRoundId);

    setIsInputDisabled(false);
  }
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsButtonDisabled(false);
  };

  const handleRetrieveHystoricalData = async () => {
    const phaseIdBIGINT = BigInt(phaseId);
    const aggregatorRoundIdHystoricalBIGINT = BigInt(inputValue);

    const phaseIdShifted = phaseIdBIGINT << 64n;
    console.log("phaseId: "+phaseIdShifted);

    const _roundId = phaseIdShifted | aggregatorRoundIdHystoricalBIGINT;
    console.log("_roundId: "+_roundId);
   
    const dataFeed = await getDataFeed(web3);
    const result = await dataFeed.methods.getHistoricalData(_roundId).call();
    //console.log("Result: "+ JSON.stringify(result, null, 2));
    setRoundHystoricalId(result.roundID);
    setAnswerHystorical(result.answer);
    setStartedAtHystorical(result.startedAt);
    setTimeStampHystorical(result.timeStamp);
    setAnsweredInRoundHystorical(result.answeredInRound);
  }
  
  return (
    <div>
      <div>
        {networkId}
      </div>

      <div>
        <button onClick={handleRetrieveCurrentData}>Retrieve Current Data</button>
        <input type="number" placeholder="roundId" value={roundId} disabled={isDataDisabled} />
        <input type="number" placeholder="answer" value={answer} disabled={isDataDisabled} />
        <input type="number" placeholder="startedAt" value={startedAt} disabled={isDataDisabled} />
        <input type="number" placeholder="timeStamp" value={timeStamp} disabled={isDataDisabled} />
        <input type="number" placeholder="answeredInRound" value={answeredInRound} disabled={isDataDisabled} />
      </div>
      
      <div>
        <button onClick={handleRetrieveHiddenData} disabled={isHiddenDataDisabled}>Retrieve Hidden Data</button>
        <input type="number" placeholder="phaseId" value={phaseId} disabled={isDataDisabled} />
        <input type="number" placeholder="aggregatorRoundId" value={aggregatorRoundId} disabled={isDataDisabled} />
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter some text"
          value={inputValue}
          min={1}
          max={aggregatorRoundId+1}
          onChange={handleInputChange}
          disabled={isInputDisabled}
        />
      </div>
      <div>
        <button onClick={handleRetrieveHystoricalData}  disabled={isButtonDisabled}>Retrieve Hystorica Data</button>
        <input type="number" placeholder="roundHystoricalId" value={roundHystoricalId} disabled={isDataDisabled} />
        <input type="number" placeholder="answerHystorical" value={answerHystorical} disabled={isDataDisabled} />
        <input type="number" placeholder="startedAtHystorical" value={startedAtHystorical} disabled={isDataDisabled} />
        <input type="number" placeholder="timeStampHystorical" value={timeStampHystorical} disabled={isDataDisabled} />
        <input type="number" placeholder="answeredInRoundHystorical" value={answeredInRoundHystorical} disabled={isDataDisabled} />
      </div>
    </div>
  );
}

export default OracleManager;