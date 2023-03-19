const { Router } = require('express');
const { getAllHistory, getSpecificHistory, getHistoryByPage, addHistory, updateHistory, deleteHistory } = require('../controllers/tasks.controller');

const router = Router();

router.get('/history', getAllHistory);
router.get('/history/:id', getSpecificHistory);
router.get('/history/page/:id', getHistoryByPage);
router.post('/history', addHistory);
router.put('/history/:id/edit', updateHistory);
router.delete('/history/:id', deleteHistory);

module.exports = router;