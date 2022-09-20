const NFT = require("../models/nfts");

module.exports = {
  nfts: async (args) => {
    try {
      var { tokenId, owner } = args.filter;
      const nftsFetched = await NFT.find({
        $or: [{ tokenId: tokenId }, { owner: owner }],
      });
      return nftsFetched.map((nft) => {
        return {
          ...nft._doc,
          _id: nft.id,
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
      const nft = new NFT({
        tokenId,
        owner,
      });
      const newNFT = await nft.save();
      return { ...newNFT._doc, _id: newNFT.id };
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
      const updatedNFT = await NFT.findByIdAndUpdate(findNft._id, {
        metadata: metadataUpdate,
      });
      return {
        ...updatedNFT._doc,
        _id: updatedNFT.id,
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
