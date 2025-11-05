import express from 'express';
import * as votingSystemController from '../controllers/VotingSystemController.js';

const router = express.Router();

router.get('/contract-abi', votingSystemController.getContractABI);
router.get('/contract-address', votingSystemController.getContractAddress);

router.get('/proposal-counter', votingSystemController.getProposalCounter);
router.get('/active-voters', votingSystemController.getActiveVoters);
router.get('/voters/:voter', votingSystemController.getVoterByAddress);
router.get('/proposals/:proposalId', votingSystemController.getProposalById);

router.put('/result-voting/:proposalId', votingSystemController.getResultVoting); // MUST TO BE ON CLIENT SIDE, REQUIRED THE SIGN!

export default function votingSystemRoute(app) {
  app.use('/api', router);
}
