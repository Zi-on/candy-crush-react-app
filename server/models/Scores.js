const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema ({
    player: {
        type: String,
    },
    score: {
        type: String,
    }

});

const Scores = mongoose.model("Score", scoreSchema);

module.exports = Scores