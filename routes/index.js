var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Asset Manager',
    assetList: JSON.stringify([
      {
        fileName: 'filename.jpg',
        pageName: 'Page Name Here',
        fileSize: 91111,
        dateUploaded: '04/14/2015'
      }
    ])
  });
});

module.exports = router;
