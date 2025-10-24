import express from 'express';
import * as myCollectionController from '../controllers/myCollectionController.js';

const router = express.Router();

router.get('/contract-address', myCollectionController.getContractAddress);
router.get('/contract-abi', myCollectionController.getContractABI);

router.post('/token-uri', myCollectionController.getTokenURI);
router.put('/base-uri', myCollectionController.setBaseTokenURI);

router.get('/mint-price', myCollectionController.getMintPrice);
router.put('/mint-price', myCollectionController.setMintPrice);

router.get('/total-supply', myCollectionController.getTotalSupply);

router.post('/mint', myCollectionController.mint);
/*
 * It's not possible on server without expose the user private key.
 */
//router.post('/public-mint', myCollectionController.publicMint);

router.get('/owner', myCollectionController.getOwner);
router.put('/withdraw', myCollectionController.withdraw);
router.post('/transfer-ownership', myCollectionController.transferOwnership);

export default function myCollectionRoute(app) {
  app.use('/api/my-collection', router);
}