const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    tokenId: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    metadata: {
      name: {
        type: String,
        required: false,
        default : ""
      },
      description: {
        type: String,
        required: false,
        default : ""
      },
      coverImageUrl: {
        type: String,
        required: false,
        default : ""
      },
      audioUrl: {
        type: String,
        required: false,
        default : ""
      },
    }
  },
  { timestamps: true }
)




module.exports = mongoose.model("Post", postSchema)