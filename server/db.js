const mongoose = require('mongoose');

function dbConnect() {
  mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
    .then(() => {
      console.log('db connected');
    })
    .catch((err) => {
      console.log('something went wrong', { err });
    });
}

module.exports = dbConnect;
