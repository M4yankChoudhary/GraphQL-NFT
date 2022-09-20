const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  """
  A NFT refers to available attributes for a NFT
  """
  type NFT {
    _id: ID!
    tokenId: String!
    owner: String!
    metadata: NFTMetadata
  }
  type NFTMetadata {
    name: String!
    description: String
    coverImageUrl: String!
    audioUrl: String!
  }
  input NFTUpdateMetadataData {
    name: String
    description: String
    coverImage: String
    audio: String
  }

input NftMintData {
  tokenId: String!
  owner: String!
}
  input NFTFilter {
    tokenId: String!
    owner: String!
  }
  type Query {
    nfts(filter: NFTFilter): [NFT!]
    nft(tokenId: String):NFT!
  }
  type Mutation {
    nftMint(data: NftMintData) : NFT
    nftUpdateMetadata(tokenId: String, metadata: NFTUpdateMetadataData): NFT
    deletePost(_id: String): NFT,
  
  }

  type NFTTransferEvent {
    from: String!
    to: String!
    tokenId: String!
  }
  type Subscription {
    nftTransfered(from: String, to: String, tokenId: String): NFTTransferEvent!
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`);
