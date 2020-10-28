const router = require('express').Router()
const domainCtrl = require('../controllers/domainCtrl')

router.route('/')
.post(domainCtrl.createDomain)
.get(domainCtrl.getDomains)


module.exports = router