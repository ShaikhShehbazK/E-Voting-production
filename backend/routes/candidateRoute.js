//External Module
const express = require('express');
const candidateRouter = express.Router();

const candidateController = require('../controllers/candidateController');
const { jwtAuthMiddleware } = require('../jwt');

//create new candidate
candidateRouter.post('/', jwtAuthMiddleware, candidateController.postCreateCandidate);

//Update candidate
candidateRouter.put('/:candidateId', jwtAuthMiddleware, candidateController.putUpdateCandidate);

//delete a candidate
candidateRouter.delete('/:candidateId', jwtAuthMiddleware, candidateController.deleteCandidate);

// get a list of candidate
candidateRouter.get('/', candidateController.getCandidate);

//let's start vote
candidateRouter.post('/vote/:candidateId', jwtAuthMiddleware, candidateController.postVote);

candidateRouter.get('/vote/count', candidateController.getVoteCount);

module.exports = candidateRouter;
