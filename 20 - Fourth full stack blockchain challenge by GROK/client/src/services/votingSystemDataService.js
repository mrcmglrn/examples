import http from "./httpCommon.js";

class VotingSystemDataService {
  
  getVotingSystemAddress() {
    return http.get('/contract-address');
  }

  getVotingSystemABI() {
    return http.get('/contract-abi');
  }

  getProposalCounter() {
    return http.get('/proposal-counter');
  }

  getActiveVoters() {
    return http.get('/active-voters');
  }

  getVoterByAddress(voter) {
    return http.get(`/voters/${voter}`);
  }

  getProposalById(proposalId) {
    return http.get(`/proposals/${proposalId}`);
  }

}

export default new VotingSystemDataService();
