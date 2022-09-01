const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  createDate: {
    type: String,
  },
  updateDate: {
    type: String,
  },
  review: [
    {
      userId: {
        type: String,
      },
      reviewDescription: {
        type: String,
      },
      createDate: {
        type: String,
      },
      updateDate: {
        type: String,
      }
    }
  ]
}, { collection: 'Blog' });

module.exports = mongoose.model('Blog', BlogSchema);
