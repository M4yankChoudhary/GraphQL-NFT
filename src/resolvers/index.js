const NFT = require("../models/nfts");

module.exports = {
  nfts: async (args) => {
    try {
      var { tokenId, owner } = args.filter;
      const postsFetched = await NFT.find({
        $or: [{ tokenId: tokenId }, { owner: owner }],
      });
      return postsFetched.map((post) => {
        return {
          ...post._doc,
          _id: post.id,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  nft: async (tokenId) => {
    try {
      const findNft = await NFT.findOne(tokenId);
      return {
        ...findNft._doc,
        _id: findNft.id,
      };
    } catch (error) {
      throw error;
    }
  },

  nftMint: async (args) => {
    try {
      const { owner, tokenId } = args.data;
      const post = new NFT({
        tokenId,
        owner,
      });
      const newPost = await post.save();
      return { ...newPost._doc, _id: newPost.id };
    } catch (error) {
      throw error;
    }
  },

  nftUpdateMetadata: async (args) => {
    try {
      const { tokenId, metadata } = args;
      var metadataUpdate = {
        name: metadata.name,
        description: metadata.description,
        coverImageUrl: metadata.coverImage,
        audioUrl: metadata.audio,
      };
      const findNft = await NFT.findOne({ tokenId });
      const updatedPost = await NFT.findByIdAndUpdate(findNft._id, {
        metadata: metadataUpdate,
      });
      return {
        ...updatedPost._doc,
        _id: updatedPost.id,
      };
    } catch (error) {
      throw error;
    }
  },
  nftTransfered: async (args) => {
    const { from, to, tokenId } = args;
    console.log(from, to);
    try {
      NFT.updateMany(
        { _id: { $in: [from, to] } },
        { $set: { tokenId } },
        { multi: true },
        function (err, records) {
          if (err) {
            return false;
          }
        }
      );

      const findNft = await NFT.findOne({ from });
      await NFT.findByIdAndUpdate(findNft._id, { tokenId: "" });

      var transfer = {
        from: from,
        to: to,
        tokenId: tokenId,
      };

      return transfer;
    } catch (error) {
      throw error;
    }
  },
};
