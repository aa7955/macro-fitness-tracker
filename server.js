// EXPRESS SERVER HERE //
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    moment = require('moment'),
    methodoverride = require('method-override'),
    errorHandler = require('errorhandler');
    Nutrition = require('./app/routes/mongo.js');

// =========================CONFIGURATION===========================//
// =================================================================//
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan());
app.use(methodoverride());

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

mongoose.connect('mongodb://test:123456@ds029831.mongolab.com:29831/macronutrients',
            function(err) {
                if(err) {
                    console.log('Connection error: ', err);
                } else {
                    console.log('Connection successful');
                }
            });

// ==========================ROUTER=================================//
// =================================================================//

var router = express.Router();
// ================================= //

// NEED A LOGIN PAGE ROUTE HERE

router.route('/login')

.post(function(request, response) {

    });


// ================================= //

// ACCESS THE MAIN ROUTE FOR THE INFORMATION PASSED AND ACCESSED
router.route('/nutrition')

// ===========POST INFORMATION====================== //
.post(function(request, response) {

        var base = new Nutrition;
        base.date = request.body.date;
        base.protein = request.body.protein;
        base.carbohydrate = request.body.carbohydrate;
        base.fat = request.body.fat;

        base.save(function(err) {
            if (err)
            response.send(err);

            response.json({ message: "Information sent!"});

        });

    })

// ===========ACCESS INFORMATION====================== //
.get(function(request, response) {
        Nutrition.find(function(err, nutritionInformation) {
           if(err)
           response.send(err);

           response.json(nutritionInformation);
       });
    });

// =========NEW ROUTE TO ACCESS INDIVIDUAL ITEMS======================== //

router.route('/nutrition/:nutrition_id')

// ===========ACCESS INFORMATION====================== //
.get(function(request, response) {
        Nutrition.findById(request.params.nutrition_id, function(err, base) {
          if(err)
          response.send(err);

            response.json(base);
        });
    })

// ==============DELETE INFORMATION=================== //
.delete(function(request, response) {
        Nutrition.remove({_id: request.params.nutrition_id},
            function(err, base) {
            if(err)
            response.send(err);

                response.json({message: "Successfully deleted"});
        });
    });

// =============WHERE TO ACCESS THE API==================== //
app.use('/data', router);

// =============LISTEN FOR EVENTS ON 9001 IF RUNNING NODE==================== //
app.listen(9001); // Not used if Gulp is activated - it is bypassed
exports = module.exports = app; // This is needed otherwise Mongoose Code will not work
