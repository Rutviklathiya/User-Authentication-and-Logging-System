const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

mongoose.connect(
    db_url,
    {
        useNewUrlParser : true,
        // useUnifiedTopolgy: true,
        // useCreateIndex : true
    },
    function(error,link){
        assert.equal(error,null,"DB Connect fail....");
        console.log("DB connect success....");
        // console.log(link);

    }
    ); 