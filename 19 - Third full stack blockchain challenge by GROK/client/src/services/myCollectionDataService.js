import http from "./httpCommon.js";

class MyCollectionDataService {
  getMyCollectionAddress() {
    return http.get('/contract-address');
  }

  getMyCollectionABI() {
    return http.get('/contract-abi');
  }

}

export default new MyCollectionDataService();
