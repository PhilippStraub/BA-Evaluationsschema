var router = require('express').Router();


router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'API available'
    });
});


var controller = require('./controller');


router.route('/evaluate')
    .get(controller.index)
    .post(controller.new);


module.exports = router;
