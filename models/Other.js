const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  webVisits: {
    type: Number,
  },
  userVisits: {
    type: Number,
  },
  noteVisits: {
    type: Number,
  },
  talkVisits: {
    type: Number,
  },
  echartsWebVisits: [
    {
      num: {
        type: Number,
      },
      date: {
        type: Date,
      },
    },
  ],
  echartsUserVisits: {
    num: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  echartsNoteVisits: {
    num: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  echartStalkVisits: {
    num: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
})

module.exports = mongoose.model('Other', schema)
