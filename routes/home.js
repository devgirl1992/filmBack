const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.send("Nice Home  Page...Coming Soon!...")
})




module.exports = router;

