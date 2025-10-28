import express from 'express';
import * as votingSystemController from '../controllers/VotingSystemController.js';

const router = express.Router();

router.get('/contract-abi', votingSystemController.getContractABI);
router.get('/contract-address', votingSystemController.getContractAddress);

router.get('/active-voters', votingSystemController.getActiveVoters);
router.get('/voters/:voter', votingSystemController.getVoters);
router.get('/proposals/:proposalId', votingSystemController.getProposals);

router.put('/result-voting/:proposalId', votingSystemController.getResultVoting);
router.get('/proposal/:proposalId', votingSystemController.getProposal);

export default function votingSystemRoute(app) {
  app.use('/api', router);
}
