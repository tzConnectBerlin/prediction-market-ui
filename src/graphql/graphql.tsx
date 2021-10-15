import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['BigFloat']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['BigFloat']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['BigFloat']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['BigFloat']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['BigFloat']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['BigFloat']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['BigFloat']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['BigFloat']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['BigFloat']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['BigFloat']>>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['BigInt']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['BigInt']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['BigInt']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['BigInt']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['BigInt']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['BigInt']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['BigInt']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['BigInt']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['BigInt']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['BigInt']>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['Boolean']>>;
};

/** All input for the create `PmmBigmapClear` mutation. */
export type CreatePmmBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmBigmapClear` to be created by this mutation. */
  pmmBigmapClear: PmmBigmapClearInput;
};

/** All input for the create `PmmStorageFa2` mutation. */
export type CreatePmmStorageFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa2` to be created by this mutation. */
  pmmStorageFa2: PmmStorageFa2Input;
};

/** All input for the create `PmmStorageFa2Live` mutation. */
export type CreatePmmStorageFa2LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa2Live` to be created by this mutation. */
  pmmStorageFa2Live: PmmStorageFa2LiveInput;
};

/** All input for the create `PmmStorageFa2Ordered` mutation. */
export type CreatePmmStorageFa2OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa2Ordered` to be created by this mutation. */
  pmmStorageFa2Ordered: PmmStorageFa2OrderedInput;
};

/** All input for the create `PmmStorageFa12` mutation. */
export type CreatePmmStorageFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa12` to be created by this mutation. */
  pmmStorageFa12: PmmStorageFa12Input;
};

/** All input for the create `PmmStorageFa12Live` mutation. */
export type CreatePmmStorageFa12LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa12Live` to be created by this mutation. */
  pmmStorageFa12Live: PmmStorageFa12LiveInput;
};

/** All input for the create `PmmStorageFa12Ordered` mutation. */
export type CreatePmmStorageFa12OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageFa12Ordered` to be created by this mutation. */
  pmmStorageFa12Ordered: PmmStorageFa12OrderedInput;
};

/** All input for the create `PmmStorage` mutation. */
export type CreatePmmStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorage` to be created by this mutation. */
  pmmStorage: PmmStorageInput;
};

/** All input for the create `PmmStorageLambdaMap` mutation. */
export type CreatePmmStorageLambdaMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLambdaMap` to be created by this mutation. */
  pmmStorageLambdaMap: PmmStorageLambdaMapInput;
};

/** All input for the create `PmmStorageLambdaMapLive` mutation. */
export type CreatePmmStorageLambdaMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLambdaMapLive` to be created by this mutation. */
  pmmStorageLambdaMapLive: PmmStorageLambdaMapLiveInput;
};

/** All input for the create `PmmStorageLambdaMapOrdered` mutation. */
export type CreatePmmStorageLambdaMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLambdaMapOrdered` to be created by this mutation. */
  pmmStorageLambdaMapOrdered: PmmStorageLambdaMapOrderedInput;
};

/** All input for the create `PmmStorageLedgerMap` mutation. */
export type CreatePmmStorageLedgerMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLedgerMap` to be created by this mutation. */
  pmmStorageLedgerMap: PmmStorageLedgerMapInput;
};

/** All input for the create `PmmStorageLedgerMapLive` mutation. */
export type CreatePmmStorageLedgerMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLedgerMapLive` to be created by this mutation. */
  pmmStorageLedgerMapLive: PmmStorageLedgerMapLiveInput;
};

/** All input for the create `PmmStorageLedgerMapOrdered` mutation. */
export type CreatePmmStorageLedgerMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLedgerMapOrdered` to be created by this mutation. */
  pmmStorageLedgerMapOrdered: PmmStorageLedgerMapOrderedInput;
};

/** All input for the create `PmmStorageLiquidityProviderMapBet` mutation. */
export type CreatePmmStorageLiquidityProviderMapBetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLiquidityProviderMapBet` to be created by this mutation. */
  pmmStorageLiquidityProviderMapBet: PmmStorageLiquidityProviderMapBetInput;
};

/** All input for the create `PmmStorageLiquidityProviderMap` mutation. */
export type CreatePmmStorageLiquidityProviderMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLiquidityProviderMap` to be created by this mutation. */
  pmmStorageLiquidityProviderMap: PmmStorageLiquidityProviderMapInput;
};

/** All input for the create `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` mutation. */
export type CreatePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` to be created by this mutation. */
  pmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt: PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtInput;
};

/** All input for the create `PmmStorageLiquidityProviderMapLive` mutation. */
export type CreatePmmStorageLiquidityProviderMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLiquidityProviderMapLive` to be created by this mutation. */
  pmmStorageLiquidityProviderMapLive: PmmStorageLiquidityProviderMapLiveInput;
};

/** All input for the create `PmmStorageLiquidityProviderMapOrdered` mutation. */
export type CreatePmmStorageLiquidityProviderMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLiquidityProviderMapOrdered` to be created by this mutation. */
  pmmStorageLiquidityProviderMapOrdered: PmmStorageLiquidityProviderMapOrderedInput;
};

/** All input for the create `PmmStorageLive` mutation. */
export type CreatePmmStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageLive` to be created by this mutation. */
  pmmStorageLive: PmmStorageLiveInput;
};

/** All input for the create `PmmStorageMarketMapAuctionrunning` mutation. */
export type CreatePmmStorageMarketMapAuctionrunningInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapAuctionrunning` to be created by this mutation. */
  pmmStorageMarketMapAuctionrunning: PmmStorageMarketMapAuctionrunningInput;
};

/** All input for the create `PmmStorageMarketMapFa2` mutation. */
export type CreatePmmStorageMarketMapFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapFa2` to be created by this mutation. */
  pmmStorageMarketMapFa2: PmmStorageMarketMapFa2Input;
};

/** All input for the create `PmmStorageMarketMapFa12` mutation. */
export type CreatePmmStorageMarketMapFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapFa12` to be created by this mutation. */
  pmmStorageMarketMapFa12: PmmStorageMarketMapFa12Input;
};

/** All input for the create `PmmStorageMarketMap` mutation. */
export type CreatePmmStorageMarketMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMap` to be created by this mutation. */
  pmmStorageMarketMap: PmmStorageMarketMapInput;
};

/** All input for the create `PmmStorageMarketMapLive` mutation. */
export type CreatePmmStorageMarketMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapLive` to be created by this mutation. */
  pmmStorageMarketMapLive: PmmStorageMarketMapLiveInput;
};

/** All input for the create `PmmStorageMarketMapMarketbootstrapped` mutation. */
export type CreatePmmStorageMarketMapMarketbootstrappedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapMarketbootstrapped` to be created by this mutation. */
  pmmStorageMarketMapMarketbootstrapped: PmmStorageMarketMapMarketbootstrappedInput;
};

/** All input for the create `PmmStorageMarketMapOrdered` mutation. */
export type CreatePmmStorageMarketMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageMarketMapOrdered` to be created by this mutation. */
  pmmStorageMarketMapOrdered: PmmStorageMarketMapOrderedInput;
};

/** All input for the create `PmmStorageOrdered` mutation. */
export type CreatePmmStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageOrdered` to be created by this mutation. */
  pmmStorageOrdered: PmmStorageOrderedInput;
};

/** All input for the create `PmmStorageSupplyMap` mutation. */
export type CreatePmmStorageSupplyMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageSupplyMap` to be created by this mutation. */
  pmmStorageSupplyMap: PmmStorageSupplyMapInput;
};

/** All input for the create `PmmStorageSupplyMapLive` mutation. */
export type CreatePmmStorageSupplyMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageSupplyMapLive` to be created by this mutation. */
  pmmStorageSupplyMapLive: PmmStorageSupplyMapLiveInput;
};

/** All input for the create `PmmStorageSupplyMapOrdered` mutation. */
export type CreatePmmStorageSupplyMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmStorageSupplyMapOrdered` to be created by this mutation. */
  pmmStorageSupplyMapOrdered: PmmStorageSupplyMapOrderedInput;
};

/** All input for the create `PmmTokenBigmapClear` mutation. */
export type CreatePmmTokenBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenBigmapClear` to be created by this mutation. */
  pmmTokenBigmapClear: PmmTokenBigmapClearInput;
};

/** All input for the create `PmmTokenStorageBalance` mutation. */
export type CreatePmmTokenStorageBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageBalance` to be created by this mutation. */
  pmmTokenStorageBalance: PmmTokenStorageBalanceInput;
};

/** All input for the create `PmmTokenStorageBalancesApproval` mutation. */
export type CreatePmmTokenStorageBalancesApprovalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageBalancesApproval` to be created by this mutation. */
  pmmTokenStorageBalancesApproval: PmmTokenStorageBalancesApprovalInput;
};

/** All input for the create `PmmTokenStorageBalancesLive` mutation. */
export type CreatePmmTokenStorageBalancesLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageBalancesLive` to be created by this mutation. */
  pmmTokenStorageBalancesLive: PmmTokenStorageBalancesLiveInput;
};

/** All input for the create `PmmTokenStorageBalancesOrdered` mutation. */
export type CreatePmmTokenStorageBalancesOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageBalancesOrdered` to be created by this mutation. */
  pmmTokenStorageBalancesOrdered: PmmTokenStorageBalancesOrderedInput;
};

/** All input for the create `PmmTokenStorage` mutation. */
export type CreatePmmTokenStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorage` to be created by this mutation. */
  pmmTokenStorage: PmmTokenStorageInput;
};

/** All input for the create `PmmTokenStorageLive` mutation. */
export type CreatePmmTokenStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageLive` to be created by this mutation. */
  pmmTokenStorageLive: PmmTokenStorageLiveInput;
};

/** All input for the create `PmmTokenStorageMetadataLive` mutation. */
export type CreatePmmTokenStorageMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageMetadataLive` to be created by this mutation. */
  pmmTokenStorageMetadataLive: PmmTokenStorageMetadataLiveInput;
};

/** All input for the create `PmmTokenStorageMetadataOrdered` mutation. */
export type CreatePmmTokenStorageMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageMetadataOrdered` to be created by this mutation. */
  pmmTokenStorageMetadataOrdered: PmmTokenStorageMetadataOrderedInput;
};

/** All input for the create `PmmTokenStorageMetadatum` mutation. */
export type CreatePmmTokenStorageMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageMetadatum` to be created by this mutation. */
  pmmTokenStorageMetadatum: PmmTokenStorageMetadatumInput;
};

/** All input for the create `PmmTokenStorageOrdered` mutation. */
export type CreatePmmTokenStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageOrdered` to be created by this mutation. */
  pmmTokenStorageOrdered: PmmTokenStorageOrderedInput;
};

/** All input for the create `PmmTokenStorageTokenMetadataLive` mutation. */
export type CreatePmmTokenStorageTokenMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageTokenMetadataLive` to be created by this mutation. */
  pmmTokenStorageTokenMetadataLive: PmmTokenStorageTokenMetadataLiveInput;
};

/** All input for the create `PmmTokenStorageTokenMetadataOrdered` mutation. */
export type CreatePmmTokenStorageTokenMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageTokenMetadataOrdered` to be created by this mutation. */
  pmmTokenStorageTokenMetadataOrdered: PmmTokenStorageTokenMetadataOrderedInput;
};

/** All input for the create `PmmTokenStorageTokenMetadataTokenInfo` mutation. */
export type CreatePmmTokenStorageTokenMetadataTokenInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageTokenMetadataTokenInfo` to be created by this mutation. */
  pmmTokenStorageTokenMetadataTokenInfo: PmmTokenStorageTokenMetadataTokenInfoInput;
};

/** All input for the create `PmmTokenStorageTokenMetadatum` mutation. */
export type CreatePmmTokenStorageTokenMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PmmTokenStorageTokenMetadatum` to be created by this mutation. */
  pmmTokenStorageTokenMetadatum: PmmTokenStorageTokenMetadatumInput;
};

/** All input for the create `PublicBigmapKey` mutation. */
export type CreatePublicBigmapKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicBigmapKey` to be created by this mutation. */
  publicBigmapKey: PublicBigmapKeyInput;
};

/** All input for the create `PublicContractDep` mutation. */
export type CreatePublicContractDepInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicContractDep` to be created by this mutation. */
  publicContractDep: PublicContractDepInput;
};

/** All input for the create `PublicContract` mutation. */
export type CreatePublicContractInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicContract` to be created by this mutation. */
  publicContract: PublicContractInput;
};

/** All input for the create `PublicContractLevel` mutation. */
export type CreatePublicContractLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicContractLevel` to be created by this mutation. */
  publicContractLevel: PublicContractLevelInput;
};

/** All input for the create `PublicLeaderboard` mutation. */
export type CreatePublicLeaderboardInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicLeaderboard` to be created by this mutation. */
  publicLeaderboard: PublicLeaderboardInput;
};

/** All input for the create `PublicLevel` mutation. */
export type CreatePublicLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicLevel` to be created by this mutation. */
  publicLevel: PublicLevelInput;
};

/** All input for the create `PublicMaxId` mutation. */
export type CreatePublicMaxIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicMaxId` to be created by this mutation. */
  publicMaxId: PublicMaxIdInput;
};

/** All input for the create `PublicTxContext` mutation. */
export type CreatePublicTxContextInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `PublicTxContext` to be created by this mutation. */
  publicTxContext: PublicTxContextInput;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deletePmmBigmapClearById` mutation. */
export type DeletePmmBigmapClearByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmBigmapClear` mutation. */
export type DeletePmmBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmBigmapClear` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageById` mutation. */
export type DeletePmmStorageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa2ById` mutation. */
export type DeletePmmStorageFa2ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa2` mutation. */
export type DeletePmmStorageFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageFa2LiveById` mutation. */
export type DeletePmmStorageFa2LiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa2Live` mutation. */
export type DeletePmmStorageFa2LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2Live` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageFa2OrderedById` mutation. */
export type DeletePmmStorageFa2OrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa2Ordered` mutation. */
export type DeletePmmStorageFa2OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2Ordered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageFa12ById` mutation. */
export type DeletePmmStorageFa12ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa12` mutation. */
export type DeletePmmStorageFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageFa12LiveById` mutation. */
export type DeletePmmStorageFa12LiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa12Live` mutation. */
export type DeletePmmStorageFa12LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12Live` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageFa12OrderedById` mutation. */
export type DeletePmmStorageFa12OrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageFa12Ordered` mutation. */
export type DeletePmmStorageFa12OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12Ordered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorage` mutation. */
export type DeletePmmStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLambdaMapById` mutation. */
export type DeletePmmStorageLambdaMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLambdaMap` mutation. */
export type DeletePmmStorageLambdaMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLambdaMapLiveById` mutation. */
export type DeletePmmStorageLambdaMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLambdaMapLive` mutation. */
export type DeletePmmStorageLambdaMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMapLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLambdaMapOrderedById` mutation. */
export type DeletePmmStorageLambdaMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLambdaMapOrdered` mutation. */
export type DeletePmmStorageLambdaMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMapOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLedgerMapById` mutation. */
export type DeletePmmStorageLedgerMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLedgerMap` mutation. */
export type DeletePmmStorageLedgerMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLedgerMapLiveById` mutation. */
export type DeletePmmStorageLedgerMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLedgerMapLive` mutation. */
export type DeletePmmStorageLedgerMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMapLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLedgerMapOrderedById` mutation. */
export type DeletePmmStorageLedgerMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLedgerMapOrdered` mutation. */
export type DeletePmmStorageLedgerMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMapOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapBetById` mutation. */
export type DeletePmmStorageLiquidityProviderMapBetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapBet` mutation. */
export type DeletePmmStorageLiquidityProviderMapBetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapBet` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapById` mutation. */
export type DeletePmmStorageLiquidityProviderMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLiquidityProviderMap` mutation. */
export type DeletePmmStorageLiquidityProviderMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtById` mutation. */
export type DeletePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` mutation. */
export type DeletePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /**
   * The globally unique `ID` which will identify a single
   * `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` to be deleted.
   */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapLiveById` mutation. */
export type DeletePmmStorageLiquidityProviderMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapLive` mutation. */
export type DeletePmmStorageLiquidityProviderMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapOrderedById` mutation. */
export type DeletePmmStorageLiquidityProviderMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLiquidityProviderMapOrdered` mutation. */
export type DeletePmmStorageLiquidityProviderMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageLiveById` mutation. */
export type DeletePmmStorageLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageLive` mutation. */
export type DeletePmmStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapAuctionrunningById` mutation. */
export type DeletePmmStorageMarketMapAuctionrunningByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapAuctionrunning` mutation. */
export type DeletePmmStorageMarketMapAuctionrunningInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapAuctionrunning` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapById` mutation. */
export type DeletePmmStorageMarketMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapFa2ById` mutation. */
export type DeletePmmStorageMarketMapFa2ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapFa2` mutation. */
export type DeletePmmStorageMarketMapFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapFa2` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapFa12ById` mutation. */
export type DeletePmmStorageMarketMapFa12ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapFa12` mutation. */
export type DeletePmmStorageMarketMapFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapFa12` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMap` mutation. */
export type DeletePmmStorageMarketMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapLiveById` mutation. */
export type DeletePmmStorageMarketMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapLive` mutation. */
export type DeletePmmStorageMarketMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapMarketbootstrappedById` mutation. */
export type DeletePmmStorageMarketMapMarketbootstrappedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapMarketbootstrapped` mutation. */
export type DeletePmmStorageMarketMapMarketbootstrappedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapMarketbootstrapped` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageMarketMapOrderedById` mutation. */
export type DeletePmmStorageMarketMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageMarketMapOrdered` mutation. */
export type DeletePmmStorageMarketMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageOrderedById` mutation. */
export type DeletePmmStorageOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageOrdered` mutation. */
export type DeletePmmStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageSupplyMapById` mutation. */
export type DeletePmmStorageSupplyMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageSupplyMap` mutation. */
export type DeletePmmStorageSupplyMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageSupplyMapLiveById` mutation. */
export type DeletePmmStorageSupplyMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageSupplyMapLive` mutation. */
export type DeletePmmStorageSupplyMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMapLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmStorageSupplyMapOrderedById` mutation. */
export type DeletePmmStorageSupplyMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmStorageSupplyMapOrdered` mutation. */
export type DeletePmmStorageSupplyMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMapOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenBigmapClearById` mutation. */
export type DeletePmmTokenBigmapClearByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenBigmapClear` mutation. */
export type DeletePmmTokenBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenBigmapClear` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageBalanceById` mutation. */
export type DeletePmmTokenStorageBalanceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageBalance` mutation. */
export type DeletePmmTokenStorageBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalance` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageBalancesApprovalById` mutation. */
export type DeletePmmTokenStorageBalancesApprovalByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageBalancesApproval` mutation. */
export type DeletePmmTokenStorageBalancesApprovalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesApproval` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageBalancesLiveById` mutation. */
export type DeletePmmTokenStorageBalancesLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageBalancesLive` mutation. */
export type DeletePmmTokenStorageBalancesLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageBalancesOrderedById` mutation. */
export type DeletePmmTokenStorageBalancesOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageBalancesOrdered` mutation. */
export type DeletePmmTokenStorageBalancesOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageById` mutation. */
export type DeletePmmTokenStorageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorage` mutation. */
export type DeletePmmTokenStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageLiveById` mutation. */
export type DeletePmmTokenStorageLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageLive` mutation. */
export type DeletePmmTokenStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageMetadataLiveById` mutation. */
export type DeletePmmTokenStorageMetadataLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageMetadataLive` mutation. */
export type DeletePmmTokenStorageMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadataLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageMetadataOrderedById` mutation. */
export type DeletePmmTokenStorageMetadataOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageMetadataOrdered` mutation. */
export type DeletePmmTokenStorageMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadataOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageMetadatumById` mutation. */
export type DeletePmmTokenStorageMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageMetadatum` mutation. */
export type DeletePmmTokenStorageMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadatum` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageOrderedById` mutation. */
export type DeletePmmTokenStorageOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageOrdered` mutation. */
export type DeletePmmTokenStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataLiveById` mutation. */
export type DeletePmmTokenStorageTokenMetadataLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataLive` mutation. */
export type DeletePmmTokenStorageTokenMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataLive` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataOrderedById` mutation. */
export type DeletePmmTokenStorageTokenMetadataOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataOrdered` mutation. */
export type DeletePmmTokenStorageTokenMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataOrdered` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataTokenInfoById` mutation. */
export type DeletePmmTokenStorageTokenMetadataTokenInfoByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageTokenMetadataTokenInfo` mutation. */
export type DeletePmmTokenStorageTokenMetadataTokenInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataTokenInfo` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePmmTokenStorageTokenMetadatumById` mutation. */
export type DeletePmmTokenStorageTokenMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePmmTokenStorageTokenMetadatum` mutation. */
export type DeletePmmTokenStorageTokenMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadatum` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicBigmapKeyByBigmapIdAndTxContextIdAndKeyhash` mutation. */
export type DeletePublicBigmapKeyByBigmapIdAndTxContextIdAndKeyhashInput = {
  bigmapId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  keyhash: Scalars['String'];
  txContextId: Scalars['BigInt'];
};

/** All input for the `deletePublicBigmapKey` mutation. */
export type DeletePublicBigmapKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicBigmapKey` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicContractByAddress` mutation. */
export type DeletePublicContractByAddressInput = {
  address: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
};

/** All input for the `deletePublicContractByName` mutation. */
export type DeletePublicContractByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deletePublicContractDepByLevelAndSrcContractAndDestSchema` mutation. */
export type DeletePublicContractDepByLevelAndSrcContractAndDestSchemaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  destSchema: Scalars['String'];
  level: Scalars['Int'];
  srcContract: Scalars['String'];
};

/** All input for the `deletePublicContractDep` mutation. */
export type DeletePublicContractDepInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContractDep` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicContract` mutation. */
export type DeletePublicContractInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContract` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicContractLevelByContractAndLevel` mutation. */
export type DeletePublicContractLevelByContractAndLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  contract: Scalars['String'];
  level: Scalars['Int'];
};

/** All input for the `deletePublicContractLevel` mutation. */
export type DeletePublicContractLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContractLevel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicLevelByLevel` mutation. */
export type DeletePublicLevelByLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  level: Scalars['Int'];
};

/** All input for the `deletePublicLevel` mutation. */
export type DeletePublicLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicLevel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePublicTxContextById` mutation. */
export type DeletePublicTxContextByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** All input for the `deletePublicTxContext` mutation. */
export type DeletePublicTxContextInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicTxContext` to be deleted. */
  nodeId: Scalars['ID'];
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['Int']>>;
};

/**
 * A condition to be used against `PmmBigmapClear` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmBigmapClearCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmBigmapClear` object types. All fields are combined with a logical ‘and.’ */
export type PmmBigmapClearFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmBigmapClearFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmBigmapClearFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmBigmapClearFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmBigmapClear` */
export type PmmBigmapClearInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmBigmapClear`. Fields that are set will be updated. */
export type PmmBigmapClearPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmBigmapClear`. */
export enum PmmBigmapClearsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorage` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PmmStorageCondition = {
  /** Checks for equality with the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmStorageFa2` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa2Condition = {
  /** Checks for equality with the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa2` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa2Filter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa2Filter>>;
  /** Filter by the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<StringFilter>;
  /** Filter by the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa2Filter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa2Filter>>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa2` */
export type PmmStorageFa2Input = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageFa2Live` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa2LiveCondition = {
  /** Checks for equality with the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa2Live` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa2LiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa2LiveFilter>>;
  /** Filter by the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<StringFilter>;
  /** Filter by the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa2LiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa2LiveFilter>>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa2Live` */
export type PmmStorageFa2LiveInput = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageFa2Live`. Fields that are set will be updated. */
export type PmmStorageFa2LivePatch = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa2Live`. */
export enum PmmStorageFa2LivesOrderBy {
  Fa2TokenAddressAsc = 'FA2_TOKEN_ADDRESS_ASC',
  Fa2TokenAddressDesc = 'FA2_TOKEN_ADDRESS_DESC',
  Fa2TokenIdAsc = 'FA2_TOKEN_ID_ASC',
  Fa2TokenIdDesc = 'FA2_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa2ByIdFa2TokenAddressAsc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ADDRESS_ASC',
  PmmStorageFa2ByIdFa2TokenAddressDesc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ADDRESS_DESC',
  PmmStorageFa2ByIdFa2TokenIdAsc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ID_ASC',
  PmmStorageFa2ByIdFa2TokenIdDesc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ID_DESC',
  PmmStorageFa2ByIdIdAsc = 'PMM_STORAGE_FA2_BY_ID__ID_ASC',
  PmmStorageFa2ByIdIdDesc = 'PMM_STORAGE_FA2_BY_ID__ID_DESC',
  PmmStorageFa2ByIdStorageIdAsc = 'PMM_STORAGE_FA2_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa2ByIdStorageIdDesc = 'PMM_STORAGE_FA2_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa2ByIdTxContextIdAsc = 'PMM_STORAGE_FA2_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa2ByIdTxContextIdDesc = 'PMM_STORAGE_FA2_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageFa2Ordered` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa2OrderedCondition = {
  /** Checks for equality with the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa2Ordered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa2OrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa2OrderedFilter>>;
  /** Filter by the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<StringFilter>;
  /** Filter by the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa2OrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa2OrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa2Ordered` */
export type PmmStorageFa2OrderedInput = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageFa2Ordered`. Fields that are set will be updated. */
export type PmmStorageFa2OrderedPatch = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa2Ordered`. */
export enum PmmStorageFa2OrderedsOrderBy {
  Fa2TokenAddressAsc = 'FA2_TOKEN_ADDRESS_ASC',
  Fa2TokenAddressDesc = 'FA2_TOKEN_ADDRESS_DESC',
  Fa2TokenIdAsc = 'FA2_TOKEN_ID_ASC',
  Fa2TokenIdDesc = 'FA2_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa2ByIdFa2TokenAddressAsc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ADDRESS_ASC',
  PmmStorageFa2ByIdFa2TokenAddressDesc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ADDRESS_DESC',
  PmmStorageFa2ByIdFa2TokenIdAsc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ID_ASC',
  PmmStorageFa2ByIdFa2TokenIdDesc = 'PMM_STORAGE_FA2_BY_ID__FA2_TOKEN_ID_DESC',
  PmmStorageFa2ByIdIdAsc = 'PMM_STORAGE_FA2_BY_ID__ID_ASC',
  PmmStorageFa2ByIdIdDesc = 'PMM_STORAGE_FA2_BY_ID__ID_DESC',
  PmmStorageFa2ByIdStorageIdAsc = 'PMM_STORAGE_FA2_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa2ByIdStorageIdDesc = 'PMM_STORAGE_FA2_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa2ByIdTxContextIdAsc = 'PMM_STORAGE_FA2_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa2ByIdTxContextIdDesc = 'PMM_STORAGE_FA2_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageFa2`. Fields that are set will be updated. */
export type PmmStorageFa2Patch = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa2`. */
export enum PmmStorageFa2SOrderBy {
  Fa2TokenAddressAsc = 'FA2_TOKEN_ADDRESS_ASC',
  Fa2TokenAddressDesc = 'FA2_TOKEN_ADDRESS_DESC',
  Fa2TokenIdAsc = 'FA2_TOKEN_ID_ASC',
  Fa2TokenIdDesc = 'FA2_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa2LiveByIdFa2TokenAddressAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__FA2_TOKEN_ADDRESS_ASC',
  PmmStorageFa2LiveByIdFa2TokenAddressDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__FA2_TOKEN_ADDRESS_DESC',
  PmmStorageFa2LiveByIdFa2TokenIdAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__FA2_TOKEN_ID_ASC',
  PmmStorageFa2LiveByIdFa2TokenIdDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__FA2_TOKEN_ID_DESC',
  PmmStorageFa2LiveByIdIdAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__ID_ASC',
  PmmStorageFa2LiveByIdIdDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__ID_DESC',
  PmmStorageFa2LiveByIdLevelAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageFa2LiveByIdLevelDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageFa2LiveByIdLevelTimestampAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageFa2LiveByIdLevelTimestampDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageFa2LiveByIdStorageIdAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa2LiveByIdStorageIdDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa2LiveByIdTxContextIdAsc = 'PMM_STORAGE_FA2_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa2LiveByIdTxContextIdDesc = 'PMM_STORAGE_FA2_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa2OrderedByIdFa2TokenAddressAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__FA2_TOKEN_ADDRESS_ASC',
  PmmStorageFa2OrderedByIdFa2TokenAddressDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__FA2_TOKEN_ADDRESS_DESC',
  PmmStorageFa2OrderedByIdFa2TokenIdAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__FA2_TOKEN_ID_ASC',
  PmmStorageFa2OrderedByIdFa2TokenIdDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__FA2_TOKEN_ID_DESC',
  PmmStorageFa2OrderedByIdIdAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__ID_ASC',
  PmmStorageFa2OrderedByIdIdDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__ID_DESC',
  PmmStorageFa2OrderedByIdLevelAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageFa2OrderedByIdLevelDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageFa2OrderedByIdLevelTimestampAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageFa2OrderedByIdLevelTimestampDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageFa2OrderedByIdOrderingAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageFa2OrderedByIdOrderingDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageFa2OrderedByIdStorageIdAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa2OrderedByIdStorageIdDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa2OrderedByIdTxContextIdAsc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa2OrderedByIdTxContextIdDesc = 'PMM_STORAGE_FA2_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageFa12` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa12Condition = {
  /** Checks for equality with the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa12` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa12Filter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa12Filter>>;
  /** Filter by the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa12Filter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa12Filter>>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa12` */
export type PmmStorageFa12Input = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageFa12Live` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa12LiveCondition = {
  /** Checks for equality with the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa12Live` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa12LiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa12LiveFilter>>;
  /** Filter by the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa12LiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa12LiveFilter>>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa12Live` */
export type PmmStorageFa12LiveInput = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageFa12Live`. Fields that are set will be updated. */
export type PmmStorageFa12LivePatch = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa12Live`. */
export enum PmmStorageFa12LivesOrderBy {
  CreateRestrictionsFa12Asc = 'CREATE_RESTRICTIONS_FA12_ASC',
  CreateRestrictionsFa12Desc = 'CREATE_RESTRICTIONS_FA12_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa12ByIdCreateRestrictionsFa12Asc = 'PMM_STORAGE_FA12_BY_ID__CREATE_RESTRICTIONS_FA12_ASC',
  PmmStorageFa12ByIdCreateRestrictionsFa12Desc = 'PMM_STORAGE_FA12_BY_ID__CREATE_RESTRICTIONS_FA12_DESC',
  PmmStorageFa12ByIdIdAsc = 'PMM_STORAGE_FA12_BY_ID__ID_ASC',
  PmmStorageFa12ByIdIdDesc = 'PMM_STORAGE_FA12_BY_ID__ID_DESC',
  PmmStorageFa12ByIdStorageIdAsc = 'PMM_STORAGE_FA12_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa12ByIdStorageIdDesc = 'PMM_STORAGE_FA12_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa12ByIdTxContextIdAsc = 'PMM_STORAGE_FA12_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa12ByIdTxContextIdDesc = 'PMM_STORAGE_FA12_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageFa12Ordered` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageFa12OrderedCondition = {
  /** Checks for equality with the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageFa12Ordered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFa12OrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFa12OrderedFilter>>;
  /** Filter by the object’s `createRestrictionsFa12` field. */
  createRestrictionsFa12: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFa12OrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFa12OrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `storageId` field. */
  storageId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageFa12Ordered` */
export type PmmStorageFa12OrderedInput = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageFa12Ordered`. Fields that are set will be updated. */
export type PmmStorageFa12OrderedPatch = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa12Ordered`. */
export enum PmmStorageFa12OrderedsOrderBy {
  CreateRestrictionsFa12Asc = 'CREATE_RESTRICTIONS_FA12_ASC',
  CreateRestrictionsFa12Desc = 'CREATE_RESTRICTIONS_FA12_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa12ByIdCreateRestrictionsFa12Asc = 'PMM_STORAGE_FA12_BY_ID__CREATE_RESTRICTIONS_FA12_ASC',
  PmmStorageFa12ByIdCreateRestrictionsFa12Desc = 'PMM_STORAGE_FA12_BY_ID__CREATE_RESTRICTIONS_FA12_DESC',
  PmmStorageFa12ByIdIdAsc = 'PMM_STORAGE_FA12_BY_ID__ID_ASC',
  PmmStorageFa12ByIdIdDesc = 'PMM_STORAGE_FA12_BY_ID__ID_DESC',
  PmmStorageFa12ByIdStorageIdAsc = 'PMM_STORAGE_FA12_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa12ByIdStorageIdDesc = 'PMM_STORAGE_FA12_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa12ByIdTxContextIdAsc = 'PMM_STORAGE_FA12_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa12ByIdTxContextIdDesc = 'PMM_STORAGE_FA12_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageFa12`. Fields that are set will be updated. */
export type PmmStorageFa12Patch = {
  createRestrictionsFa12: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  storageId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageFa12`. */
export enum PmmStorageFa12SOrderBy {
  CreateRestrictionsFa12Asc = 'CREATE_RESTRICTIONS_FA12_ASC',
  CreateRestrictionsFa12Desc = 'CREATE_RESTRICTIONS_FA12_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByStorageIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByStorageIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_STORAGE_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByStorageIdIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__ID_ASC',
  PmmStorageByStorageIdIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__ID_DESC',
  PmmStorageByStorageIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByStorageIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_STORAGE_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByStorageIdTxContextIdAsc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByStorageIdTxContextIdDesc = 'PMM_STORAGE_BY_STORAGE_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa12LiveByIdCreateRestrictionsFa12Asc = 'PMM_STORAGE_FA12_LIVE_BY_ID__CREATE_RESTRICTIONS_FA12_ASC',
  PmmStorageFa12LiveByIdCreateRestrictionsFa12Desc = 'PMM_STORAGE_FA12_LIVE_BY_ID__CREATE_RESTRICTIONS_FA12_DESC',
  PmmStorageFa12LiveByIdIdAsc = 'PMM_STORAGE_FA12_LIVE_BY_ID__ID_ASC',
  PmmStorageFa12LiveByIdIdDesc = 'PMM_STORAGE_FA12_LIVE_BY_ID__ID_DESC',
  PmmStorageFa12LiveByIdLevelAsc = 'PMM_STORAGE_FA12_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageFa12LiveByIdLevelDesc = 'PMM_STORAGE_FA12_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageFa12LiveByIdLevelTimestampAsc = 'PMM_STORAGE_FA12_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageFa12LiveByIdLevelTimestampDesc = 'PMM_STORAGE_FA12_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageFa12LiveByIdStorageIdAsc = 'PMM_STORAGE_FA12_LIVE_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa12LiveByIdStorageIdDesc = 'PMM_STORAGE_FA12_LIVE_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa12LiveByIdTxContextIdAsc = 'PMM_STORAGE_FA12_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa12LiveByIdTxContextIdDesc = 'PMM_STORAGE_FA12_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageFa12OrderedByIdCreateRestrictionsFa12Asc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__CREATE_RESTRICTIONS_FA12_ASC',
  PmmStorageFa12OrderedByIdCreateRestrictionsFa12Desc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__CREATE_RESTRICTIONS_FA12_DESC',
  PmmStorageFa12OrderedByIdIdAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__ID_ASC',
  PmmStorageFa12OrderedByIdIdDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__ID_DESC',
  PmmStorageFa12OrderedByIdLevelAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageFa12OrderedByIdLevelDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageFa12OrderedByIdLevelTimestampAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageFa12OrderedByIdLevelTimestampDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageFa12OrderedByIdOrderingAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageFa12OrderedByIdOrderingDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageFa12OrderedByIdStorageIdAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__STORAGE_ID_ASC',
  PmmStorageFa12OrderedByIdStorageIdDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__STORAGE_ID_DESC',
  PmmStorageFa12OrderedByIdTxContextIdAsc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageFa12OrderedByIdTxContextIdDesc = 'PMM_STORAGE_FA12_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** A filter to be used against `PmmStorage` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageFilter>>;
  /** Filter by the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<StringFilter>;
  /** Filter by the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorage` */
export type PmmStorageInput = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageLambdaMap` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLambdaMapCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLambdaMap` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLambdaMapFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLambdaMapFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLambdaMapFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLambdaMapFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLambdaMap` */
export type PmmStorageLambdaMapInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageLambdaMapLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLambdaMapLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLambdaMapLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLambdaMapLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLambdaMapLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLambdaMapLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLambdaMapLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLambdaMapLive` */
export type PmmStorageLambdaMapLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLambdaMapLive`. Fields that are set will be updated. */
export type PmmStorageLambdaMapLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLambdaMapLive`. */
export enum PmmStorageLambdaMapLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxLambdaRepositoryStringAsc = 'IDX_LAMBDA_REPOSITORY_STRING_ASC',
  IdxLambdaRepositoryStringDesc = 'IDX_LAMBDA_REPOSITORY_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageLambdaMapByIdBigmapIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLambdaMapByIdBigmapIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLambdaMapByIdDeletedAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__DELETED_ASC',
  PmmStorageLambdaMapByIdDeletedDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__DELETED_DESC',
  PmmStorageLambdaMapByIdIdxLambdaRepositoryStringAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_ASC',
  PmmStorageLambdaMapByIdIdxLambdaRepositoryStringDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_DESC',
  PmmStorageLambdaMapByIdIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__ID_ASC',
  PmmStorageLambdaMapByIdIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__ID_DESC',
  PmmStorageLambdaMapByIdTxContextIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLambdaMapByIdTxContextIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLambdaMapOrdered` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLambdaMapOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLambdaMapOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLambdaMapOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLambdaMapOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxLambdaRepositoryString` field. */
  idxLambdaRepositoryString: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLambdaMapOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLambdaMapOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLambdaMapOrdered` */
export type PmmStorageLambdaMapOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLambdaMapOrdered`. Fields that are set will be updated. */
export type PmmStorageLambdaMapOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLambdaMapOrdered`. */
export enum PmmStorageLambdaMapOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxLambdaRepositoryStringAsc = 'IDX_LAMBDA_REPOSITORY_STRING_ASC',
  IdxLambdaRepositoryStringDesc = 'IDX_LAMBDA_REPOSITORY_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageLambdaMapByIdBigmapIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLambdaMapByIdBigmapIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLambdaMapByIdDeletedAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__DELETED_ASC',
  PmmStorageLambdaMapByIdDeletedDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__DELETED_DESC',
  PmmStorageLambdaMapByIdIdxLambdaRepositoryStringAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_ASC',
  PmmStorageLambdaMapByIdIdxLambdaRepositoryStringDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_DESC',
  PmmStorageLambdaMapByIdIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__ID_ASC',
  PmmStorageLambdaMapByIdIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__ID_DESC',
  PmmStorageLambdaMapByIdTxContextIdAsc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLambdaMapByIdTxContextIdDesc = 'PMM_STORAGE_LAMBDA_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageLambdaMap`. Fields that are set will be updated. */
export type PmmStorageLambdaMapPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxLambdaRepositoryString: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLambdaMap`. */
export enum PmmStorageLambdaMapsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxLambdaRepositoryStringAsc = 'IDX_LAMBDA_REPOSITORY_STRING_ASC',
  IdxLambdaRepositoryStringDesc = 'IDX_LAMBDA_REPOSITORY_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageLambdaMapLiveByIdBigmapIdAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLambdaMapLiveByIdBigmapIdDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLambdaMapLiveByIdIdxLambdaRepositoryStringAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_ASC',
  PmmStorageLambdaMapLiveByIdIdxLambdaRepositoryStringDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_DESC',
  PmmStorageLambdaMapLiveByIdIdAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__ID_ASC',
  PmmStorageLambdaMapLiveByIdIdDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__ID_DESC',
  PmmStorageLambdaMapLiveByIdLevelAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageLambdaMapLiveByIdLevelDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageLambdaMapLiveByIdLevelTimestampAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLambdaMapLiveByIdLevelTimestampDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLambdaMapLiveByIdTxContextIdAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLambdaMapLiveByIdTxContextIdDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageLambdaMapOrderedByIdDeletedAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__DELETED_ASC',
  PmmStorageLambdaMapOrderedByIdDeletedDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__DELETED_DESC',
  PmmStorageLambdaMapOrderedByIdIdxLambdaRepositoryStringAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_ASC',
  PmmStorageLambdaMapOrderedByIdIdxLambdaRepositoryStringDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__IDX_LAMBDA_REPOSITORY_STRING_DESC',
  PmmStorageLambdaMapOrderedByIdIdAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__ID_ASC',
  PmmStorageLambdaMapOrderedByIdIdDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__ID_DESC',
  PmmStorageLambdaMapOrderedByIdLevelAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageLambdaMapOrderedByIdLevelDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageLambdaMapOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLambdaMapOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLambdaMapOrderedByIdOrderingAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageLambdaMapOrderedByIdOrderingDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageLambdaMapOrderedByIdTxContextIdAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLambdaMapOrderedByIdTxContextIdDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLedgerMap` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLedgerMapCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensNat` field. */
  tokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLedgerMap` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLedgerMapFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLedgerMapFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<StringFilter>;
  /** Filter by the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLedgerMapFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLedgerMapFilter>>;
  /** Filter by the object’s `tokensNat` field. */
  tokensNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLedgerMap` */
export type PmmStorageLedgerMapInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageLedgerMapLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLedgerMapLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `tokensNat` field. */
  tokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLedgerMapLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLedgerMapLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLedgerMapLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<StringFilter>;
  /** Filter by the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLedgerMapLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLedgerMapLiveFilter>>;
  /** Filter by the object’s `tokensNat` field. */
  tokensNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLedgerMapLive` */
export type PmmStorageLedgerMapLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLedgerMapLive`. Fields that are set will be updated. */
export type PmmStorageLedgerMapLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLedgerMapLive`. */
export enum PmmStorageLedgerMapLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxTokensOwnerAsc = 'IDX_TOKENS_OWNER_ASC',
  IdxTokensOwnerDesc = 'IDX_TOKENS_OWNER_DESC',
  IdxTokensTokenIdAsc = 'IDX_TOKENS_TOKEN_ID_ASC',
  IdxTokensTokenIdDesc = 'IDX_TOKENS_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageLedgerMapByIdBigmapIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLedgerMapByIdBigmapIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLedgerMapByIdDeletedAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__DELETED_ASC',
  PmmStorageLedgerMapByIdDeletedDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__DELETED_DESC',
  PmmStorageLedgerMapByIdIdxTokensOwnerAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_OWNER_ASC',
  PmmStorageLedgerMapByIdIdxTokensOwnerDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_OWNER_DESC',
  PmmStorageLedgerMapByIdIdxTokensTokenIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_TOKEN_ID_ASC',
  PmmStorageLedgerMapByIdIdxTokensTokenIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_TOKEN_ID_DESC',
  PmmStorageLedgerMapByIdIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__ID_ASC',
  PmmStorageLedgerMapByIdIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__ID_DESC',
  PmmStorageLedgerMapByIdTokensNatAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TOKENS_NAT_ASC',
  PmmStorageLedgerMapByIdTokensNatDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TOKENS_NAT_DESC',
  PmmStorageLedgerMapByIdTxContextIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLedgerMapByIdTxContextIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensNatAsc = 'TOKENS_NAT_ASC',
  TokensNatDesc = 'TOKENS_NAT_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLedgerMapOrdered` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLedgerMapOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensNat` field. */
  tokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLedgerMapOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLedgerMapOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLedgerMapOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensOwner` field. */
  idxTokensOwner: Maybe<StringFilter>;
  /** Filter by the object’s `idxTokensTokenId` field. */
  idxTokensTokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLedgerMapOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLedgerMapOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokensNat` field. */
  tokensNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLedgerMapOrdered` */
export type PmmStorageLedgerMapOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLedgerMapOrdered`. Fields that are set will be updated. */
export type PmmStorageLedgerMapOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLedgerMapOrdered`. */
export enum PmmStorageLedgerMapOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxTokensOwnerAsc = 'IDX_TOKENS_OWNER_ASC',
  IdxTokensOwnerDesc = 'IDX_TOKENS_OWNER_DESC',
  IdxTokensTokenIdAsc = 'IDX_TOKENS_TOKEN_ID_ASC',
  IdxTokensTokenIdDesc = 'IDX_TOKENS_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageLedgerMapByIdBigmapIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLedgerMapByIdBigmapIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLedgerMapByIdDeletedAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__DELETED_ASC',
  PmmStorageLedgerMapByIdDeletedDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__DELETED_DESC',
  PmmStorageLedgerMapByIdIdxTokensOwnerAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_OWNER_ASC',
  PmmStorageLedgerMapByIdIdxTokensOwnerDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_OWNER_DESC',
  PmmStorageLedgerMapByIdIdxTokensTokenIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_TOKEN_ID_ASC',
  PmmStorageLedgerMapByIdIdxTokensTokenIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__IDX_TOKENS_TOKEN_ID_DESC',
  PmmStorageLedgerMapByIdIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__ID_ASC',
  PmmStorageLedgerMapByIdIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__ID_DESC',
  PmmStorageLedgerMapByIdTokensNatAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TOKENS_NAT_ASC',
  PmmStorageLedgerMapByIdTokensNatDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TOKENS_NAT_DESC',
  PmmStorageLedgerMapByIdTxContextIdAsc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLedgerMapByIdTxContextIdDesc = 'PMM_STORAGE_LEDGER_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensNatAsc = 'TOKENS_NAT_ASC',
  TokensNatDesc = 'TOKENS_NAT_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageLedgerMap`. Fields that are set will be updated. */
export type PmmStorageLedgerMapPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensOwner: Maybe<Scalars['String']>;
  idxTokensTokenId: Maybe<Scalars['BigFloat']>;
  tokensNat: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLedgerMap`. */
export enum PmmStorageLedgerMapsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxTokensOwnerAsc = 'IDX_TOKENS_OWNER_ASC',
  IdxTokensOwnerDesc = 'IDX_TOKENS_OWNER_DESC',
  IdxTokensTokenIdAsc = 'IDX_TOKENS_TOKEN_ID_ASC',
  IdxTokensTokenIdDesc = 'IDX_TOKENS_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageLedgerMapLiveByIdBigmapIdAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLedgerMapLiveByIdBigmapIdDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLedgerMapLiveByIdIdxTokensOwnerAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__IDX_TOKENS_OWNER_ASC',
  PmmStorageLedgerMapLiveByIdIdxTokensOwnerDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__IDX_TOKENS_OWNER_DESC',
  PmmStorageLedgerMapLiveByIdIdxTokensTokenIdAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__IDX_TOKENS_TOKEN_ID_ASC',
  PmmStorageLedgerMapLiveByIdIdxTokensTokenIdDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__IDX_TOKENS_TOKEN_ID_DESC',
  PmmStorageLedgerMapLiveByIdIdAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__ID_ASC',
  PmmStorageLedgerMapLiveByIdIdDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__ID_DESC',
  PmmStorageLedgerMapLiveByIdLevelAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageLedgerMapLiveByIdLevelDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageLedgerMapLiveByIdLevelTimestampAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLedgerMapLiveByIdLevelTimestampDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLedgerMapLiveByIdTokensNatAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__TOKENS_NAT_ASC',
  PmmStorageLedgerMapLiveByIdTokensNatDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__TOKENS_NAT_DESC',
  PmmStorageLedgerMapLiveByIdTxContextIdAsc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLedgerMapLiveByIdTxContextIdDesc = 'PMM_STORAGE_LEDGER_MAP_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageLedgerMapOrderedByIdDeletedAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__DELETED_ASC',
  PmmStorageLedgerMapOrderedByIdDeletedDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__DELETED_DESC',
  PmmStorageLedgerMapOrderedByIdIdxTokensOwnerAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__IDX_TOKENS_OWNER_ASC',
  PmmStorageLedgerMapOrderedByIdIdxTokensOwnerDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__IDX_TOKENS_OWNER_DESC',
  PmmStorageLedgerMapOrderedByIdIdxTokensTokenIdAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__IDX_TOKENS_TOKEN_ID_ASC',
  PmmStorageLedgerMapOrderedByIdIdxTokensTokenIdDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__IDX_TOKENS_TOKEN_ID_DESC',
  PmmStorageLedgerMapOrderedByIdIdAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__ID_ASC',
  PmmStorageLedgerMapOrderedByIdIdDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__ID_DESC',
  PmmStorageLedgerMapOrderedByIdLevelAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageLedgerMapOrderedByIdLevelDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageLedgerMapOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLedgerMapOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLedgerMapOrderedByIdOrderingAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageLedgerMapOrderedByIdOrderingDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageLedgerMapOrderedByIdTokensNatAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__TOKENS_NAT_ASC',
  PmmStorageLedgerMapOrderedByIdTokensNatDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__TOKENS_NAT_DESC',
  PmmStorageLedgerMapOrderedByIdTxContextIdAsc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLedgerMapOrderedByIdTxContextIdDesc = 'PMM_STORAGE_LEDGER_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensNatAsc = 'TOKENS_NAT_ASC',
  TokensNatDesc = 'TOKENS_NAT_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLiquidityProviderMapBet` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiquidityProviderMapBetCondition = {
  /** Checks for equality with the object’s `betPredictedProbability` field. */
  betPredictedProbability: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `betQuantity` field. */
  betQuantity: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageLiquidityProviderMapId` field. */
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLiquidityProviderMapBet` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiquidityProviderMapBetFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiquidityProviderMapBetFilter>>;
  /** Filter by the object’s `betPredictedProbability` field. */
  betPredictedProbability: Maybe<BigFloatFilter>;
  /** Filter by the object’s `betQuantity` field. */
  betQuantity: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiquidityProviderMapBetFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiquidityProviderMapBetFilter>>;
  /** Filter by the object’s `storageLiquidityProviderMapId` field. */
  storageLiquidityProviderMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLiquidityProviderMapBet` */
export type PmmStorageLiquidityProviderMapBetInput = {
  betPredictedProbability: Maybe<Scalars['BigFloat']>;
  betQuantity: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLiquidityProviderMapBet`. Fields that are set will be updated. */
export type PmmStorageLiquidityProviderMapBetPatch = {
  betPredictedProbability: Maybe<Scalars['BigFloat']>;
  betQuantity: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLiquidityProviderMapBet`. */
export enum PmmStorageLiquidityProviderMapBetsOrderBy {
  BetPredictedProbabilityAsc = 'BET_PREDICTED_PROBABILITY_ASC',
  BetPredictedProbabilityDesc = 'BET_PREDICTED_PROBABILITY_DESC',
  BetQuantityAsc = 'BET_QUANTITY_ASC',
  BetQuantityDesc = 'BET_QUANTITY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdBigmapIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdBigmapIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdDeletedAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__DELETED_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdDeletedDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__DELETED_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageLiquidityProviderMapIdAsc = 'STORAGE_LIQUIDITY_PROVIDER_MAP_ID_ASC',
  StorageLiquidityProviderMapIdDesc = 'STORAGE_LIQUIDITY_PROVIDER_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLiquidityProviderMap` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiquidityProviderMapCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `marketsNoname` field. */
  marketsNoname: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLiquidityProviderMap` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiquidityProviderMapFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiquidityProviderMapFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<StringFilter>;
  /** Filter by the object’s `marketsNoname` field. */
  marketsNoname: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiquidityProviderMapFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiquidityProviderMapFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLiquidityProviderMap` */
export type PmmStorageLiquidityProviderMapInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  marketsNoname: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against
 * `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtCondition = {
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `marketsLiquidityRewardUpdatedAt` field. */
  marketsLiquidityRewardUpdatedAt: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `storageLiquidityProviderMapId` field. */
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtFilter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `marketsLiquidityRewardUpdatedAt` field. */
  marketsLiquidityRewardUpdatedAt: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtFilter>>;
  /** Filter by the object’s `storageLiquidityProviderMapId` field. */
  storageLiquidityProviderMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` */
export type PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtInput = {
  id: Maybe<Scalars['BigInt']>;
  marketsLiquidityRewardUpdatedAt: Maybe<Scalars['BigFloat']>;
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt`. Fields that are set will be updated. */
export type PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtPatch = {
  id: Maybe<Scalars['BigInt']>;
  marketsLiquidityRewardUpdatedAt: Maybe<Scalars['BigFloat']>;
  storageLiquidityProviderMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt`. */
export enum PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MarketsLiquidityRewardUpdatedAtAsc = 'MARKETS_LIQUIDITY_REWARD_UPDATED_AT_ASC',
  MarketsLiquidityRewardUpdatedAtDesc = 'MARKETS_LIQUIDITY_REWARD_UPDATED_AT_DESC',
  Natural = 'NATURAL',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdBigmapIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdBigmapIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdDeletedAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__DELETED_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdDeletedDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__DELETED_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__ID_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapByStorageLiquidityProviderMapIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageLiquidityProviderMapIdAsc = 'STORAGE_LIQUIDITY_PROVIDER_MAP_ID_ASC',
  StorageLiquidityProviderMapIdDesc = 'STORAGE_LIQUIDITY_PROVIDER_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLiquidityProviderMapLive` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiquidityProviderMapLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `marketsNoname` field. */
  marketsNoname: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLiquidityProviderMapLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiquidityProviderMapLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiquidityProviderMapLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Filter by the object’s `marketsNoname` field. */
  marketsNoname: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiquidityProviderMapLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiquidityProviderMapLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLiquidityProviderMapLive` */
export type PmmStorageLiquidityProviderMapLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsNoname: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLiquidityProviderMapLive`. Fields that are set will be updated. */
export type PmmStorageLiquidityProviderMapLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsNoname: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLiquidityProviderMapLive`. */
export enum PmmStorageLiquidityProviderMapLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxMarketsMarketIdAsc = 'IDX_MARKETS_MARKET_ID_ASC',
  IdxMarketsMarketIdDesc = 'IDX_MARKETS_MARKET_ID_DESC',
  IdxMarketsOriginatorAsc = 'IDX_MARKETS_ORIGINATOR_ASC',
  IdxMarketsOriginatorDesc = 'IDX_MARKETS_ORIGINATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  MarketsNonameAsc = 'MARKETS_NONAME_ASC',
  MarketsNonameDesc = 'MARKETS_NONAME_DESC',
  Natural = 'NATURAL',
  PmmStorageLiquidityProviderMapByIdBigmapIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLiquidityProviderMapByIdBigmapIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLiquidityProviderMapByIdDeletedAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__DELETED_ASC',
  PmmStorageLiquidityProviderMapByIdDeletedDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__DELETED_DESC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapByIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__ID_ASC',
  PmmStorageLiquidityProviderMapByIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__ID_DESC',
  PmmStorageLiquidityProviderMapByIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapByIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapByIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapByIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLiquidityProviderMapOrdered` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiquidityProviderMapOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `marketsNoname` field. */
  marketsNoname: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLiquidityProviderMapOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiquidityProviderMapOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiquidityProviderMapOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsMarketId` field. */
  idxMarketsMarketId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `idxMarketsOriginator` field. */
  idxMarketsOriginator: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Filter by the object’s `marketsNoname` field. */
  marketsNoname: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiquidityProviderMapOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiquidityProviderMapOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLiquidityProviderMapOrdered` */
export type PmmStorageLiquidityProviderMapOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsNoname: Maybe<Scalars['String']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLiquidityProviderMapOrdered`. Fields that are set will be updated. */
export type PmmStorageLiquidityProviderMapOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsNoname: Maybe<Scalars['String']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLiquidityProviderMapOrdered`. */
export enum PmmStorageLiquidityProviderMapOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxMarketsMarketIdAsc = 'IDX_MARKETS_MARKET_ID_ASC',
  IdxMarketsMarketIdDesc = 'IDX_MARKETS_MARKET_ID_DESC',
  IdxMarketsOriginatorAsc = 'IDX_MARKETS_ORIGINATOR_ASC',
  IdxMarketsOriginatorDesc = 'IDX_MARKETS_ORIGINATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  MarketsNonameAsc = 'MARKETS_NONAME_ASC',
  MarketsNonameDesc = 'MARKETS_NONAME_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageLiquidityProviderMapByIdBigmapIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLiquidityProviderMapByIdBigmapIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLiquidityProviderMapByIdDeletedAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__DELETED_ASC',
  PmmStorageLiquidityProviderMapByIdDeletedDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__DELETED_DESC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapByIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapByIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__ID_ASC',
  PmmStorageLiquidityProviderMapByIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__ID_DESC',
  PmmStorageLiquidityProviderMapByIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapByIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapByIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapByIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageLiquidityProviderMap`. Fields that are set will be updated. */
export type PmmStorageLiquidityProviderMapPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsMarketId: Maybe<Scalars['BigFloat']>;
  idxMarketsOriginator: Maybe<Scalars['String']>;
  marketsNoname: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLiquidityProviderMap`. */
export enum PmmStorageLiquidityProviderMapsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxMarketsMarketIdAsc = 'IDX_MARKETS_MARKET_ID_ASC',
  IdxMarketsMarketIdDesc = 'IDX_MARKETS_MARKET_ID_DESC',
  IdxMarketsOriginatorAsc = 'IDX_MARKETS_ORIGINATOR_ASC',
  IdxMarketsOriginatorDesc = 'IDX_MARKETS_ORIGINATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MarketsNonameAsc = 'MARKETS_NONAME_ASC',
  MarketsNonameDesc = 'MARKETS_NONAME_DESC',
  Natural = 'NATURAL',
  PmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BETS_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BETS_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtsByStorageLiquidityProviderMapIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIQUIDITY_REWARD_UPDATED_ATS_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtsByStorageLiquidityProviderMapIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIQUIDITY_REWARD_UPDATED_ATS_BY_STORAGE_LIQUIDITY_PROVIDER_MAP_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapLiveByIdBigmapIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmStorageLiquidityProviderMapLiveByIdBigmapIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmStorageLiquidityProviderMapLiveByIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapLiveByIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapLiveByIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapLiveByIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapLiveByIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__ID_ASC',
  PmmStorageLiquidityProviderMapLiveByIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__ID_DESC',
  PmmStorageLiquidityProviderMapLiveByIdLevelAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageLiquidityProviderMapLiveByIdLevelDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageLiquidityProviderMapLiveByIdLevelTimestampAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLiquidityProviderMapLiveByIdLevelTimestampDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLiquidityProviderMapLiveByIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapLiveByIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapLiveByIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapLiveByIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdDeletedAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__DELETED_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdDeletedDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__DELETED_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdIdxMarketsMarketIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__IDX_MARKETS_MARKET_ID_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdIdxMarketsMarketIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__IDX_MARKETS_MARKET_ID_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdIdxMarketsOriginatorAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__IDX_MARKETS_ORIGINATOR_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdIdxMarketsOriginatorDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__IDX_MARKETS_ORIGINATOR_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__ID_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__ID_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdLevelAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdLevelDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdMarketsNonameAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__MARKETS_NONAME_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdMarketsNonameDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__MARKETS_NONAME_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdOrderingAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdOrderingDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageLiquidityProviderMapOrderedByIdTxContextIdAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiquidityProviderMapOrderedByIdTxContextIdDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageLive` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageLiveCondition = {
  /** Checks for equality with the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageLiveFilter>>;
  /** Filter by the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<StringFilter>;
  /** Filter by the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageLive` */
export type PmmStorageLiveInput = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageLive`. Fields that are set will be updated. */
export type PmmStorageLivePatch = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageLive`. */
export enum PmmStorageLivesOrderBy {
  CreateRestrictionsCreatorAddressAsc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  CreateRestrictionsCreatorAddressDesc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  CreateRestrictionsCurrencyAsc = 'CREATE_RESTRICTIONS_CURRENCY_ASC',
  CreateRestrictionsCurrencyDesc = 'CREATE_RESTRICTIONS_CURRENCY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LambdaRepositoryCreatorAsc = 'LAMBDA_REPOSITORY_CREATOR_ASC',
  LambdaRepositoryCreatorDesc = 'LAMBDA_REPOSITORY_CREATOR_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageByIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByIdIdAsc = 'PMM_STORAGE_BY_ID__ID_ASC',
  PmmStorageByIdIdDesc = 'PMM_STORAGE_BY_ID__ID_DESC',
  PmmStorageByIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByIdTxContextIdAsc = 'PMM_STORAGE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByIdTxContextIdDesc = 'PMM_STORAGE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageMarketMapAuctionrunning` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapAuctionrunningCondition = {
  /** Checks for equality with the object’s `auctionRunningAuctionPeriodEnd` field. */
  auctionRunningAuctionPeriodEnd: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `auctionRunningQuantity` field. */
  auctionRunningQuantity: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `auctionRunningUniswapContribution` field. */
  auctionRunningUniswapContribution: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `auctionRunningYesPreference` field. */
  auctionRunningYesPreference: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapAuctionrunning` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapAuctionrunningFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapAuctionrunningFilter>>;
  /** Filter by the object’s `auctionRunningAuctionPeriodEnd` field. */
  auctionRunningAuctionPeriodEnd: Maybe<DatetimeFilter>;
  /** Filter by the object’s `auctionRunningQuantity` field. */
  auctionRunningQuantity: Maybe<BigFloatFilter>;
  /** Filter by the object’s `auctionRunningUniswapContribution` field. */
  auctionRunningUniswapContribution: Maybe<BigFloatFilter>;
  /** Filter by the object’s `auctionRunningYesPreference` field. */
  auctionRunningYesPreference: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapAuctionrunningFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapAuctionrunningFilter>>;
  /** Filter by the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapAuctionrunning` */
export type PmmStorageMarketMapAuctionrunningInput = {
  auctionRunningAuctionPeriodEnd: Maybe<Scalars['Datetime']>;
  auctionRunningQuantity: Maybe<Scalars['BigFloat']>;
  auctionRunningUniswapContribution: Maybe<Scalars['BigFloat']>;
  auctionRunningYesPreference: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapAuctionrunning`. Fields that are set will be updated. */
export type PmmStorageMarketMapAuctionrunningPatch = {
  auctionRunningAuctionPeriodEnd: Maybe<Scalars['Datetime']>;
  auctionRunningQuantity: Maybe<Scalars['BigFloat']>;
  auctionRunningUniswapContribution: Maybe<Scalars['BigFloat']>;
  auctionRunningYesPreference: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapAuctionrunning`. */
export enum PmmStorageMarketMapAuctionrunningsOrderBy {
  AuctionRunningAuctionPeriodEndAsc = 'AUCTION_RUNNING_AUCTION_PERIOD_END_ASC',
  AuctionRunningAuctionPeriodEndDesc = 'AUCTION_RUNNING_AUCTION_PERIOD_END_DESC',
  AuctionRunningQuantityAsc = 'AUCTION_RUNNING_QUANTITY_ASC',
  AuctionRunningQuantityDesc = 'AUCTION_RUNNING_QUANTITY_DESC',
  AuctionRunningUniswapContributionAsc = 'AUCTION_RUNNING_UNISWAP_CONTRIBUTION_ASC',
  AuctionRunningUniswapContributionDesc = 'AUCTION_RUNNING_UNISWAP_CONTRIBUTION_DESC',
  AuctionRunningYesPreferenceAsc = 'AUCTION_RUNNING_YES_PREFERENCE_ASC',
  AuctionRunningYesPreferenceDesc = 'AUCTION_RUNNING_YES_PREFERENCE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_ASC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageMarketMapIdAsc = 'STORAGE_MARKET_MAP_ID_ASC',
  StorageMarketMapIdDesc = 'STORAGE_MARKET_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageMarketMap` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `marketsState` field. */
  marketsState: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataDescription` field. */
  metadataDescription: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmStorageMarketMapFa2` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapFa2Condition = {
  /** Checks for equality with the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapFa2` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapFa2Filter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapFa2Filter>>;
  /** Filter by the object’s `fa2TokenAddress` field. */
  fa2TokenAddress: Maybe<StringFilter>;
  /** Filter by the object’s `fa2TokenId` field. */
  fa2TokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapFa2Filter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapFa2Filter>>;
  /** Filter by the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapFa2` */
export type PmmStorageMarketMapFa2Input = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapFa2`. Fields that are set will be updated. */
export type PmmStorageMarketMapFa2Patch = {
  fa2TokenAddress: Maybe<Scalars['String']>;
  fa2TokenId: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapFa2`. */
export enum PmmStorageMarketMapFa2SOrderBy {
  Fa2TokenAddressAsc = 'FA2_TOKEN_ADDRESS_ASC',
  Fa2TokenAddressDesc = 'FA2_TOKEN_ADDRESS_DESC',
  Fa2TokenIdAsc = 'FA2_TOKEN_ID_ASC',
  Fa2TokenIdDesc = 'FA2_TOKEN_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_ASC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageMarketMapIdAsc = 'STORAGE_MARKET_MAP_ID_ASC',
  StorageMarketMapIdDesc = 'STORAGE_MARKET_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageMarketMapFa12` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapFa12Condition = {
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `metadataFa12` field. */
  metadataFa12: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapFa12` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapFa12Filter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapFa12Filter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `metadataFa12` field. */
  metadataFa12: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapFa12Filter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapFa12Filter>>;
  /** Filter by the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapFa12` */
export type PmmStorageMarketMapFa12Input = {
  id: Maybe<Scalars['BigInt']>;
  metadataFa12: Maybe<Scalars['String']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapFa12`. Fields that are set will be updated. */
export type PmmStorageMarketMapFa12Patch = {
  id: Maybe<Scalars['BigInt']>;
  metadataFa12: Maybe<Scalars['String']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapFa12`. */
export enum PmmStorageMarketMapFa12SOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MetadataFa12Asc = 'METADATA_FA12_ASC',
  MetadataFa12Desc = 'METADATA_FA12_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_ASC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageMarketMapIdAsc = 'STORAGE_MARKET_MAP_ID_ASC',
  StorageMarketMapIdDesc = 'STORAGE_MARKET_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** A filter to be used against `PmmStorageMarketMap` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `marketsState` field. */
  marketsState: Maybe<StringFilter>;
  /** Filter by the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<StringFilter>;
  /** Filter by the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `metadataDescription` field. */
  metadataDescription: Maybe<StringFilter>;
  /** Filter by the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMap` */
export type PmmStorageMarketMapInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageMarketMapLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `marketsState` field. */
  marketsState: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataDescription` field. */
  metadataDescription: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Filter by the object’s `marketsState` field. */
  marketsState: Maybe<StringFilter>;
  /** Filter by the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<StringFilter>;
  /** Filter by the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `metadataDescription` field. */
  metadataDescription: Maybe<StringFilter>;
  /** Filter by the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapLive` */
export type PmmStorageMarketMapLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapLive`. Fields that are set will be updated. */
export type PmmStorageMarketMapLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapLive`. */
export enum PmmStorageMarketMapLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxMarketsNatAsc = 'IDX_MARKETS_NAT_ASC',
  IdxMarketsNatDesc = 'IDX_MARKETS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  MarketsStateAsc = 'MARKETS_STATE_ASC',
  MarketsStateDesc = 'MARKETS_STATE_DESC',
  MetadataAdjudicatorAsc = 'METADATA_ADJUDICATOR_ASC',
  MetadataAdjudicatorDesc = 'METADATA_ADJUDICATOR_DESC',
  MetadataCurrencyAsc = 'METADATA_CURRENCY_ASC',
  MetadataCurrencyDesc = 'METADATA_CURRENCY_DESC',
  MetadataDescriptionAsc = 'METADATA_DESCRIPTION_ASC',
  MetadataDescriptionDesc = 'METADATA_DESCRIPTION_DESC',
  MetadataIpfsHashAsc = 'METADATA_IPFS_HASH_ASC',
  MetadataIpfsHashDesc = 'METADATA_IPFS_HASH_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapByIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__DELETED_ASC',
  PmmStorageMarketMapByIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__DELETED_DESC',
  PmmStorageMarketMapByIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__ID_ASC',
  PmmStorageMarketMapByIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__ID_DESC',
  PmmStorageMarketMapByIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageMarketMapMarketbootstrapped` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapMarketbootstrappedCondition = {
  /** Checks for equality with the object’s `currencyPoolCreatorRewardCurrencyPool` field. */
  currencyPoolCreatorRewardCurrencyPool: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `currencyPoolMarketCurrencyPool` field. */
  currencyPoolMarketCurrencyPool: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `currencyPoolNat` field. */
  currencyPoolNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `marketBootstrappedBootstrapYesProbability` field. */
  marketBootstrappedBootstrapYesProbability: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `marketBootstrappedBootstrappedAtBlock` field. */
  marketBootstrappedBootstrappedAtBlock: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `marketBootstrappedNat` field. */
  marketBootstrappedNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `resolutionResolvedAtBlock` field. */
  resolutionResolvedAtBlock: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `resolutionWinningPrediction` field. */
  resolutionWinningPrediction: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapMarketbootstrapped` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapMarketbootstrappedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapMarketbootstrappedFilter>>;
  /** Filter by the object’s `currencyPoolCreatorRewardCurrencyPool` field. */
  currencyPoolCreatorRewardCurrencyPool: Maybe<BigFloatFilter>;
  /** Filter by the object’s `currencyPoolMarketCurrencyPool` field. */
  currencyPoolMarketCurrencyPool: Maybe<BigFloatFilter>;
  /** Filter by the object’s `currencyPoolNat` field. */
  currencyPoolNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `marketBootstrappedBootstrapYesProbability` field. */
  marketBootstrappedBootstrapYesProbability: Maybe<BigFloatFilter>;
  /** Filter by the object’s `marketBootstrappedBootstrappedAtBlock` field. */
  marketBootstrappedBootstrappedAtBlock: Maybe<BigFloatFilter>;
  /** Filter by the object’s `marketBootstrappedNat` field. */
  marketBootstrappedNat: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapMarketbootstrappedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapMarketbootstrappedFilter>>;
  /** Filter by the object’s `resolutionResolvedAtBlock` field. */
  resolutionResolvedAtBlock: Maybe<BigFloatFilter>;
  /** Filter by the object’s `resolutionWinningPrediction` field. */
  resolutionWinningPrediction: Maybe<StringFilter>;
  /** Filter by the object’s `storageMarketMapId` field. */
  storageMarketMapId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapMarketbootstrapped` */
export type PmmStorageMarketMapMarketbootstrappedInput = {
  currencyPoolCreatorRewardCurrencyPool: Maybe<Scalars['BigFloat']>;
  currencyPoolMarketCurrencyPool: Maybe<Scalars['BigFloat']>;
  currencyPoolNat: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  marketBootstrappedBootstrapYesProbability: Maybe<Scalars['BigFloat']>;
  marketBootstrappedBootstrappedAtBlock: Maybe<Scalars['BigFloat']>;
  marketBootstrappedNat: Maybe<Scalars['BigFloat']>;
  resolutionResolvedAtBlock: Maybe<Scalars['BigFloat']>;
  resolutionWinningPrediction: Maybe<Scalars['String']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapMarketbootstrapped`. Fields that are set will be updated. */
export type PmmStorageMarketMapMarketbootstrappedPatch = {
  currencyPoolCreatorRewardCurrencyPool: Maybe<Scalars['BigFloat']>;
  currencyPoolMarketCurrencyPool: Maybe<Scalars['BigFloat']>;
  currencyPoolNat: Maybe<Scalars['BigFloat']>;
  id: Maybe<Scalars['BigInt']>;
  marketBootstrappedBootstrapYesProbability: Maybe<Scalars['BigFloat']>;
  marketBootstrappedBootstrappedAtBlock: Maybe<Scalars['BigFloat']>;
  marketBootstrappedNat: Maybe<Scalars['BigFloat']>;
  resolutionResolvedAtBlock: Maybe<Scalars['BigFloat']>;
  resolutionWinningPrediction: Maybe<Scalars['String']>;
  storageMarketMapId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapMarketbootstrapped`. */
export enum PmmStorageMarketMapMarketbootstrappedsOrderBy {
  CurrencyPoolCreatorRewardCurrencyPoolAsc = 'CURRENCY_POOL_CREATOR_REWARD_CURRENCY_POOL_ASC',
  CurrencyPoolCreatorRewardCurrencyPoolDesc = 'CURRENCY_POOL_CREATOR_REWARD_CURRENCY_POOL_DESC',
  CurrencyPoolMarketCurrencyPoolAsc = 'CURRENCY_POOL_MARKET_CURRENCY_POOL_ASC',
  CurrencyPoolMarketCurrencyPoolDesc = 'CURRENCY_POOL_MARKET_CURRENCY_POOL_DESC',
  CurrencyPoolNatAsc = 'CURRENCY_POOL_NAT_ASC',
  CurrencyPoolNatDesc = 'CURRENCY_POOL_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MarketBootstrappedBootstrappedAtBlockAsc = 'MARKET_BOOTSTRAPPED_BOOTSTRAPPED_AT_BLOCK_ASC',
  MarketBootstrappedBootstrappedAtBlockDesc = 'MARKET_BOOTSTRAPPED_BOOTSTRAPPED_AT_BLOCK_DESC',
  MarketBootstrappedBootstrapYesProbabilityAsc = 'MARKET_BOOTSTRAPPED_BOOTSTRAP_YES_PROBABILITY_ASC',
  MarketBootstrappedBootstrapYesProbabilityDesc = 'MARKET_BOOTSTRAPPED_BOOTSTRAP_YES_PROBABILITY_DESC',
  MarketBootstrappedNatAsc = 'MARKET_BOOTSTRAPPED_NAT_ASC',
  MarketBootstrappedNatDesc = 'MARKET_BOOTSTRAPPED_NAT_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_ASC',
  PmmStorageMarketMapByStorageMarketMapIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__DELETED_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByStorageMarketMapIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__ID_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByStorageMarketMapIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByStorageMarketMapIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_STORAGE_MARKET_MAP_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  ResolutionResolvedAtBlockAsc = 'RESOLUTION_RESOLVED_AT_BLOCK_ASC',
  ResolutionResolvedAtBlockDesc = 'RESOLUTION_RESOLVED_AT_BLOCK_DESC',
  ResolutionWinningPredictionAsc = 'RESOLUTION_WINNING_PREDICTION_ASC',
  ResolutionWinningPredictionDesc = 'RESOLUTION_WINNING_PREDICTION_DESC',
  StorageMarketMapIdAsc = 'STORAGE_MARKET_MAP_ID_ASC',
  StorageMarketMapIdDesc = 'STORAGE_MARKET_MAP_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageMarketMapOrdered` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageMarketMapOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `marketsState` field. */
  marketsState: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataDescription` field. */
  metadataDescription: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageMarketMapOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageMarketMapOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageMarketMapOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxMarketsNat` field. */
  idxMarketsNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Filter by the object’s `marketsState` field. */
  marketsState: Maybe<StringFilter>;
  /** Filter by the object’s `metadataAdjudicator` field. */
  metadataAdjudicator: Maybe<StringFilter>;
  /** Filter by the object’s `metadataCurrency` field. */
  metadataCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `metadataDescription` field. */
  metadataDescription: Maybe<StringFilter>;
  /** Filter by the object’s `metadataIpfsHash` field. */
  metadataIpfsHash: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageMarketMapOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageMarketMapOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageMarketMapOrdered` */
export type PmmStorageMarketMapOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageMarketMapOrdered`. Fields that are set will be updated. */
export type PmmStorageMarketMapOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMapOrdered`. */
export enum PmmStorageMarketMapOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxMarketsNatAsc = 'IDX_MARKETS_NAT_ASC',
  IdxMarketsNatDesc = 'IDX_MARKETS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  MarketsStateAsc = 'MARKETS_STATE_ASC',
  MarketsStateDesc = 'MARKETS_STATE_DESC',
  MetadataAdjudicatorAsc = 'METADATA_ADJUDICATOR_ASC',
  MetadataAdjudicatorDesc = 'METADATA_ADJUDICATOR_DESC',
  MetadataCurrencyAsc = 'METADATA_CURRENCY_ASC',
  MetadataCurrencyDesc = 'METADATA_CURRENCY_DESC',
  MetadataDescriptionAsc = 'METADATA_DESCRIPTION_ASC',
  MetadataDescriptionDesc = 'METADATA_DESCRIPTION_DESC',
  MetadataIpfsHashAsc = 'METADATA_IPFS_HASH_ASC',
  MetadataIpfsHashDesc = 'METADATA_IPFS_HASH_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageMarketMapByIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapByIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapByIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__DELETED_ASC',
  PmmStorageMarketMapByIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__DELETED_DESC',
  PmmStorageMarketMapByIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapByIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapByIdIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__ID_ASC',
  PmmStorageMarketMapByIdIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__ID_DESC',
  PmmStorageMarketMapByIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapByIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapByIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapByIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapByIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapByIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapByIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapByIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapByIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapByIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapByIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapByIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageMarketMap`. Fields that are set will be updated. */
export type PmmStorageMarketMapPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxMarketsNat: Maybe<Scalars['BigFloat']>;
  marketsState: Maybe<Scalars['String']>;
  metadataAdjudicator: Maybe<Scalars['String']>;
  metadataCurrency: Maybe<Scalars['String']>;
  metadataDescription: Maybe<Scalars['String']>;
  metadataIpfsHash: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageMarketMap`. */
export enum PmmStorageMarketMapsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxMarketsNatAsc = 'IDX_MARKETS_NAT_ASC',
  IdxMarketsNatDesc = 'IDX_MARKETS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MarketsStateAsc = 'MARKETS_STATE_ASC',
  MarketsStateDesc = 'MARKETS_STATE_DESC',
  MetadataAdjudicatorAsc = 'METADATA_ADJUDICATOR_ASC',
  MetadataAdjudicatorDesc = 'METADATA_ADJUDICATOR_DESC',
  MetadataCurrencyAsc = 'METADATA_CURRENCY_ASC',
  MetadataCurrencyDesc = 'METADATA_CURRENCY_DESC',
  MetadataDescriptionAsc = 'METADATA_DESCRIPTION_ASC',
  MetadataDescriptionDesc = 'METADATA_DESCRIPTION_DESC',
  MetadataIpfsHashAsc = 'METADATA_IPFS_HASH_ASC',
  MetadataIpfsHashDesc = 'METADATA_IPFS_HASH_DESC',
  Natural = 'NATURAL',
  PmmStorageMarketMapAuctionrunningsByStorageMarketMapIdCountAsc = 'PMM_STORAGE_MARKET_MAP_AUCTIONRUNNINGS_BY_STORAGE_MARKET_MAP_ID__COUNT_ASC',
  PmmStorageMarketMapAuctionrunningsByStorageMarketMapIdCountDesc = 'PMM_STORAGE_MARKET_MAP_AUCTIONRUNNINGS_BY_STORAGE_MARKET_MAP_ID__COUNT_DESC',
  PmmStorageMarketMapFa2SByStorageMarketMapIdCountAsc = 'PMM_STORAGE_MARKET_MAP_FA2_S_BY_STORAGE_MARKET_MAP_ID__COUNT_ASC',
  PmmStorageMarketMapFa2SByStorageMarketMapIdCountDesc = 'PMM_STORAGE_MARKET_MAP_FA2_S_BY_STORAGE_MARKET_MAP_ID__COUNT_DESC',
  PmmStorageMarketMapFa12SByStorageMarketMapIdCountAsc = 'PMM_STORAGE_MARKET_MAP_FA12_S_BY_STORAGE_MARKET_MAP_ID__COUNT_ASC',
  PmmStorageMarketMapFa12SByStorageMarketMapIdCountDesc = 'PMM_STORAGE_MARKET_MAP_FA12_S_BY_STORAGE_MARKET_MAP_ID__COUNT_DESC',
  PmmStorageMarketMapLiveByIdBigmapIdAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmStorageMarketMapLiveByIdBigmapIdDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmStorageMarketMapLiveByIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapLiveByIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapLiveByIdIdAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__ID_ASC',
  PmmStorageMarketMapLiveByIdIdDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__ID_DESC',
  PmmStorageMarketMapLiveByIdLevelAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageMarketMapLiveByIdLevelDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageMarketMapLiveByIdLevelTimestampAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageMarketMapLiveByIdLevelTimestampDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageMarketMapLiveByIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapLiveByIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapLiveByIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapLiveByIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapLiveByIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapLiveByIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapLiveByIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapLiveByIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapLiveByIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapLiveByIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapLiveByIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapLiveByIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageMarketMapMarketbootstrappedsByStorageMarketMapIdCountAsc = 'PMM_STORAGE_MARKET_MAP_MARKETBOOTSTRAPPEDS_BY_STORAGE_MARKET_MAP_ID__COUNT_ASC',
  PmmStorageMarketMapMarketbootstrappedsByStorageMarketMapIdCountDesc = 'PMM_STORAGE_MARKET_MAP_MARKETBOOTSTRAPPEDS_BY_STORAGE_MARKET_MAP_ID__COUNT_DESC',
  PmmStorageMarketMapOrderedByIdDeletedAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__DELETED_ASC',
  PmmStorageMarketMapOrderedByIdDeletedDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__DELETED_DESC',
  PmmStorageMarketMapOrderedByIdIdxMarketsNatAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__IDX_MARKETS_NAT_ASC',
  PmmStorageMarketMapOrderedByIdIdxMarketsNatDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__IDX_MARKETS_NAT_DESC',
  PmmStorageMarketMapOrderedByIdIdAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__ID_ASC',
  PmmStorageMarketMapOrderedByIdIdDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__ID_DESC',
  PmmStorageMarketMapOrderedByIdLevelAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageMarketMapOrderedByIdLevelDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageMarketMapOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageMarketMapOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageMarketMapOrderedByIdMarketsStateAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__MARKETS_STATE_ASC',
  PmmStorageMarketMapOrderedByIdMarketsStateDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__MARKETS_STATE_DESC',
  PmmStorageMarketMapOrderedByIdMetadataAdjudicatorAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_ADJUDICATOR_ASC',
  PmmStorageMarketMapOrderedByIdMetadataAdjudicatorDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_ADJUDICATOR_DESC',
  PmmStorageMarketMapOrderedByIdMetadataCurrencyAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_CURRENCY_ASC',
  PmmStorageMarketMapOrderedByIdMetadataCurrencyDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_CURRENCY_DESC',
  PmmStorageMarketMapOrderedByIdMetadataDescriptionAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_DESCRIPTION_ASC',
  PmmStorageMarketMapOrderedByIdMetadataDescriptionDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_DESCRIPTION_DESC',
  PmmStorageMarketMapOrderedByIdMetadataIpfsHashAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_IPFS_HASH_ASC',
  PmmStorageMarketMapOrderedByIdMetadataIpfsHashDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__METADATA_IPFS_HASH_DESC',
  PmmStorageMarketMapOrderedByIdOrderingAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageMarketMapOrderedByIdOrderingDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageMarketMapOrderedByIdTxContextIdAsc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageMarketMapOrderedByIdTxContextIdDesc = 'PMM_STORAGE_MARKET_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageOrdered` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageOrderedCondition = {
  /** Checks for equality with the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageOrderedFilter>>;
  /** Filter by the object’s `createRestrictionsCreatorAddress` field. */
  createRestrictionsCreatorAddress: Maybe<StringFilter>;
  /** Filter by the object’s `createRestrictionsCurrency` field. */
  createRestrictionsCurrency: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `lambdaRepositoryCreator` field. */
  lambdaRepositoryCreator: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageOrdered` */
export type PmmStorageOrderedInput = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageOrdered`. Fields that are set will be updated. */
export type PmmStorageOrderedPatch = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageOrdered`. */
export enum PmmStorageOrderedsOrderBy {
  CreateRestrictionsCreatorAddressAsc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  CreateRestrictionsCreatorAddressDesc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  CreateRestrictionsCurrencyAsc = 'CREATE_RESTRICTIONS_CURRENCY_ASC',
  CreateRestrictionsCurrencyDesc = 'CREATE_RESTRICTIONS_CURRENCY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LambdaRepositoryCreatorAsc = 'LAMBDA_REPOSITORY_CREATOR_ASC',
  LambdaRepositoryCreatorDesc = 'LAMBDA_REPOSITORY_CREATOR_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageByIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageByIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageByIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageByIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageByIdIdAsc = 'PMM_STORAGE_BY_ID__ID_ASC',
  PmmStorageByIdIdDesc = 'PMM_STORAGE_BY_ID__ID_DESC',
  PmmStorageByIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_BY_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageByIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_BY_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageByIdTxContextIdAsc = 'PMM_STORAGE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageByIdTxContextIdDesc = 'PMM_STORAGE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorage`. Fields that are set will be updated. */
export type PmmStoragePatch = {
  createRestrictionsCreatorAddress: Maybe<Scalars['String']>;
  createRestrictionsCurrency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  lambdaRepositoryCreator: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmStorageSupplyMap` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageSupplyMapCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageSupplyMap` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageSupplyMapFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageSupplyMapFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageSupplyMapFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageSupplyMapFilter>>;
  /** Filter by the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageSupplyMap` */
export type PmmStorageSupplyMapInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmStorageSupplyMapLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageSupplyMapLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageSupplyMapLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageSupplyMapLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageSupplyMapLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageSupplyMapLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageSupplyMapLiveFilter>>;
  /** Filter by the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageSupplyMapLive` */
export type PmmStorageSupplyMapLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageSupplyMapLive`. Fields that are set will be updated. */
export type PmmStorageSupplyMapLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageSupplyMapLive`. */
export enum PmmStorageSupplyMapLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxTokensNatAsc = 'IDX_TOKENS_NAT_ASC',
  IdxTokensNatDesc = 'IDX_TOKENS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmStorageSupplyMapByIdBigmapIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageSupplyMapByIdBigmapIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageSupplyMapByIdDeletedAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__DELETED_ASC',
  PmmStorageSupplyMapByIdDeletedDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__DELETED_DESC',
  PmmStorageSupplyMapByIdIdxTokensNatAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__IDX_TOKENS_NAT_ASC',
  PmmStorageSupplyMapByIdIdxTokensNatDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__IDX_TOKENS_NAT_DESC',
  PmmStorageSupplyMapByIdIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__ID_ASC',
  PmmStorageSupplyMapByIdIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__ID_DESC',
  PmmStorageSupplyMapByIdTokensInReserveAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_IN_RESERVE_ASC',
  PmmStorageSupplyMapByIdTokensInReserveDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_IN_RESERVE_DESC',
  PmmStorageSupplyMapByIdTokensTotalSupplyAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_TOTAL_SUPPLY_ASC',
  PmmStorageSupplyMapByIdTokensTotalSupplyDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_TOTAL_SUPPLY_DESC',
  PmmStorageSupplyMapByIdTxContextIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageSupplyMapByIdTxContextIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensInReserveAsc = 'TOKENS_IN_RESERVE_ASC',
  TokensInReserveDesc = 'TOKENS_IN_RESERVE_DESC',
  TokensTotalSupplyAsc = 'TOKENS_TOTAL_SUPPLY_ASC',
  TokensTotalSupplyDesc = 'TOKENS_TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmStorageSupplyMapOrdered` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmStorageSupplyMapOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmStorageSupplyMapOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmStorageSupplyMapOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmStorageSupplyMapOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxTokensNat` field. */
  idxTokensNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmStorageSupplyMapOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmStorageSupplyMapOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokensInReserve` field. */
  tokensInReserve: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokensTotalSupply` field. */
  tokensTotalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmStorageSupplyMapOrdered` */
export type PmmStorageSupplyMapOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmStorageSupplyMapOrdered`. Fields that are set will be updated. */
export type PmmStorageSupplyMapOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageSupplyMapOrdered`. */
export enum PmmStorageSupplyMapOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxTokensNatAsc = 'IDX_TOKENS_NAT_ASC',
  IdxTokensNatDesc = 'IDX_TOKENS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmStorageSupplyMapByIdBigmapIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__BIGMAP_ID_ASC',
  PmmStorageSupplyMapByIdBigmapIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__BIGMAP_ID_DESC',
  PmmStorageSupplyMapByIdDeletedAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__DELETED_ASC',
  PmmStorageSupplyMapByIdDeletedDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__DELETED_DESC',
  PmmStorageSupplyMapByIdIdxTokensNatAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__IDX_TOKENS_NAT_ASC',
  PmmStorageSupplyMapByIdIdxTokensNatDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__IDX_TOKENS_NAT_DESC',
  PmmStorageSupplyMapByIdIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__ID_ASC',
  PmmStorageSupplyMapByIdIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__ID_DESC',
  PmmStorageSupplyMapByIdTokensInReserveAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_IN_RESERVE_ASC',
  PmmStorageSupplyMapByIdTokensInReserveDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_IN_RESERVE_DESC',
  PmmStorageSupplyMapByIdTokensTotalSupplyAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_TOTAL_SUPPLY_ASC',
  PmmStorageSupplyMapByIdTokensTotalSupplyDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TOKENS_TOTAL_SUPPLY_DESC',
  PmmStorageSupplyMapByIdTxContextIdAsc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageSupplyMapByIdTxContextIdDesc = 'PMM_STORAGE_SUPPLY_MAP_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensInReserveAsc = 'TOKENS_IN_RESERVE_ASC',
  TokensInReserveDesc = 'TOKENS_IN_RESERVE_DESC',
  TokensTotalSupplyAsc = 'TOKENS_TOTAL_SUPPLY_ASC',
  TokensTotalSupplyDesc = 'TOKENS_TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmStorageSupplyMap`. Fields that are set will be updated. */
export type PmmStorageSupplyMapPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxTokensNat: Maybe<Scalars['BigFloat']>;
  tokensInReserve: Maybe<Scalars['BigFloat']>;
  tokensTotalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmStorageSupplyMap`. */
export enum PmmStorageSupplyMapsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxTokensNatAsc = 'IDX_TOKENS_NAT_ASC',
  IdxTokensNatDesc = 'IDX_TOKENS_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmStorageSupplyMapLiveByIdBigmapIdAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmStorageSupplyMapLiveByIdBigmapIdDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmStorageSupplyMapLiveByIdIdxTokensNatAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__IDX_TOKENS_NAT_ASC',
  PmmStorageSupplyMapLiveByIdIdxTokensNatDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__IDX_TOKENS_NAT_DESC',
  PmmStorageSupplyMapLiveByIdIdAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__ID_ASC',
  PmmStorageSupplyMapLiveByIdIdDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__ID_DESC',
  PmmStorageSupplyMapLiveByIdLevelAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageSupplyMapLiveByIdLevelDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageSupplyMapLiveByIdLevelTimestampAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageSupplyMapLiveByIdLevelTimestampDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageSupplyMapLiveByIdTokensInReserveAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TOKENS_IN_RESERVE_ASC',
  PmmStorageSupplyMapLiveByIdTokensInReserveDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TOKENS_IN_RESERVE_DESC',
  PmmStorageSupplyMapLiveByIdTokensTotalSupplyAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TOKENS_TOTAL_SUPPLY_ASC',
  PmmStorageSupplyMapLiveByIdTokensTotalSupplyDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TOKENS_TOTAL_SUPPLY_DESC',
  PmmStorageSupplyMapLiveByIdTxContextIdAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageSupplyMapLiveByIdTxContextIdDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageSupplyMapOrderedByIdDeletedAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__DELETED_ASC',
  PmmStorageSupplyMapOrderedByIdDeletedDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__DELETED_DESC',
  PmmStorageSupplyMapOrderedByIdIdxTokensNatAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__IDX_TOKENS_NAT_ASC',
  PmmStorageSupplyMapOrderedByIdIdxTokensNatDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__IDX_TOKENS_NAT_DESC',
  PmmStorageSupplyMapOrderedByIdIdAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__ID_ASC',
  PmmStorageSupplyMapOrderedByIdIdDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__ID_DESC',
  PmmStorageSupplyMapOrderedByIdLevelAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageSupplyMapOrderedByIdLevelDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageSupplyMapOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageSupplyMapOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageSupplyMapOrderedByIdOrderingAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageSupplyMapOrderedByIdOrderingDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageSupplyMapOrderedByIdTokensInReserveAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TOKENS_IN_RESERVE_ASC',
  PmmStorageSupplyMapOrderedByIdTokensInReserveDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TOKENS_IN_RESERVE_DESC',
  PmmStorageSupplyMapOrderedByIdTokensTotalSupplyAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TOKENS_TOTAL_SUPPLY_ASC',
  PmmStorageSupplyMapOrderedByIdTokensTotalSupplyDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TOKENS_TOTAL_SUPPLY_DESC',
  PmmStorageSupplyMapOrderedByIdTxContextIdAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageSupplyMapOrderedByIdTxContextIdDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokensInReserveAsc = 'TOKENS_IN_RESERVE_ASC',
  TokensInReserveDesc = 'TOKENS_IN_RESERVE_DESC',
  TokensTotalSupplyAsc = 'TOKENS_TOTAL_SUPPLY_ASC',
  TokensTotalSupplyDesc = 'TOKENS_TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Methods to use when ordering `PmmStorage`. */
export enum PmmStoragesOrderBy {
  CreateRestrictionsCreatorAddressAsc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  CreateRestrictionsCreatorAddressDesc = 'CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  CreateRestrictionsCurrencyAsc = 'CREATE_RESTRICTIONS_CURRENCY_ASC',
  CreateRestrictionsCurrencyDesc = 'CREATE_RESTRICTIONS_CURRENCY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LambdaRepositoryCreatorAsc = 'LAMBDA_REPOSITORY_CREATOR_ASC',
  LambdaRepositoryCreatorDesc = 'LAMBDA_REPOSITORY_CREATOR_DESC',
  Natural = 'NATURAL',
  PmmStorageFa2LivesByStorageIdCountAsc = 'PMM_STORAGE_FA2_LIVES_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa2LivesByStorageIdCountDesc = 'PMM_STORAGE_FA2_LIVES_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageFa2OrderedsByStorageIdCountAsc = 'PMM_STORAGE_FA2_ORDEREDS_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa2OrderedsByStorageIdCountDesc = 'PMM_STORAGE_FA2_ORDEREDS_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageFa2SByStorageIdCountAsc = 'PMM_STORAGE_FA2_S_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa2SByStorageIdCountDesc = 'PMM_STORAGE_FA2_S_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageFa12LivesByStorageIdCountAsc = 'PMM_STORAGE_FA12_LIVES_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa12LivesByStorageIdCountDesc = 'PMM_STORAGE_FA12_LIVES_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageFa12OrderedsByStorageIdCountAsc = 'PMM_STORAGE_FA12_ORDEREDS_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa12OrderedsByStorageIdCountDesc = 'PMM_STORAGE_FA12_ORDEREDS_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageFa12SByStorageIdCountAsc = 'PMM_STORAGE_FA12_S_BY_STORAGE_ID__COUNT_ASC',
  PmmStorageFa12SByStorageIdCountDesc = 'PMM_STORAGE_FA12_S_BY_STORAGE_ID__COUNT_DESC',
  PmmStorageLiveByIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_LIVE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageLiveByIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_LIVE_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageLiveByIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_LIVE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageLiveByIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_LIVE_BY_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageLiveByIdIdAsc = 'PMM_STORAGE_LIVE_BY_ID__ID_ASC',
  PmmStorageLiveByIdIdDesc = 'PMM_STORAGE_LIVE_BY_ID__ID_DESC',
  PmmStorageLiveByIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_LIVE_BY_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageLiveByIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_LIVE_BY_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageLiveByIdLevelAsc = 'PMM_STORAGE_LIVE_BY_ID__LEVEL_ASC',
  PmmStorageLiveByIdLevelDesc = 'PMM_STORAGE_LIVE_BY_ID__LEVEL_DESC',
  PmmStorageLiveByIdLevelTimestampAsc = 'PMM_STORAGE_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageLiveByIdLevelTimestampDesc = 'PMM_STORAGE_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageLiveByIdTxContextIdAsc = 'PMM_STORAGE_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageLiveByIdTxContextIdDesc = 'PMM_STORAGE_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmStorageOrderedByIdCreateRestrictionsCreatorAddressAsc = 'PMM_STORAGE_ORDERED_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_ASC',
  PmmStorageOrderedByIdCreateRestrictionsCreatorAddressDesc = 'PMM_STORAGE_ORDERED_BY_ID__CREATE_RESTRICTIONS_CREATOR_ADDRESS_DESC',
  PmmStorageOrderedByIdCreateRestrictionsCurrencyAsc = 'PMM_STORAGE_ORDERED_BY_ID__CREATE_RESTRICTIONS_CURRENCY_ASC',
  PmmStorageOrderedByIdCreateRestrictionsCurrencyDesc = 'PMM_STORAGE_ORDERED_BY_ID__CREATE_RESTRICTIONS_CURRENCY_DESC',
  PmmStorageOrderedByIdIdAsc = 'PMM_STORAGE_ORDERED_BY_ID__ID_ASC',
  PmmStorageOrderedByIdIdDesc = 'PMM_STORAGE_ORDERED_BY_ID__ID_DESC',
  PmmStorageOrderedByIdLambdaRepositoryCreatorAsc = 'PMM_STORAGE_ORDERED_BY_ID__LAMBDA_REPOSITORY_CREATOR_ASC',
  PmmStorageOrderedByIdLambdaRepositoryCreatorDesc = 'PMM_STORAGE_ORDERED_BY_ID__LAMBDA_REPOSITORY_CREATOR_DESC',
  PmmStorageOrderedByIdLevelAsc = 'PMM_STORAGE_ORDERED_BY_ID__LEVEL_ASC',
  PmmStorageOrderedByIdLevelDesc = 'PMM_STORAGE_ORDERED_BY_ID__LEVEL_DESC',
  PmmStorageOrderedByIdLevelTimestampAsc = 'PMM_STORAGE_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmStorageOrderedByIdLevelTimestampDesc = 'PMM_STORAGE_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmStorageOrderedByIdOrderingAsc = 'PMM_STORAGE_ORDERED_BY_ID__ORDERING_ASC',
  PmmStorageOrderedByIdOrderingDesc = 'PMM_STORAGE_ORDERED_BY_ID__ORDERING_DESC',
  PmmStorageOrderedByIdTxContextIdAsc = 'PMM_STORAGE_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmStorageOrderedByIdTxContextIdDesc = 'PMM_STORAGE_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenBigmapClear` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenBigmapClearCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenBigmapClear` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenBigmapClearFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenBigmapClearFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenBigmapClearFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenBigmapClearFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenBigmapClear` */
export type PmmTokenBigmapClearInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenBigmapClear`. Fields that are set will be updated. */
export type PmmTokenBigmapClearPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenBigmapClear`. */
export enum PmmTokenBigmapClearsOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageBalance` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageBalanceCondition = {
  /** Checks for equality with the object’s `balance` field. */
  balance: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxAddress` field. */
  idxAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageBalance` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageBalanceFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageBalanceFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: Maybe<BigFloatFilter>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxAddress` field. */
  idxAddress: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageBalanceFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageBalanceFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageBalance` */
export type PmmTokenStorageBalanceInput = {
  balance: Maybe<Scalars['BigFloat']>;
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageBalance`. Fields that are set will be updated. */
export type PmmTokenStorageBalancePatch = {
  balance: Maybe<Scalars['BigFloat']>;
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmTokenStorageBalancesApproval` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageBalancesApprovalCondition = {
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxAddress` field. */
  idxAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `nat` field. */
  nat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `storageBalancesId` field. */
  storageBalancesId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageBalancesApproval` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageBalancesApprovalFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageBalancesApprovalFilter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxAddress` field. */
  idxAddress: Maybe<StringFilter>;
  /** Filter by the object’s `nat` field. */
  nat: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageBalancesApprovalFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageBalancesApprovalFilter>>;
  /** Filter by the object’s `storageBalancesId` field. */
  storageBalancesId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageBalancesApproval` */
export type PmmTokenStorageBalancesApprovalInput = {
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  nat: Maybe<Scalars['BigFloat']>;
  storageBalancesId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageBalancesApproval`. Fields that are set will be updated. */
export type PmmTokenStorageBalancesApprovalPatch = {
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  nat: Maybe<Scalars['BigFloat']>;
  storageBalancesId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageBalancesApproval`. */
export enum PmmTokenStorageBalancesApprovalsOrderBy {
  IdxAddressAsc = 'IDX_ADDRESS_ASC',
  IdxAddressDesc = 'IDX_ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NatAsc = 'NAT_ASC',
  NatDesc = 'NAT_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdBalanceAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__BALANCE_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdBalanceDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__BALANCE_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__BIGMAP_ID_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__BIGMAP_ID_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdDeletedAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__DELETED_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdDeletedDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__DELETED_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdIdxAddressAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__IDX_ADDRESS_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdIdxAddressDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__IDX_ADDRESS_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__ID_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__ID_DESC',
  PmmTokenStorageBalanceByStorageBalancesIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageBalanceByStorageBalancesIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_STORAGE_BALANCES_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageBalancesIdAsc = 'STORAGE_BALANCES_ID_ASC',
  StorageBalancesIdDesc = 'STORAGE_BALANCES_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageBalancesLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageBalancesLiveCondition = {
  /** Checks for equality with the object’s `balance` field. */
  balance: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxAddress` field. */
  idxAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageBalancesLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageBalancesLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageBalancesLiveFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: Maybe<BigFloatFilter>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxAddress` field. */
  idxAddress: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageBalancesLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageBalancesLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageBalancesLive` */
export type PmmTokenStorageBalancesLiveInput = {
  balance: Maybe<Scalars['BigFloat']>;
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageBalancesLive`. Fields that are set will be updated. */
export type PmmTokenStorageBalancesLivePatch = {
  balance: Maybe<Scalars['BigFloat']>;
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageBalancesLive`. */
export enum PmmTokenStorageBalancesLivesOrderBy {
  BalanceAsc = 'BALANCE_ASC',
  BalanceDesc = 'BALANCE_DESC',
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxAddressAsc = 'IDX_ADDRESS_ASC',
  IdxAddressDesc = 'IDX_ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageBalanceByIdBalanceAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BALANCE_ASC',
  PmmTokenStorageBalanceByIdBalanceDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BALANCE_DESC',
  PmmTokenStorageBalanceByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageBalanceByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageBalanceByIdDeletedAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__DELETED_ASC',
  PmmTokenStorageBalanceByIdDeletedDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__DELETED_DESC',
  PmmTokenStorageBalanceByIdIdxAddressAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__IDX_ADDRESS_ASC',
  PmmTokenStorageBalanceByIdIdxAddressDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__IDX_ADDRESS_DESC',
  PmmTokenStorageBalanceByIdIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__ID_ASC',
  PmmTokenStorageBalanceByIdIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__ID_DESC',
  PmmTokenStorageBalanceByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageBalanceByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Methods to use when ordering `PmmTokenStorageBalance`. */
export enum PmmTokenStorageBalancesOrderBy {
  BalanceAsc = 'BALANCE_ASC',
  BalanceDesc = 'BALANCE_DESC',
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxAddressAsc = 'IDX_ADDRESS_ASC',
  IdxAddressDesc = 'IDX_ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageBalancesApprovalsByStorageBalancesIdCountAsc = 'PMM_TOKEN_STORAGE_BALANCES_APPROVALS_BY_STORAGE_BALANCES_ID__COUNT_ASC',
  PmmTokenStorageBalancesApprovalsByStorageBalancesIdCountDesc = 'PMM_TOKEN_STORAGE_BALANCES_APPROVALS_BY_STORAGE_BALANCES_ID__COUNT_DESC',
  PmmTokenStorageBalancesLiveByIdBalanceAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__BALANCE_ASC',
  PmmTokenStorageBalancesLiveByIdBalanceDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__BALANCE_DESC',
  PmmTokenStorageBalancesLiveByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageBalancesLiveByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageBalancesLiveByIdIdxAddressAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__IDX_ADDRESS_ASC',
  PmmTokenStorageBalancesLiveByIdIdxAddressDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__IDX_ADDRESS_DESC',
  PmmTokenStorageBalancesLiveByIdIdAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__ID_ASC',
  PmmTokenStorageBalancesLiveByIdIdDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__ID_DESC',
  PmmTokenStorageBalancesLiveByIdLevelAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__LEVEL_ASC',
  PmmTokenStorageBalancesLiveByIdLevelDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__LEVEL_DESC',
  PmmTokenStorageBalancesLiveByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageBalancesLiveByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageBalancesLiveByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageBalancesLiveByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmTokenStorageBalancesOrderedByIdBalanceAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__BALANCE_ASC',
  PmmTokenStorageBalancesOrderedByIdBalanceDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__BALANCE_DESC',
  PmmTokenStorageBalancesOrderedByIdDeletedAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__DELETED_ASC',
  PmmTokenStorageBalancesOrderedByIdDeletedDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__DELETED_DESC',
  PmmTokenStorageBalancesOrderedByIdIdxAddressAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__IDX_ADDRESS_ASC',
  PmmTokenStorageBalancesOrderedByIdIdxAddressDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__IDX_ADDRESS_DESC',
  PmmTokenStorageBalancesOrderedByIdIdAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__ID_ASC',
  PmmTokenStorageBalancesOrderedByIdIdDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__ID_DESC',
  PmmTokenStorageBalancesOrderedByIdLevelAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__LEVEL_ASC',
  PmmTokenStorageBalancesOrderedByIdLevelDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__LEVEL_DESC',
  PmmTokenStorageBalancesOrderedByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageBalancesOrderedByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageBalancesOrderedByIdOrderingAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__ORDERING_ASC',
  PmmTokenStorageBalancesOrderedByIdOrderingDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__ORDERING_DESC',
  PmmTokenStorageBalancesOrderedByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageBalancesOrderedByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageBalancesOrdered` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageBalancesOrderedCondition = {
  /** Checks for equality with the object’s `balance` field. */
  balance: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxAddress` field. */
  idxAddress: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageBalancesOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageBalancesOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageBalancesOrderedFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: Maybe<BigFloatFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxAddress` field. */
  idxAddress: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageBalancesOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageBalancesOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageBalancesOrdered` */
export type PmmTokenStorageBalancesOrderedInput = {
  balance: Maybe<Scalars['BigFloat']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageBalancesOrdered`. Fields that are set will be updated. */
export type PmmTokenStorageBalancesOrderedPatch = {
  balance: Maybe<Scalars['BigFloat']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxAddress: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageBalancesOrdered`. */
export enum PmmTokenStorageBalancesOrderedsOrderBy {
  BalanceAsc = 'BALANCE_ASC',
  BalanceDesc = 'BALANCE_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxAddressAsc = 'IDX_ADDRESS_ASC',
  IdxAddressDesc = 'IDX_ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmTokenStorageBalanceByIdBalanceAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BALANCE_ASC',
  PmmTokenStorageBalanceByIdBalanceDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BALANCE_DESC',
  PmmTokenStorageBalanceByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageBalanceByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageBalanceByIdDeletedAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__DELETED_ASC',
  PmmTokenStorageBalanceByIdDeletedDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__DELETED_DESC',
  PmmTokenStorageBalanceByIdIdxAddressAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__IDX_ADDRESS_ASC',
  PmmTokenStorageBalanceByIdIdxAddressDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__IDX_ADDRESS_DESC',
  PmmTokenStorageBalanceByIdIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__ID_ASC',
  PmmTokenStorageBalanceByIdIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__ID_DESC',
  PmmTokenStorageBalanceByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageBalanceByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BALANCE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageCondition = {
  /** Checks for equality with the object’s `administrator` field. */
  administrator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `paused` field. */
  paused: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `totalSupply` field. */
  totalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorage` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageFilter = {
  /** Filter by the object’s `administrator` field. */
  administrator: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageFilter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageFilter>>;
  /** Filter by the object’s `paused` field. */
  paused: Maybe<BooleanFilter>;
  /** Filter by the object’s `totalSupply` field. */
  totalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorage` */
export type PmmTokenStorageInput = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/**
 * A condition to be used against `PmmTokenStorageLive` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageLiveCondition = {
  /** Checks for equality with the object’s `administrator` field. */
  administrator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `paused` field. */
  paused: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `totalSupply` field. */
  totalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageLiveFilter = {
  /** Filter by the object’s `administrator` field. */
  administrator: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageLiveFilter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageLiveFilter>>;
  /** Filter by the object’s `paused` field. */
  paused: Maybe<BooleanFilter>;
  /** Filter by the object’s `totalSupply` field. */
  totalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageLive` */
export type PmmTokenStorageLiveInput = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageLive`. Fields that are set will be updated. */
export type PmmTokenStorageLivePatch = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageLive`. */
export enum PmmTokenStorageLivesOrderBy {
  AdministratorAsc = 'ADMINISTRATOR_ASC',
  AdministratorDesc = 'ADMINISTRATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PausedAsc = 'PAUSED_ASC',
  PausedDesc = 'PAUSED_DESC',
  PmmTokenStorageByIdAdministratorAsc = 'PMM_TOKEN_STORAGE_BY_ID__ADMINISTRATOR_ASC',
  PmmTokenStorageByIdAdministratorDesc = 'PMM_TOKEN_STORAGE_BY_ID__ADMINISTRATOR_DESC',
  PmmTokenStorageByIdIdAsc = 'PMM_TOKEN_STORAGE_BY_ID__ID_ASC',
  PmmTokenStorageByIdIdDesc = 'PMM_TOKEN_STORAGE_BY_ID__ID_DESC',
  PmmTokenStorageByIdPausedAsc = 'PMM_TOKEN_STORAGE_BY_ID__PAUSED_ASC',
  PmmTokenStorageByIdPausedDesc = 'PMM_TOKEN_STORAGE_BY_ID__PAUSED_DESC',
  PmmTokenStorageByIdTotalSupplyAsc = 'PMM_TOKEN_STORAGE_BY_ID__TOTAL_SUPPLY_ASC',
  PmmTokenStorageByIdTotalSupplyDesc = 'PMM_TOKEN_STORAGE_BY_ID__TOTAL_SUPPLY_DESC',
  PmmTokenStorageByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TotalSupplyAsc = 'TOTAL_SUPPLY_ASC',
  TotalSupplyDesc = 'TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageMetadataLive` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageMetadataLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `bytes` field. */
  bytes: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxString` field. */
  idxString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageMetadataLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageMetadataLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageMetadataLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `bytes` field. */
  bytes: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxString` field. */
  idxString: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageMetadataLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageMetadataLiveFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageMetadataLive` */
export type PmmTokenStorageMetadataLiveInput = {
  bigmapId: Scalars['Int'];
  bytes: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageMetadataLive`. Fields that are set will be updated. */
export type PmmTokenStorageMetadataLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  bytes: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageMetadataLive`. */
export enum PmmTokenStorageMetadataLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  BytesAsc = 'BYTES_ASC',
  BytesDesc = 'BYTES_DESC',
  IdxStringAsc = 'IDX_STRING_ASC',
  IdxStringDesc = 'IDX_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageMetadatumByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageMetadatumByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageMetadatumByIdBytesAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BYTES_ASC',
  PmmTokenStorageMetadatumByIdBytesDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BYTES_DESC',
  PmmTokenStorageMetadatumByIdDeletedAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__DELETED_ASC',
  PmmTokenStorageMetadatumByIdDeletedDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__DELETED_DESC',
  PmmTokenStorageMetadatumByIdIdxStringAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__IDX_STRING_ASC',
  PmmTokenStorageMetadatumByIdIdxStringDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__IDX_STRING_DESC',
  PmmTokenStorageMetadatumByIdIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__ID_ASC',
  PmmTokenStorageMetadatumByIdIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__ID_DESC',
  PmmTokenStorageMetadatumByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageMetadatumByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Methods to use when ordering `PmmTokenStorageMetadatum`. */
export enum PmmTokenStorageMetadataOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  BytesAsc = 'BYTES_ASC',
  BytesDesc = 'BYTES_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxStringAsc = 'IDX_STRING_ASC',
  IdxStringDesc = 'IDX_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageMetadataLiveByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageMetadataLiveByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageMetadataLiveByIdBytesAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__BYTES_ASC',
  PmmTokenStorageMetadataLiveByIdBytesDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__BYTES_DESC',
  PmmTokenStorageMetadataLiveByIdIdxStringAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__IDX_STRING_ASC',
  PmmTokenStorageMetadataLiveByIdIdxStringDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__IDX_STRING_DESC',
  PmmTokenStorageMetadataLiveByIdIdAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__ID_ASC',
  PmmTokenStorageMetadataLiveByIdIdDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__ID_DESC',
  PmmTokenStorageMetadataLiveByIdLevelAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__LEVEL_ASC',
  PmmTokenStorageMetadataLiveByIdLevelDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__LEVEL_DESC',
  PmmTokenStorageMetadataLiveByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageMetadataLiveByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageMetadataLiveByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageMetadataLiveByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmTokenStorageMetadataOrderedByIdBytesAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__BYTES_ASC',
  PmmTokenStorageMetadataOrderedByIdBytesDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__BYTES_DESC',
  PmmTokenStorageMetadataOrderedByIdDeletedAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__DELETED_ASC',
  PmmTokenStorageMetadataOrderedByIdDeletedDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__DELETED_DESC',
  PmmTokenStorageMetadataOrderedByIdIdxStringAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__IDX_STRING_ASC',
  PmmTokenStorageMetadataOrderedByIdIdxStringDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__IDX_STRING_DESC',
  PmmTokenStorageMetadataOrderedByIdIdAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__ID_ASC',
  PmmTokenStorageMetadataOrderedByIdIdDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__ID_DESC',
  PmmTokenStorageMetadataOrderedByIdLevelAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__LEVEL_ASC',
  PmmTokenStorageMetadataOrderedByIdLevelDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__LEVEL_DESC',
  PmmTokenStorageMetadataOrderedByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageMetadataOrderedByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageMetadataOrderedByIdOrderingAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__ORDERING_ASC',
  PmmTokenStorageMetadataOrderedByIdOrderingDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__ORDERING_DESC',
  PmmTokenStorageMetadataOrderedByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageMetadataOrderedByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageMetadataOrdered` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageMetadataOrderedCondition = {
  /** Checks for equality with the object’s `bytes` field. */
  bytes: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxString` field. */
  idxString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageMetadataOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageMetadataOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageMetadataOrderedFilter>>;
  /** Filter by the object’s `bytes` field. */
  bytes: Maybe<StringFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxString` field. */
  idxString: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageMetadataOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageMetadataOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageMetadataOrdered` */
export type PmmTokenStorageMetadataOrderedInput = {
  bytes: Maybe<Scalars['String']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageMetadataOrdered`. Fields that are set will be updated. */
export type PmmTokenStorageMetadataOrderedPatch = {
  bytes: Maybe<Scalars['String']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageMetadataOrdered`. */
export enum PmmTokenStorageMetadataOrderedsOrderBy {
  BytesAsc = 'BYTES_ASC',
  BytesDesc = 'BYTES_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxStringAsc = 'IDX_STRING_ASC',
  IdxStringDesc = 'IDX_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmTokenStorageMetadatumByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageMetadatumByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageMetadatumByIdBytesAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BYTES_ASC',
  PmmTokenStorageMetadatumByIdBytesDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__BYTES_DESC',
  PmmTokenStorageMetadatumByIdDeletedAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__DELETED_ASC',
  PmmTokenStorageMetadatumByIdDeletedDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__DELETED_DESC',
  PmmTokenStorageMetadatumByIdIdxStringAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__IDX_STRING_ASC',
  PmmTokenStorageMetadatumByIdIdxStringDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__IDX_STRING_DESC',
  PmmTokenStorageMetadatumByIdIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__ID_ASC',
  PmmTokenStorageMetadatumByIdIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__ID_DESC',
  PmmTokenStorageMetadatumByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageMetadatumByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_METADATUM_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageMetadatum` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageMetadatumCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `bytes` field. */
  bytes: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxString` field. */
  idxString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageMetadatum` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageMetadatumFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageMetadatumFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `bytes` field. */
  bytes: Maybe<StringFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxString` field. */
  idxString: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageMetadatumFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageMetadatumFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageMetadatum` */
export type PmmTokenStorageMetadatumInput = {
  bigmapId: Scalars['Int'];
  bytes: Maybe<Scalars['String']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageMetadatum`. Fields that are set will be updated. */
export type PmmTokenStorageMetadatumPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  bytes: Maybe<Scalars['String']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmTokenStorageOrdered` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageOrderedCondition = {
  /** Checks for equality with the object’s `administrator` field. */
  administrator: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `paused` field. */
  paused: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `totalSupply` field. */
  totalSupply: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageOrderedFilter = {
  /** Filter by the object’s `administrator` field. */
  administrator: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageOrderedFilter>>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `paused` field. */
  paused: Maybe<BooleanFilter>;
  /** Filter by the object’s `totalSupply` field. */
  totalSupply: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageOrdered` */
export type PmmTokenStorageOrderedInput = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageOrdered`. Fields that are set will be updated. */
export type PmmTokenStorageOrderedPatch = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageOrdered`. */
export enum PmmTokenStorageOrderedsOrderBy {
  AdministratorAsc = 'ADMINISTRATOR_ASC',
  AdministratorDesc = 'ADMINISTRATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PausedAsc = 'PAUSED_ASC',
  PausedDesc = 'PAUSED_DESC',
  PmmTokenStorageByIdAdministratorAsc = 'PMM_TOKEN_STORAGE_BY_ID__ADMINISTRATOR_ASC',
  PmmTokenStorageByIdAdministratorDesc = 'PMM_TOKEN_STORAGE_BY_ID__ADMINISTRATOR_DESC',
  PmmTokenStorageByIdIdAsc = 'PMM_TOKEN_STORAGE_BY_ID__ID_ASC',
  PmmTokenStorageByIdIdDesc = 'PMM_TOKEN_STORAGE_BY_ID__ID_DESC',
  PmmTokenStorageByIdPausedAsc = 'PMM_TOKEN_STORAGE_BY_ID__PAUSED_ASC',
  PmmTokenStorageByIdPausedDesc = 'PMM_TOKEN_STORAGE_BY_ID__PAUSED_DESC',
  PmmTokenStorageByIdTotalSupplyAsc = 'PMM_TOKEN_STORAGE_BY_ID__TOTAL_SUPPLY_ASC',
  PmmTokenStorageByIdTotalSupplyDesc = 'PMM_TOKEN_STORAGE_BY_ID__TOTAL_SUPPLY_DESC',
  PmmTokenStorageByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TotalSupplyAsc = 'TOTAL_SUPPLY_ASC',
  TotalSupplyDesc = 'TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Represents an update to a `PmmTokenStorage`. Fields that are set will be updated. */
export type PmmTokenStoragePatch = {
  administrator: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  paused: Maybe<Scalars['Boolean']>;
  totalSupply: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/**
 * A condition to be used against `PmmTokenStorageTokenMetadataLive` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageTokenMetadataLiveCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxNat` field. */
  idxNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `tokenId` field. */
  tokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageTokenMetadataLive` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageTokenMetadataLiveFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageTokenMetadataLiveFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxNat` field. */
  idxNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageTokenMetadataLiveFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageTokenMetadataLiveFilter>>;
  /** Filter by the object’s `tokenId` field. */
  tokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageTokenMetadataLive` */
export type PmmTokenStorageTokenMetadataLiveInput = {
  bigmapId: Scalars['Int'];
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageTokenMetadataLive`. Fields that are set will be updated. */
export type PmmTokenStorageTokenMetadataLivePatch = {
  bigmapId: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageTokenMetadataLive`. */
export enum PmmTokenStorageTokenMetadataLivesOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  IdxNatAsc = 'IDX_NAT_ASC',
  IdxNatDesc = 'IDX_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageTokenMetadatumByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageTokenMetadatumByIdDeletedAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__DELETED_ASC',
  PmmTokenStorageTokenMetadatumByIdDeletedDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__DELETED_DESC',
  PmmTokenStorageTokenMetadatumByIdIdxNatAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__IDX_NAT_ASC',
  PmmTokenStorageTokenMetadatumByIdIdxNatDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__IDX_NAT_DESC',
  PmmTokenStorageTokenMetadatumByIdIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__ID_ASC',
  PmmTokenStorageTokenMetadatumByIdIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__ID_DESC',
  PmmTokenStorageTokenMetadatumByIdTokenIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TOKEN_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdTokenIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TOKEN_ID_DESC',
  PmmTokenStorageTokenMetadatumByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/** Methods to use when ordering `PmmTokenStorageTokenMetadatum`. */
export enum PmmTokenStorageTokenMetadataOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxNatAsc = 'IDX_NAT_ASC',
  IdxNatDesc = 'IDX_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageTokenMetadataLiveByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageTokenMetadataLiveByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageTokenMetadataLiveByIdIdxNatAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__IDX_NAT_ASC',
  PmmTokenStorageTokenMetadataLiveByIdIdxNatDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__IDX_NAT_DESC',
  PmmTokenStorageTokenMetadataLiveByIdIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__ID_ASC',
  PmmTokenStorageTokenMetadataLiveByIdIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__ID_DESC',
  PmmTokenStorageTokenMetadataLiveByIdLevelAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__LEVEL_ASC',
  PmmTokenStorageTokenMetadataLiveByIdLevelDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__LEVEL_DESC',
  PmmTokenStorageTokenMetadataLiveByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageTokenMetadataLiveByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageTokenMetadataLiveByIdTokenIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__TOKEN_ID_ASC',
  PmmTokenStorageTokenMetadataLiveByIdTokenIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__TOKEN_ID_DESC',
  PmmTokenStorageTokenMetadataLiveByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageTokenMetadataLiveByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdDeletedAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__DELETED_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdDeletedDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__DELETED_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdIdxNatAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__IDX_NAT_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdIdxNatDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__IDX_NAT_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__ID_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__ID_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdLevelAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__LEVEL_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdLevelDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__LEVEL_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdOrderingAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__ORDERING_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdOrderingDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__ORDERING_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdTokenIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__TOKEN_ID_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdTokenIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__TOKEN_ID_DESC',
  PmmTokenStorageTokenMetadataOrderedByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageTokenMetadataOrderedByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PmmTokenStorageTokenMetadataTokenInfosByStorageTokenMetadataIdCountAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_TOKEN_INFOS_BY_STORAGE_TOKEN_METADATA_ID__COUNT_ASC',
  PmmTokenStorageTokenMetadataTokenInfosByStorageTokenMetadataIdCountDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_TOKEN_INFOS_BY_STORAGE_TOKEN_METADATA_ID__COUNT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageTokenMetadataOrdered` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageTokenMetadataOrderedCondition = {
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxNat` field. */
  idxNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokenId` field. */
  tokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageTokenMetadataOrdered` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageTokenMetadataOrderedFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageTokenMetadataOrderedFilter>>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxNat` field. */
  idxNat: Maybe<BigFloatFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<BigFloatFilter>;
  /** Filter by the object’s `levelTimestamp` field. */
  levelTimestamp: Maybe<DatetimeFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageTokenMetadataOrderedFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageTokenMetadataOrderedFilter>>;
  /** Filter by the object’s `ordering` field. */
  ordering: Maybe<BigFloatFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageTokenMetadataOrdered` */
export type PmmTokenStorageTokenMetadataOrderedInput = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageTokenMetadataOrdered`. Fields that are set will be updated. */
export type PmmTokenStorageTokenMetadataOrderedPatch = {
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  level: Maybe<Scalars['BigFloat']>;
  levelTimestamp: Maybe<Scalars['Datetime']>;
  ordering: Maybe<Scalars['BigFloat']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageTokenMetadataOrdered`. */
export enum PmmTokenStorageTokenMetadataOrderedsOrderBy {
  DeletedAsc = 'DELETED_ASC',
  DeletedDesc = 'DELETED_DESC',
  IdxNatAsc = 'IDX_NAT_ASC',
  IdxNatDesc = 'IDX_NAT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LevelTimestampAsc = 'LEVEL_TIMESTAMP_ASC',
  LevelTimestampDesc = 'LEVEL_TIMESTAMP_DESC',
  Natural = 'NATURAL',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  PmmTokenStorageTokenMetadatumByIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__BIGMAP_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__BIGMAP_ID_DESC',
  PmmTokenStorageTokenMetadatumByIdDeletedAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__DELETED_ASC',
  PmmTokenStorageTokenMetadatumByIdDeletedDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__DELETED_DESC',
  PmmTokenStorageTokenMetadatumByIdIdxNatAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__IDX_NAT_ASC',
  PmmTokenStorageTokenMetadatumByIdIdxNatDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__IDX_NAT_DESC',
  PmmTokenStorageTokenMetadatumByIdIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__ID_ASC',
  PmmTokenStorageTokenMetadatumByIdIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__ID_DESC',
  PmmTokenStorageTokenMetadatumByIdTokenIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TOKEN_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdTokenIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TOKEN_ID_DESC',
  PmmTokenStorageTokenMetadatumByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageTokenMetadatumByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageTokenMetadataTokenInfo` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageTokenMetadataTokenInfoCondition = {
  /** Checks for equality with the object’s `bytes` field. */
  bytes: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxString` field. */
  idxString: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `storageTokenMetadataId` field. */
  storageTokenMetadataId: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageTokenMetadataTokenInfo` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageTokenMetadataTokenInfoFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageTokenMetadataTokenInfoFilter>>;
  /** Filter by the object’s `bytes` field. */
  bytes: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxString` field. */
  idxString: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageTokenMetadataTokenInfoFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageTokenMetadataTokenInfoFilter>>;
  /** Filter by the object’s `storageTokenMetadataId` field. */
  storageTokenMetadataId: Maybe<BigIntFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageTokenMetadataTokenInfo` */
export type PmmTokenStorageTokenMetadataTokenInfoInput = {
  bytes: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  storageTokenMetadataId: Maybe<Scalars['BigInt']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageTokenMetadataTokenInfo`. Fields that are set will be updated. */
export type PmmTokenStorageTokenMetadataTokenInfoPatch = {
  bytes: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  idxString: Maybe<Scalars['String']>;
  storageTokenMetadataId: Maybe<Scalars['BigInt']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorageTokenMetadataTokenInfo`. */
export enum PmmTokenStorageTokenMetadataTokenInfosOrderBy {
  BytesAsc = 'BYTES_ASC',
  BytesDesc = 'BYTES_DESC',
  IdxStringAsc = 'IDX_STRING_ASC',
  IdxStringDesc = 'IDX_STRING_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdBigmapIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__BIGMAP_ID_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdBigmapIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__BIGMAP_ID_DESC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdDeletedAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__DELETED_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdDeletedDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__DELETED_DESC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdIdxNatAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__IDX_NAT_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdIdxNatDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__IDX_NAT_DESC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__ID_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__ID_DESC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdTokenIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__TOKEN_ID_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdTokenIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__TOKEN_ID_DESC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageTokenMetadatumByStorageTokenMetadataIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATUM_BY_STORAGE_TOKEN_METADATA_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  StorageTokenMetadataIdAsc = 'STORAGE_TOKEN_METADATA_ID_ASC',
  StorageTokenMetadataIdDesc = 'STORAGE_TOKEN_METADATA_ID_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PmmTokenStorageTokenMetadatum` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PmmTokenStorageTokenMetadatumCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deleted` field. */
  deleted: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `idxNat` field. */
  idxNat: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `tokenId` field. */
  tokenId: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PmmTokenStorageTokenMetadatum` object types. All fields are combined with a logical ‘and.’ */
export type PmmTokenStorageTokenMetadatumFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PmmTokenStorageTokenMetadatumFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `deleted` field. */
  deleted: Maybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `idxNat` field. */
  idxNat: Maybe<BigFloatFilter>;
  /** Negates the expression. */
  not: Maybe<PmmTokenStorageTokenMetadatumFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PmmTokenStorageTokenMetadatumFilter>>;
  /** Filter by the object’s `tokenId` field. */
  tokenId: Maybe<BigFloatFilter>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PmmTokenStorageTokenMetadatum` */
export type PmmTokenStorageTokenMetadatumInput = {
  bigmapId: Scalars['Int'];
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PmmTokenStorageTokenMetadatum`. Fields that are set will be updated. */
export type PmmTokenStorageTokenMetadatumPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['BigInt']>;
  idxNat: Maybe<Scalars['BigFloat']>;
  tokenId: Maybe<Scalars['BigFloat']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PmmTokenStorage`. */
export enum PmmTokenStoragesOrderBy {
  AdministratorAsc = 'ADMINISTRATOR_ASC',
  AdministratorDesc = 'ADMINISTRATOR_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PausedAsc = 'PAUSED_ASC',
  PausedDesc = 'PAUSED_DESC',
  PmmTokenStorageLiveByIdAdministratorAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__ADMINISTRATOR_ASC',
  PmmTokenStorageLiveByIdAdministratorDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__ADMINISTRATOR_DESC',
  PmmTokenStorageLiveByIdIdAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__ID_ASC',
  PmmTokenStorageLiveByIdIdDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__ID_DESC',
  PmmTokenStorageLiveByIdLevelAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__LEVEL_ASC',
  PmmTokenStorageLiveByIdLevelDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__LEVEL_DESC',
  PmmTokenStorageLiveByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageLiveByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageLiveByIdPausedAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__PAUSED_ASC',
  PmmTokenStorageLiveByIdPausedDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__PAUSED_DESC',
  PmmTokenStorageLiveByIdTotalSupplyAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__TOTAL_SUPPLY_ASC',
  PmmTokenStorageLiveByIdTotalSupplyDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__TOTAL_SUPPLY_DESC',
  PmmTokenStorageLiveByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageLiveByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_LIVE_BY_ID__TX_CONTEXT_ID_DESC',
  PmmTokenStorageOrderedByIdAdministratorAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ADMINISTRATOR_ASC',
  PmmTokenStorageOrderedByIdAdministratorDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ADMINISTRATOR_DESC',
  PmmTokenStorageOrderedByIdIdAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ID_ASC',
  PmmTokenStorageOrderedByIdIdDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ID_DESC',
  PmmTokenStorageOrderedByIdLevelAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__LEVEL_ASC',
  PmmTokenStorageOrderedByIdLevelDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__LEVEL_DESC',
  PmmTokenStorageOrderedByIdLevelTimestampAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__LEVEL_TIMESTAMP_ASC',
  PmmTokenStorageOrderedByIdLevelTimestampDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__LEVEL_TIMESTAMP_DESC',
  PmmTokenStorageOrderedByIdOrderingAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ORDERING_ASC',
  PmmTokenStorageOrderedByIdOrderingDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__ORDERING_DESC',
  PmmTokenStorageOrderedByIdPausedAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__PAUSED_ASC',
  PmmTokenStorageOrderedByIdPausedDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__PAUSED_DESC',
  PmmTokenStorageOrderedByIdTotalSupplyAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__TOTAL_SUPPLY_ASC',
  PmmTokenStorageOrderedByIdTotalSupplyDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__TOTAL_SUPPLY_DESC',
  PmmTokenStorageOrderedByIdTxContextIdAsc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__TX_CONTEXT_ID_ASC',
  PmmTokenStorageOrderedByIdTxContextIdDesc = 'PMM_TOKEN_STORAGE_ORDERED_BY_ID__TX_CONTEXT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TotalSupplyAsc = 'TOTAL_SUPPLY_ASC',
  TotalSupplyDesc = 'TOTAL_SUPPLY_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PublicBigmapKey` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PublicBigmapKeyCondition = {
  /** Checks for equality with the object’s `bigmapId` field. */
  bigmapId: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `key` field. */
  key: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `keyhash` field. */
  keyhash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txContextId` field. */
  txContextId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PublicBigmapKey` object types. All fields are combined with a logical ‘and.’ */
export type PublicBigmapKeyFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicBigmapKeyFilter>>;
  /** Filter by the object’s `bigmapId` field. */
  bigmapId: Maybe<IntFilter>;
  /** Filter by the object’s `key` field. */
  key: Maybe<StringFilter>;
  /** Filter by the object’s `keyhash` field. */
  keyhash: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PublicBigmapKeyFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicBigmapKeyFilter>>;
  /** Filter by the object’s `txContextId` field. */
  txContextId: Maybe<BigIntFilter>;
};

/** An input for mutations affecting `PublicBigmapKey` */
export type PublicBigmapKeyInput = {
  bigmapId: Scalars['Int'];
  key: Scalars['String'];
  keyhash: Scalars['String'];
  txContextId: Scalars['BigInt'];
};

/** Represents an update to a `PublicBigmapKey`. Fields that are set will be updated. */
export type PublicBigmapKeyPatch = {
  bigmapId: Maybe<Scalars['Int']>;
  key: Maybe<Scalars['String']>;
  keyhash: Maybe<Scalars['String']>;
  txContextId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PublicBigmapKey`. */
export enum PublicBigmapKeysOrderBy {
  BigmapIdAsc = 'BIGMAP_ID_ASC',
  BigmapIdDesc = 'BIGMAP_ID_DESC',
  KeyhashAsc = 'KEYHASH_ASC',
  KeyhashDesc = 'KEYHASH_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextByTxContextIdContentNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_ASC',
  PublicTxContextByTxContextIdContentNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTENT_NUMBER_DESC',
  PublicTxContextByTxContextIdContractAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_ASC',
  PublicTxContextByTxContextIdContractDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__CONTRACT_DESC',
  PublicTxContextByTxContextIdDestinationAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_ASC',
  PublicTxContextByTxContextIdDestinationDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__DESTINATION_DESC',
  PublicTxContextByTxContextIdEntrypointAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_ASC',
  PublicTxContextByTxContextIdEntrypointDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ENTRYPOINT_DESC',
  PublicTxContextByTxContextIdIdAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_ASC',
  PublicTxContextByTxContextIdIdDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__ID_DESC',
  PublicTxContextByTxContextIdInternalNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_ASC',
  PublicTxContextByTxContextIdInternalNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__INTERNAL_NUMBER_DESC',
  PublicTxContextByTxContextIdLevelAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_ASC',
  PublicTxContextByTxContextIdLevelDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC',
  PublicTxContextByTxContextIdOperationGroupNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationGroupNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_GROUP_NUMBER_DESC',
  PublicTxContextByTxContextIdOperationHashAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_ASC',
  PublicTxContextByTxContextIdOperationHashDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_HASH_DESC',
  PublicTxContextByTxContextIdOperationNumberAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_ASC',
  PublicTxContextByTxContextIdOperationNumberDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__OPERATION_NUMBER_DESC',
  PublicTxContextByTxContextIdSourceAsc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_ASC',
  PublicTxContextByTxContextIdSourceDesc = 'PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__SOURCE_DESC',
  TxContextIdAsc = 'TX_CONTEXT_ID_ASC',
  TxContextIdDesc = 'TX_CONTEXT_ID_DESC',
}

/**
 * A condition to be used against `PublicContract` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PublicContractCondition = {
  /** Checks for equality with the object’s `address` field. */
  address: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `name` field. */
  name: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `PublicContractDep` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PublicContractDepCondition = {
  /** Checks for equality with the object’s `destSchema` field. */
  destSchema: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `srcContract` field. */
  srcContract: Maybe<Scalars['String']>;
};

/** A filter to be used against `PublicContractDep` object types. All fields are combined with a logical ‘and.’ */
export type PublicContractDepFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicContractDepFilter>>;
  /** Filter by the object’s `destSchema` field. */
  destSchema: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<IntFilter>;
  /** Negates the expression. */
  not: Maybe<PublicContractDepFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicContractDepFilter>>;
  /** Filter by the object’s `srcContract` field. */
  srcContract: Maybe<StringFilter>;
};

/** An input for mutations affecting `PublicContractDep` */
export type PublicContractDepInput = {
  destSchema: Scalars['String'];
  level: Scalars['Int'];
  srcContract: Scalars['String'];
};

/** Represents an update to a `PublicContractDep`. Fields that are set will be updated. */
export type PublicContractDepPatch = {
  destSchema: Maybe<Scalars['String']>;
  level: Maybe<Scalars['Int']>;
  srcContract: Maybe<Scalars['String']>;
};

/** Methods to use when ordering `PublicContractDep`. */
export enum PublicContractDepsOrderBy {
  DestSchemaAsc = 'DEST_SCHEMA_ASC',
  DestSchemaDesc = 'DEST_SCHEMA_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SrcContractAsc = 'SRC_CONTRACT_ASC',
  SrcContractDesc = 'SRC_CONTRACT_DESC',
}

/** A filter to be used against `PublicContract` object types. All fields are combined with a logical ‘and.’ */
export type PublicContractFilter = {
  /** Filter by the object’s `address` field. */
  address: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicContractFilter>>;
  /** Filter by the object’s `name` field. */
  name: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PublicContractFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicContractFilter>>;
};

/** An input for mutations affecting `PublicContract` */
export type PublicContractInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

/**
 * A condition to be used against `PublicContractLevel` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type PublicContractLevelCondition = {
  /** Checks for equality with the object’s `contract` field. */
  contract: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isOrigination` field. */
  isOrigination: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['Int']>;
};

/** A filter to be used against `PublicContractLevel` object types. All fields are combined with a logical ‘and.’ */
export type PublicContractLevelFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicContractLevelFilter>>;
  /** Filter by the object’s `contract` field. */
  contract: Maybe<StringFilter>;
  /** Filter by the object’s `isOrigination` field. */
  isOrigination: Maybe<BooleanFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<IntFilter>;
  /** Negates the expression. */
  not: Maybe<PublicContractLevelFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicContractLevelFilter>>;
};

/** An input for mutations affecting `PublicContractLevel` */
export type PublicContractLevelInput = {
  contract: Scalars['String'];
  isOrigination: Maybe<Scalars['Boolean']>;
  level: Scalars['Int'];
};

/** Represents an update to a `PublicContractLevel`. Fields that are set will be updated. */
export type PublicContractLevelPatch = {
  contract: Maybe<Scalars['String']>;
  isOrigination: Maybe<Scalars['Boolean']>;
  level: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `PublicContractLevel`. */
export enum PublicContractLevelsOrderBy {
  ContractAsc = 'CONTRACT_ASC',
  ContractDesc = 'CONTRACT_DESC',
  IsOriginationAsc = 'IS_ORIGINATION_ASC',
  IsOriginationDesc = 'IS_ORIGINATION_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicContractByContractAddressAsc = 'PUBLIC_CONTRACT_BY_CONTRACT__ADDRESS_ASC',
  PublicContractByContractAddressDesc = 'PUBLIC_CONTRACT_BY_CONTRACT__ADDRESS_DESC',
  PublicContractByContractNameAsc = 'PUBLIC_CONTRACT_BY_CONTRACT__NAME_ASC',
  PublicContractByContractNameDesc = 'PUBLIC_CONTRACT_BY_CONTRACT__NAME_DESC',
}

/** Represents an update to a `PublicContract`. Fields that are set will be updated. */
export type PublicContractPatch = {
  address: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
};

/** Methods to use when ordering `PublicContract`. */
export enum PublicContractsOrderBy {
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicContractLevelsByContractCountAsc = 'PUBLIC_CONTRACT_LEVELS_BY_CONTRACT__COUNT_ASC',
  PublicContractLevelsByContractCountDesc = 'PUBLIC_CONTRACT_LEVELS_BY_CONTRACT__COUNT_DESC',
}

/**
 * A condition to be used against `PublicLeaderboard` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PublicLeaderboardCondition = {
  /** Checks for equality with the object’s `balance` field. */
  balance: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `idxAddress` field. */
  idxAddress: Maybe<Scalars['String']>;
};

/** A filter to be used against `PublicLeaderboard` object types. All fields are combined with a logical ‘and.’ */
export type PublicLeaderboardFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicLeaderboardFilter>>;
  /** Filter by the object’s `balance` field. */
  balance: Maybe<BigFloatFilter>;
  /** Filter by the object’s `idxAddress` field. */
  idxAddress: Maybe<StringFilter>;
  /** Negates the expression. */
  not: Maybe<PublicLeaderboardFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicLeaderboardFilter>>;
};

/** An input for mutations affecting `PublicLeaderboard` */
export type PublicLeaderboardInput = {
  balance: Maybe<Scalars['BigFloat']>;
  idxAddress: Maybe<Scalars['String']>;
};

/** Methods to use when ordering `PublicLeaderboard`. */
export enum PublicLeaderboardsOrderBy {
  BalanceAsc = 'BALANCE_ASC',
  BalanceDesc = 'BALANCE_DESC',
  IdxAddressAsc = 'IDX_ADDRESS_ASC',
  IdxAddressDesc = 'IDX_ADDRESS_DESC',
  Natural = 'NATURAL',
}

/**
 * A condition to be used against `PublicLevel` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PublicLevelCondition = {
  /** Checks for equality with the object’s `bakedAt` field. */
  bakedAt: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `hash` field. */
  hash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `prevHash` field. */
  prevHash: Maybe<Scalars['String']>;
};

/** A filter to be used against `PublicLevel` object types. All fields are combined with a logical ‘and.’ */
export type PublicLevelFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicLevelFilter>>;
  /** Filter by the object’s `bakedAt` field. */
  bakedAt: Maybe<DatetimeFilter>;
  /** Filter by the object’s `hash` field. */
  hash: Maybe<StringFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<IntFilter>;
  /** Negates the expression. */
  not: Maybe<PublicLevelFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicLevelFilter>>;
  /** Filter by the object’s `prevHash` field. */
  prevHash: Maybe<StringFilter>;
};

/** An input for mutations affecting `PublicLevel` */
export type PublicLevelInput = {
  bakedAt: Maybe<Scalars['Datetime']>;
  hash: Maybe<Scalars['String']>;
  level: Scalars['Int'];
  prevHash: Maybe<Scalars['String']>;
};

/** Represents an update to a `PublicLevel`. Fields that are set will be updated. */
export type PublicLevelPatch = {
  bakedAt: Maybe<Scalars['Datetime']>;
  hash: Maybe<Scalars['String']>;
  level: Maybe<Scalars['Int']>;
  prevHash: Maybe<Scalars['String']>;
};

/** Methods to use when ordering `PublicLevel`. */
export enum PublicLevelsOrderBy {
  BakedAtAsc = 'BAKED_AT_ASC',
  BakedAtDesc = 'BAKED_AT_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  Natural = 'NATURAL',
  PrevHashAsc = 'PREV_HASH_ASC',
  PrevHashDesc = 'PREV_HASH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicTxContextsByLevelCountAsc = 'PUBLIC_TX_CONTEXTS_BY_LEVEL__COUNT_ASC',
  PublicTxContextsByLevelCountDesc = 'PUBLIC_TX_CONTEXTS_BY_LEVEL__COUNT_DESC',
}

/**
 * A condition to be used against `PublicMaxId` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PublicMaxIdCondition = {
  /** Checks for equality with the object’s `maxId` field. */
  maxId: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `PublicMaxId` object types. All fields are combined with a logical ‘and.’ */
export type PublicMaxIdFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicMaxIdFilter>>;
  /** Filter by the object’s `maxId` field. */
  maxId: Maybe<BigIntFilter>;
  /** Negates the expression. */
  not: Maybe<PublicMaxIdFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicMaxIdFilter>>;
};

/** An input for mutations affecting `PublicMaxId` */
export type PublicMaxIdInput = {
  maxId: Maybe<Scalars['BigInt']>;
};

/** Methods to use when ordering `PublicMaxId`. */
export enum PublicMaxIdsOrderBy {
  MaxIdAsc = 'MAX_ID_ASC',
  MaxIdDesc = 'MAX_ID_DESC',
  Natural = 'NATURAL',
}

/**
 * A condition to be used against `PublicTxContext` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PublicTxContextCondition = {
  /** Checks for equality with the object’s `contentNumber` field. */
  contentNumber: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `contract` field. */
  contract: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `destination` field. */
  destination: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `entrypoint` field. */
  entrypoint: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `internalNumber` field. */
  internalNumber: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `level` field. */
  level: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `operationGroupNumber` field. */
  operationGroupNumber: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `operationHash` field. */
  operationHash: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `operationNumber` field. */
  operationNumber: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `source` field. */
  source: Maybe<Scalars['String']>;
};

/** A filter to be used against `PublicTxContext` object types. All fields are combined with a logical ‘and.’ */
export type PublicTxContextFilter = {
  /** Checks for all expressions in this list. */
  and: Maybe<Array<PublicTxContextFilter>>;
  /** Filter by the object’s `contentNumber` field. */
  contentNumber: Maybe<IntFilter>;
  /** Filter by the object’s `contract` field. */
  contract: Maybe<StringFilter>;
  /** Filter by the object’s `destination` field. */
  destination: Maybe<StringFilter>;
  /** Filter by the object’s `entrypoint` field. */
  entrypoint: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id: Maybe<BigIntFilter>;
  /** Filter by the object’s `internalNumber` field. */
  internalNumber: Maybe<IntFilter>;
  /** Filter by the object’s `level` field. */
  level: Maybe<IntFilter>;
  /** Negates the expression. */
  not: Maybe<PublicTxContextFilter>;
  /** Filter by the object’s `operationGroupNumber` field. */
  operationGroupNumber: Maybe<IntFilter>;
  /** Filter by the object’s `operationHash` field. */
  operationHash: Maybe<StringFilter>;
  /** Filter by the object’s `operationNumber` field. */
  operationNumber: Maybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or: Maybe<Array<PublicTxContextFilter>>;
  /** Filter by the object’s `source` field. */
  source: Maybe<StringFilter>;
};

/** An input for mutations affecting `PublicTxContext` */
export type PublicTxContextInput = {
  contentNumber: Scalars['Int'];
  contract: Scalars['String'];
  destination: Maybe<Scalars['String']>;
  entrypoint: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  internalNumber: Maybe<Scalars['Int']>;
  level: Scalars['Int'];
  operationGroupNumber: Scalars['Int'];
  operationHash: Scalars['String'];
  operationNumber: Scalars['Int'];
  source: Scalars['String'];
};

/** Represents an update to a `PublicTxContext`. Fields that are set will be updated. */
export type PublicTxContextPatch = {
  contentNumber: Maybe<Scalars['Int']>;
  contract: Maybe<Scalars['String']>;
  destination: Maybe<Scalars['String']>;
  entrypoint: Maybe<Scalars['String']>;
  id: Maybe<Scalars['BigInt']>;
  internalNumber: Maybe<Scalars['Int']>;
  level: Maybe<Scalars['Int']>;
  operationGroupNumber: Maybe<Scalars['Int']>;
  operationHash: Maybe<Scalars['String']>;
  operationNumber: Maybe<Scalars['Int']>;
  source: Maybe<Scalars['String']>;
};

/** Methods to use when ordering `PublicTxContext`. */
export enum PublicTxContextsOrderBy {
  ContentNumberAsc = 'CONTENT_NUMBER_ASC',
  ContentNumberDesc = 'CONTENT_NUMBER_DESC',
  ContractAsc = 'CONTRACT_ASC',
  ContractDesc = 'CONTRACT_DESC',
  DestinationAsc = 'DESTINATION_ASC',
  DestinationDesc = 'DESTINATION_DESC',
  EntrypointAsc = 'ENTRYPOINT_ASC',
  EntrypointDesc = 'ENTRYPOINT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InternalNumberAsc = 'INTERNAL_NUMBER_ASC',
  InternalNumberDesc = 'INTERNAL_NUMBER_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  Natural = 'NATURAL',
  OperationGroupNumberAsc = 'OPERATION_GROUP_NUMBER_ASC',
  OperationGroupNumberDesc = 'OPERATION_GROUP_NUMBER_DESC',
  OperationHashAsc = 'OPERATION_HASH_ASC',
  OperationHashDesc = 'OPERATION_HASH_DESC',
  OperationNumberAsc = 'OPERATION_NUMBER_ASC',
  OperationNumberDesc = 'OPERATION_NUMBER_DESC',
  PmmBigmapClearsByTxContextIdCountAsc = 'PMM_BIGMAP_CLEARS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmBigmapClearsByTxContextIdCountDesc = 'PMM_BIGMAP_CLEARS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStoragesByTxContextIdCountAsc = 'PMM_STORAGES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStoragesByTxContextIdCountDesc = 'PMM_STORAGES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa2LivesByTxContextIdCountAsc = 'PMM_STORAGE_FA2_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa2LivesByTxContextIdCountDesc = 'PMM_STORAGE_FA2_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa2OrderedsByTxContextIdCountAsc = 'PMM_STORAGE_FA2_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa2OrderedsByTxContextIdCountDesc = 'PMM_STORAGE_FA2_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa2SByTxContextIdCountAsc = 'PMM_STORAGE_FA2_S_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa2SByTxContextIdCountDesc = 'PMM_STORAGE_FA2_S_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa12LivesByTxContextIdCountAsc = 'PMM_STORAGE_FA12_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa12LivesByTxContextIdCountDesc = 'PMM_STORAGE_FA12_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa12OrderedsByTxContextIdCountAsc = 'PMM_STORAGE_FA12_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa12OrderedsByTxContextIdCountDesc = 'PMM_STORAGE_FA12_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageFa12SByTxContextIdCountAsc = 'PMM_STORAGE_FA12_S_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageFa12SByTxContextIdCountDesc = 'PMM_STORAGE_FA12_S_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLambdaMapsByTxContextIdCountAsc = 'PMM_STORAGE_LAMBDA_MAPS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLambdaMapsByTxContextIdCountDesc = 'PMM_STORAGE_LAMBDA_MAPS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLambdaMapLivesByTxContextIdCountAsc = 'PMM_STORAGE_LAMBDA_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLambdaMapLivesByTxContextIdCountDesc = 'PMM_STORAGE_LAMBDA_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLambdaMapOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_LAMBDA_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLambdaMapOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_LAMBDA_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLedgerMapsByTxContextIdCountAsc = 'PMM_STORAGE_LEDGER_MAPS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLedgerMapsByTxContextIdCountDesc = 'PMM_STORAGE_LEDGER_MAPS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLedgerMapLivesByTxContextIdCountAsc = 'PMM_STORAGE_LEDGER_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLedgerMapLivesByTxContextIdCountDesc = 'PMM_STORAGE_LEDGER_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLedgerMapOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_LEDGER_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLedgerMapOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_LEDGER_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapsByTxContextIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAPS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapsByTxContextIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAPS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapBetsByTxContextIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BETS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapBetsByTxContextIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_BETS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtsByTxContextIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIQUIDITY_REWARD_UPDATED_ATS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtsByTxContextIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIQUIDITY_REWARD_UPDATED_ATS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapLivesByTxContextIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapLivesByTxContextIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLiquidityProviderMapOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLiquidityProviderMapOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_LIQUIDITY_PROVIDER_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageLivesByTxContextIdCountAsc = 'PMM_STORAGE_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageLivesByTxContextIdCountDesc = 'PMM_STORAGE_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapsByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAPS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapsByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAPS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapAuctionrunningsByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_AUCTIONRUNNINGS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapAuctionrunningsByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_AUCTIONRUNNINGS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapFa2SByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_FA2_S_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapFa2SByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_FA2_S_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapFa12SByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_FA12_S_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapFa12SByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_FA12_S_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapLivesByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapLivesByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapMarketbootstrappedsByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_MARKETBOOTSTRAPPEDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapMarketbootstrappedsByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_MARKETBOOTSTRAPPEDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageMarketMapOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_MARKET_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageMarketMapOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_MARKET_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageSupplyMapsByTxContextIdCountAsc = 'PMM_STORAGE_SUPPLY_MAPS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageSupplyMapsByTxContextIdCountDesc = 'PMM_STORAGE_SUPPLY_MAPS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageSupplyMapLivesByTxContextIdCountAsc = 'PMM_STORAGE_SUPPLY_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageSupplyMapLivesByTxContextIdCountDesc = 'PMM_STORAGE_SUPPLY_MAP_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmStorageSupplyMapOrderedsByTxContextIdCountAsc = 'PMM_STORAGE_SUPPLY_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmStorageSupplyMapOrderedsByTxContextIdCountDesc = 'PMM_STORAGE_SUPPLY_MAP_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenBigmapClearsByTxContextIdCountAsc = 'PMM_TOKEN_BIGMAP_CLEARS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenBigmapClearsByTxContextIdCountDesc = 'PMM_TOKEN_BIGMAP_CLEARS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStoragesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStoragesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageBalancesApprovalsByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_BALANCES_APPROVALS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageBalancesApprovalsByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_BALANCES_APPROVALS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageBalancesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_BALANCES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageBalancesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_BALANCES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageBalancesLivesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_BALANCES_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageBalancesLivesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_BALANCES_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageBalancesOrderedsByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_BALANCES_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageBalancesOrderedsByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_BALANCES_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageLivesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageLivesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageMetadataByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_METADATA_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageMetadataByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_METADATA_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageMetadataLivesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_METADATA_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageMetadataLivesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_METADATA_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageMetadataOrderedsByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_METADATA_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageMetadataOrderedsByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_METADATA_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageOrderedsByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageOrderedsByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageTokenMetadataByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageTokenMetadataByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageTokenMetadataLivesByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVES_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageTokenMetadataLivesByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_LIVES_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageTokenMetadataOrderedsByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageTokenMetadataOrderedsByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_ORDEREDS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PmmTokenStorageTokenMetadataTokenInfosByTxContextIdCountAsc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_TOKEN_INFOS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PmmTokenStorageTokenMetadataTokenInfosByTxContextIdCountDesc = 'PMM_TOKEN_STORAGE_TOKEN_METADATA_TOKEN_INFOS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PublicBigmapKeysByTxContextIdCountAsc = 'PUBLIC_BIGMAP_KEYS_BY_TX_CONTEXT_ID__COUNT_ASC',
  PublicBigmapKeysByTxContextIdCountDesc = 'PUBLIC_BIGMAP_KEYS_BY_TX_CONTEXT_ID__COUNT_DESC',
  PublicLevelByLevelBakedAtAsc = 'PUBLIC_LEVEL_BY_LEVEL__BAKED_AT_ASC',
  PublicLevelByLevelBakedAtDesc = 'PUBLIC_LEVEL_BY_LEVEL__BAKED_AT_DESC',
  PublicLevelByLevelHashAsc = 'PUBLIC_LEVEL_BY_LEVEL__HASH_ASC',
  PublicLevelByLevelHashDesc = 'PUBLIC_LEVEL_BY_LEVEL__HASH_DESC',
  PublicLevelByLevelLevelAsc = 'PUBLIC_LEVEL_BY_LEVEL__LEVEL_ASC',
  PublicLevelByLevelLevelDesc = 'PUBLIC_LEVEL_BY_LEVEL__LEVEL_DESC',
  PublicLevelByLevelPrevHashAsc = 'PUBLIC_LEVEL_BY_LEVEL__PREV_HASH_ASC',
  PublicLevelByLevelPrevHashDesc = 'PUBLIC_LEVEL_BY_LEVEL__PREV_HASH_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive: Maybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in: Maybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive: Maybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive: Maybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan: Maybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive: Maybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive: Maybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive: Maybe<Scalars['String']>;
};

/** All input for the `updatePmmBigmapClearById` mutation. */
export type UpdatePmmBigmapClearByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmBigmapClear` being updated. */
  pmmBigmapClearPatch: PmmBigmapClearPatch;
};

/** All input for the `updatePmmBigmapClear` mutation. */
export type UpdatePmmBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmBigmapClear` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmBigmapClear` being updated. */
  pmmBigmapClearPatch: PmmBigmapClearPatch;
};

/** All input for the `updatePmmStorageById` mutation. */
export type UpdatePmmStorageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorage` being updated. */
  pmmStoragePatch: PmmStoragePatch;
};

/** All input for the `updatePmmStorageFa2ById` mutation. */
export type UpdatePmmStorageFa2ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa2` being updated. */
  pmmStorageFa2Patch: PmmStorageFa2Patch;
};

/** All input for the `updatePmmStorageFa2` mutation. */
export type UpdatePmmStorageFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa2` being updated. */
  pmmStorageFa2Patch: PmmStorageFa2Patch;
};

/** All input for the `updatePmmStorageFa2LiveById` mutation. */
export type UpdatePmmStorageFa2LiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa2Live` being updated. */
  pmmStorageFa2LivePatch: PmmStorageFa2LivePatch;
};

/** All input for the `updatePmmStorageFa2Live` mutation. */
export type UpdatePmmStorageFa2LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2Live` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa2Live` being updated. */
  pmmStorageFa2LivePatch: PmmStorageFa2LivePatch;
};

/** All input for the `updatePmmStorageFa2OrderedById` mutation. */
export type UpdatePmmStorageFa2OrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa2Ordered` being updated. */
  pmmStorageFa2OrderedPatch: PmmStorageFa2OrderedPatch;
};

/** All input for the `updatePmmStorageFa2Ordered` mutation. */
export type UpdatePmmStorageFa2OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa2Ordered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa2Ordered` being updated. */
  pmmStorageFa2OrderedPatch: PmmStorageFa2OrderedPatch;
};

/** All input for the `updatePmmStorageFa12ById` mutation. */
export type UpdatePmmStorageFa12ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa12` being updated. */
  pmmStorageFa12Patch: PmmStorageFa12Patch;
};

/** All input for the `updatePmmStorageFa12` mutation. */
export type UpdatePmmStorageFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa12` being updated. */
  pmmStorageFa12Patch: PmmStorageFa12Patch;
};

/** All input for the `updatePmmStorageFa12LiveById` mutation. */
export type UpdatePmmStorageFa12LiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa12Live` being updated. */
  pmmStorageFa12LivePatch: PmmStorageFa12LivePatch;
};

/** All input for the `updatePmmStorageFa12Live` mutation. */
export type UpdatePmmStorageFa12LiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12Live` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa12Live` being updated. */
  pmmStorageFa12LivePatch: PmmStorageFa12LivePatch;
};

/** All input for the `updatePmmStorageFa12OrderedById` mutation. */
export type UpdatePmmStorageFa12OrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageFa12Ordered` being updated. */
  pmmStorageFa12OrderedPatch: PmmStorageFa12OrderedPatch;
};

/** All input for the `updatePmmStorageFa12Ordered` mutation. */
export type UpdatePmmStorageFa12OrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageFa12Ordered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageFa12Ordered` being updated. */
  pmmStorageFa12OrderedPatch: PmmStorageFa12OrderedPatch;
};

/** All input for the `updatePmmStorage` mutation. */
export type UpdatePmmStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorage` being updated. */
  pmmStoragePatch: PmmStoragePatch;
};

/** All input for the `updatePmmStorageLambdaMapById` mutation. */
export type UpdatePmmStorageLambdaMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMap` being updated. */
  pmmStorageLambdaMapPatch: PmmStorageLambdaMapPatch;
};

/** All input for the `updatePmmStorageLambdaMap` mutation. */
export type UpdatePmmStorageLambdaMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMap` being updated. */
  pmmStorageLambdaMapPatch: PmmStorageLambdaMapPatch;
};

/** All input for the `updatePmmStorageLambdaMapLiveById` mutation. */
export type UpdatePmmStorageLambdaMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMapLive` being updated. */
  pmmStorageLambdaMapLivePatch: PmmStorageLambdaMapLivePatch;
};

/** All input for the `updatePmmStorageLambdaMapLive` mutation. */
export type UpdatePmmStorageLambdaMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMapLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMapLive` being updated. */
  pmmStorageLambdaMapLivePatch: PmmStorageLambdaMapLivePatch;
};

/** All input for the `updatePmmStorageLambdaMapOrderedById` mutation. */
export type UpdatePmmStorageLambdaMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMapOrdered` being updated. */
  pmmStorageLambdaMapOrderedPatch: PmmStorageLambdaMapOrderedPatch;
};

/** All input for the `updatePmmStorageLambdaMapOrdered` mutation. */
export type UpdatePmmStorageLambdaMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLambdaMapOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLambdaMapOrdered` being updated. */
  pmmStorageLambdaMapOrderedPatch: PmmStorageLambdaMapOrderedPatch;
};

/** All input for the `updatePmmStorageLedgerMapById` mutation. */
export type UpdatePmmStorageLedgerMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMap` being updated. */
  pmmStorageLedgerMapPatch: PmmStorageLedgerMapPatch;
};

/** All input for the `updatePmmStorageLedgerMap` mutation. */
export type UpdatePmmStorageLedgerMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMap` being updated. */
  pmmStorageLedgerMapPatch: PmmStorageLedgerMapPatch;
};

/** All input for the `updatePmmStorageLedgerMapLiveById` mutation. */
export type UpdatePmmStorageLedgerMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMapLive` being updated. */
  pmmStorageLedgerMapLivePatch: PmmStorageLedgerMapLivePatch;
};

/** All input for the `updatePmmStorageLedgerMapLive` mutation. */
export type UpdatePmmStorageLedgerMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMapLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMapLive` being updated. */
  pmmStorageLedgerMapLivePatch: PmmStorageLedgerMapLivePatch;
};

/** All input for the `updatePmmStorageLedgerMapOrderedById` mutation. */
export type UpdatePmmStorageLedgerMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMapOrdered` being updated. */
  pmmStorageLedgerMapOrderedPatch: PmmStorageLedgerMapOrderedPatch;
};

/** All input for the `updatePmmStorageLedgerMapOrdered` mutation. */
export type UpdatePmmStorageLedgerMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLedgerMapOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLedgerMapOrdered` being updated. */
  pmmStorageLedgerMapOrderedPatch: PmmStorageLedgerMapOrderedPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapBetById` mutation. */
export type UpdatePmmStorageLiquidityProviderMapBetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapBet` being updated. */
  pmmStorageLiquidityProviderMapBetPatch: PmmStorageLiquidityProviderMapBetPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapBet` mutation. */
export type UpdatePmmStorageLiquidityProviderMapBetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapBet` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapBet` being updated. */
  pmmStorageLiquidityProviderMapBetPatch: PmmStorageLiquidityProviderMapBetPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapById` mutation. */
export type UpdatePmmStorageLiquidityProviderMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMap` being updated. */
  pmmStorageLiquidityProviderMapPatch: PmmStorageLiquidityProviderMapPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMap` mutation. */
export type UpdatePmmStorageLiquidityProviderMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMap` being updated. */
  pmmStorageLiquidityProviderMapPatch: PmmStorageLiquidityProviderMapPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtById` mutation. */
export type UpdatePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /**
   * An object where the defined keys will be set on the
   * `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` being updated.
   */
  pmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtPatch: PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` mutation. */
export type UpdatePmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /**
   * The globally unique `ID` which will identify a single
   * `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` to be updated.
   */
  nodeId: Scalars['ID'];
  /**
   * An object where the defined keys will be set on the
   * `PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAt` being updated.
   */
  pmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtPatch: PmmStorageLiquidityProviderMapLiquidityRewardUpdatedAtPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapLiveById` mutation. */
export type UpdatePmmStorageLiquidityProviderMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapLive` being updated. */
  pmmStorageLiquidityProviderMapLivePatch: PmmStorageLiquidityProviderMapLivePatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapLive` mutation. */
export type UpdatePmmStorageLiquidityProviderMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapLive` being updated. */
  pmmStorageLiquidityProviderMapLivePatch: PmmStorageLiquidityProviderMapLivePatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapOrderedById` mutation. */
export type UpdatePmmStorageLiquidityProviderMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapOrdered` being updated. */
  pmmStorageLiquidityProviderMapOrderedPatch: PmmStorageLiquidityProviderMapOrderedPatch;
};

/** All input for the `updatePmmStorageLiquidityProviderMapOrdered` mutation. */
export type UpdatePmmStorageLiquidityProviderMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLiquidityProviderMapOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLiquidityProviderMapOrdered` being updated. */
  pmmStorageLiquidityProviderMapOrderedPatch: PmmStorageLiquidityProviderMapOrderedPatch;
};

/** All input for the `updatePmmStorageLiveById` mutation. */
export type UpdatePmmStorageLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageLive` being updated. */
  pmmStorageLivePatch: PmmStorageLivePatch;
};

/** All input for the `updatePmmStorageLive` mutation. */
export type UpdatePmmStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageLive` being updated. */
  pmmStorageLivePatch: PmmStorageLivePatch;
};

/** All input for the `updatePmmStorageMarketMapAuctionrunningById` mutation. */
export type UpdatePmmStorageMarketMapAuctionrunningByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapAuctionrunning` being updated. */
  pmmStorageMarketMapAuctionrunningPatch: PmmStorageMarketMapAuctionrunningPatch;
};

/** All input for the `updatePmmStorageMarketMapAuctionrunning` mutation. */
export type UpdatePmmStorageMarketMapAuctionrunningInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapAuctionrunning` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapAuctionrunning` being updated. */
  pmmStorageMarketMapAuctionrunningPatch: PmmStorageMarketMapAuctionrunningPatch;
};

/** All input for the `updatePmmStorageMarketMapById` mutation. */
export type UpdatePmmStorageMarketMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMap` being updated. */
  pmmStorageMarketMapPatch: PmmStorageMarketMapPatch;
};

/** All input for the `updatePmmStorageMarketMapFa2ById` mutation. */
export type UpdatePmmStorageMarketMapFa2ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapFa2` being updated. */
  pmmStorageMarketMapFa2Patch: PmmStorageMarketMapFa2Patch;
};

/** All input for the `updatePmmStorageMarketMapFa2` mutation. */
export type UpdatePmmStorageMarketMapFa2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapFa2` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapFa2` being updated. */
  pmmStorageMarketMapFa2Patch: PmmStorageMarketMapFa2Patch;
};

/** All input for the `updatePmmStorageMarketMapFa12ById` mutation. */
export type UpdatePmmStorageMarketMapFa12ByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapFa12` being updated. */
  pmmStorageMarketMapFa12Patch: PmmStorageMarketMapFa12Patch;
};

/** All input for the `updatePmmStorageMarketMapFa12` mutation. */
export type UpdatePmmStorageMarketMapFa12Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapFa12` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapFa12` being updated. */
  pmmStorageMarketMapFa12Patch: PmmStorageMarketMapFa12Patch;
};

/** All input for the `updatePmmStorageMarketMap` mutation. */
export type UpdatePmmStorageMarketMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMap` being updated. */
  pmmStorageMarketMapPatch: PmmStorageMarketMapPatch;
};

/** All input for the `updatePmmStorageMarketMapLiveById` mutation. */
export type UpdatePmmStorageMarketMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapLive` being updated. */
  pmmStorageMarketMapLivePatch: PmmStorageMarketMapLivePatch;
};

/** All input for the `updatePmmStorageMarketMapLive` mutation. */
export type UpdatePmmStorageMarketMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapLive` being updated. */
  pmmStorageMarketMapLivePatch: PmmStorageMarketMapLivePatch;
};

/** All input for the `updatePmmStorageMarketMapMarketbootstrappedById` mutation. */
export type UpdatePmmStorageMarketMapMarketbootstrappedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapMarketbootstrapped` being updated. */
  pmmStorageMarketMapMarketbootstrappedPatch: PmmStorageMarketMapMarketbootstrappedPatch;
};

/** All input for the `updatePmmStorageMarketMapMarketbootstrapped` mutation. */
export type UpdatePmmStorageMarketMapMarketbootstrappedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapMarketbootstrapped` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapMarketbootstrapped` being updated. */
  pmmStorageMarketMapMarketbootstrappedPatch: PmmStorageMarketMapMarketbootstrappedPatch;
};

/** All input for the `updatePmmStorageMarketMapOrderedById` mutation. */
export type UpdatePmmStorageMarketMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapOrdered` being updated. */
  pmmStorageMarketMapOrderedPatch: PmmStorageMarketMapOrderedPatch;
};

/** All input for the `updatePmmStorageMarketMapOrdered` mutation. */
export type UpdatePmmStorageMarketMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageMarketMapOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageMarketMapOrdered` being updated. */
  pmmStorageMarketMapOrderedPatch: PmmStorageMarketMapOrderedPatch;
};

/** All input for the `updatePmmStorageOrderedById` mutation. */
export type UpdatePmmStorageOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageOrdered` being updated. */
  pmmStorageOrderedPatch: PmmStorageOrderedPatch;
};

/** All input for the `updatePmmStorageOrdered` mutation. */
export type UpdatePmmStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageOrdered` being updated. */
  pmmStorageOrderedPatch: PmmStorageOrderedPatch;
};

/** All input for the `updatePmmStorageSupplyMapById` mutation. */
export type UpdatePmmStorageSupplyMapByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMap` being updated. */
  pmmStorageSupplyMapPatch: PmmStorageSupplyMapPatch;
};

/** All input for the `updatePmmStorageSupplyMap` mutation. */
export type UpdatePmmStorageSupplyMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMap` being updated. */
  pmmStorageSupplyMapPatch: PmmStorageSupplyMapPatch;
};

/** All input for the `updatePmmStorageSupplyMapLiveById` mutation. */
export type UpdatePmmStorageSupplyMapLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMapLive` being updated. */
  pmmStorageSupplyMapLivePatch: PmmStorageSupplyMapLivePatch;
};

/** All input for the `updatePmmStorageSupplyMapLive` mutation. */
export type UpdatePmmStorageSupplyMapLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMapLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMapLive` being updated. */
  pmmStorageSupplyMapLivePatch: PmmStorageSupplyMapLivePatch;
};

/** All input for the `updatePmmStorageSupplyMapOrderedById` mutation. */
export type UpdatePmmStorageSupplyMapOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMapOrdered` being updated. */
  pmmStorageSupplyMapOrderedPatch: PmmStorageSupplyMapOrderedPatch;
};

/** All input for the `updatePmmStorageSupplyMapOrdered` mutation. */
export type UpdatePmmStorageSupplyMapOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmStorageSupplyMapOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmStorageSupplyMapOrdered` being updated. */
  pmmStorageSupplyMapOrderedPatch: PmmStorageSupplyMapOrderedPatch;
};

/** All input for the `updatePmmTokenBigmapClearById` mutation. */
export type UpdatePmmTokenBigmapClearByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenBigmapClear` being updated. */
  pmmTokenBigmapClearPatch: PmmTokenBigmapClearPatch;
};

/** All input for the `updatePmmTokenBigmapClear` mutation. */
export type UpdatePmmTokenBigmapClearInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenBigmapClear` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenBigmapClear` being updated. */
  pmmTokenBigmapClearPatch: PmmTokenBigmapClearPatch;
};

/** All input for the `updatePmmTokenStorageBalanceById` mutation. */
export type UpdatePmmTokenStorageBalanceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalance` being updated. */
  pmmTokenStorageBalancePatch: PmmTokenStorageBalancePatch;
};

/** All input for the `updatePmmTokenStorageBalance` mutation. */
export type UpdatePmmTokenStorageBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalance` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalance` being updated. */
  pmmTokenStorageBalancePatch: PmmTokenStorageBalancePatch;
};

/** All input for the `updatePmmTokenStorageBalancesApprovalById` mutation. */
export type UpdatePmmTokenStorageBalancesApprovalByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesApproval` being updated. */
  pmmTokenStorageBalancesApprovalPatch: PmmTokenStorageBalancesApprovalPatch;
};

/** All input for the `updatePmmTokenStorageBalancesApproval` mutation. */
export type UpdatePmmTokenStorageBalancesApprovalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesApproval` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesApproval` being updated. */
  pmmTokenStorageBalancesApprovalPatch: PmmTokenStorageBalancesApprovalPatch;
};

/** All input for the `updatePmmTokenStorageBalancesLiveById` mutation. */
export type UpdatePmmTokenStorageBalancesLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesLive` being updated. */
  pmmTokenStorageBalancesLivePatch: PmmTokenStorageBalancesLivePatch;
};

/** All input for the `updatePmmTokenStorageBalancesLive` mutation. */
export type UpdatePmmTokenStorageBalancesLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesLive` being updated. */
  pmmTokenStorageBalancesLivePatch: PmmTokenStorageBalancesLivePatch;
};

/** All input for the `updatePmmTokenStorageBalancesOrderedById` mutation. */
export type UpdatePmmTokenStorageBalancesOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesOrdered` being updated. */
  pmmTokenStorageBalancesOrderedPatch: PmmTokenStorageBalancesOrderedPatch;
};

/** All input for the `updatePmmTokenStorageBalancesOrdered` mutation. */
export type UpdatePmmTokenStorageBalancesOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageBalancesOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageBalancesOrdered` being updated. */
  pmmTokenStorageBalancesOrderedPatch: PmmTokenStorageBalancesOrderedPatch;
};

/** All input for the `updatePmmTokenStorageById` mutation. */
export type UpdatePmmTokenStorageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorage` being updated. */
  pmmTokenStoragePatch: PmmTokenStoragePatch;
};

/** All input for the `updatePmmTokenStorage` mutation. */
export type UpdatePmmTokenStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorage` being updated. */
  pmmTokenStoragePatch: PmmTokenStoragePatch;
};

/** All input for the `updatePmmTokenStorageLiveById` mutation. */
export type UpdatePmmTokenStorageLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageLive` being updated. */
  pmmTokenStorageLivePatch: PmmTokenStorageLivePatch;
};

/** All input for the `updatePmmTokenStorageLive` mutation. */
export type UpdatePmmTokenStorageLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageLive` being updated. */
  pmmTokenStorageLivePatch: PmmTokenStorageLivePatch;
};

/** All input for the `updatePmmTokenStorageMetadataLiveById` mutation. */
export type UpdatePmmTokenStorageMetadataLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadataLive` being updated. */
  pmmTokenStorageMetadataLivePatch: PmmTokenStorageMetadataLivePatch;
};

/** All input for the `updatePmmTokenStorageMetadataLive` mutation. */
export type UpdatePmmTokenStorageMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadataLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadataLive` being updated. */
  pmmTokenStorageMetadataLivePatch: PmmTokenStorageMetadataLivePatch;
};

/** All input for the `updatePmmTokenStorageMetadataOrderedById` mutation. */
export type UpdatePmmTokenStorageMetadataOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadataOrdered` being updated. */
  pmmTokenStorageMetadataOrderedPatch: PmmTokenStorageMetadataOrderedPatch;
};

/** All input for the `updatePmmTokenStorageMetadataOrdered` mutation. */
export type UpdatePmmTokenStorageMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadataOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadataOrdered` being updated. */
  pmmTokenStorageMetadataOrderedPatch: PmmTokenStorageMetadataOrderedPatch;
};

/** All input for the `updatePmmTokenStorageMetadatumById` mutation. */
export type UpdatePmmTokenStorageMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadatum` being updated. */
  pmmTokenStorageMetadatumPatch: PmmTokenStorageMetadatumPatch;
};

/** All input for the `updatePmmTokenStorageMetadatum` mutation. */
export type UpdatePmmTokenStorageMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageMetadatum` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageMetadatum` being updated. */
  pmmTokenStorageMetadatumPatch: PmmTokenStorageMetadatumPatch;
};

/** All input for the `updatePmmTokenStorageOrderedById` mutation. */
export type UpdatePmmTokenStorageOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageOrdered` being updated. */
  pmmTokenStorageOrderedPatch: PmmTokenStorageOrderedPatch;
};

/** All input for the `updatePmmTokenStorageOrdered` mutation. */
export type UpdatePmmTokenStorageOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageOrdered` being updated. */
  pmmTokenStorageOrderedPatch: PmmTokenStorageOrderedPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataLiveById` mutation. */
export type UpdatePmmTokenStorageTokenMetadataLiveByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataLive` being updated. */
  pmmTokenStorageTokenMetadataLivePatch: PmmTokenStorageTokenMetadataLivePatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataLive` mutation. */
export type UpdatePmmTokenStorageTokenMetadataLiveInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataLive` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataLive` being updated. */
  pmmTokenStorageTokenMetadataLivePatch: PmmTokenStorageTokenMetadataLivePatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataOrderedById` mutation. */
export type UpdatePmmTokenStorageTokenMetadataOrderedByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataOrdered` being updated. */
  pmmTokenStorageTokenMetadataOrderedPatch: PmmTokenStorageTokenMetadataOrderedPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataOrdered` mutation. */
export type UpdatePmmTokenStorageTokenMetadataOrderedInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataOrdered` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataOrdered` being updated. */
  pmmTokenStorageTokenMetadataOrderedPatch: PmmTokenStorageTokenMetadataOrderedPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataTokenInfoById` mutation. */
export type UpdatePmmTokenStorageTokenMetadataTokenInfoByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataTokenInfo` being updated. */
  pmmTokenStorageTokenMetadataTokenInfoPatch: PmmTokenStorageTokenMetadataTokenInfoPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadataTokenInfo` mutation. */
export type UpdatePmmTokenStorageTokenMetadataTokenInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadataTokenInfo` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadataTokenInfo` being updated. */
  pmmTokenStorageTokenMetadataTokenInfoPatch: PmmTokenStorageTokenMetadataTokenInfoPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadatumById` mutation. */
export type UpdatePmmTokenStorageTokenMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadatum` being updated. */
  pmmTokenStorageTokenMetadatumPatch: PmmTokenStorageTokenMetadatumPatch;
};

/** All input for the `updatePmmTokenStorageTokenMetadatum` mutation. */
export type UpdatePmmTokenStorageTokenMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PmmTokenStorageTokenMetadatum` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PmmTokenStorageTokenMetadatum` being updated. */
  pmmTokenStorageTokenMetadatumPatch: PmmTokenStorageTokenMetadatumPatch;
};

/** All input for the `updatePublicBigmapKeyByBigmapIdAndTxContextIdAndKeyhash` mutation. */
export type UpdatePublicBigmapKeyByBigmapIdAndTxContextIdAndKeyhashInput = {
  bigmapId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  keyhash: Scalars['String'];
  /** An object where the defined keys will be set on the `PublicBigmapKey` being updated. */
  publicBigmapKeyPatch: PublicBigmapKeyPatch;
  txContextId: Scalars['BigInt'];
};

/** All input for the `updatePublicBigmapKey` mutation. */
export type UpdatePublicBigmapKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicBigmapKey` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicBigmapKey` being updated. */
  publicBigmapKeyPatch: PublicBigmapKeyPatch;
};

/** All input for the `updatePublicContractByAddress` mutation. */
export type UpdatePublicContractByAddressInput = {
  address: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PublicContract` being updated. */
  publicContractPatch: PublicContractPatch;
};

/** All input for the `updatePublicContractByName` mutation. */
export type UpdatePublicContractByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object where the defined keys will be set on the `PublicContract` being updated. */
  publicContractPatch: PublicContractPatch;
};

/** All input for the `updatePublicContractDepByLevelAndSrcContractAndDestSchema` mutation. */
export type UpdatePublicContractDepByLevelAndSrcContractAndDestSchemaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  destSchema: Scalars['String'];
  level: Scalars['Int'];
  /** An object where the defined keys will be set on the `PublicContractDep` being updated. */
  publicContractDepPatch: PublicContractDepPatch;
  srcContract: Scalars['String'];
};

/** All input for the `updatePublicContractDep` mutation. */
export type UpdatePublicContractDepInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContractDep` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicContractDep` being updated. */
  publicContractDepPatch: PublicContractDepPatch;
};

/** All input for the `updatePublicContract` mutation. */
export type UpdatePublicContractInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContract` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicContract` being updated. */
  publicContractPatch: PublicContractPatch;
};

/** All input for the `updatePublicContractLevelByContractAndLevel` mutation. */
export type UpdatePublicContractLevelByContractAndLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  contract: Scalars['String'];
  level: Scalars['Int'];
  /** An object where the defined keys will be set on the `PublicContractLevel` being updated. */
  publicContractLevelPatch: PublicContractLevelPatch;
};

/** All input for the `updatePublicContractLevel` mutation. */
export type UpdatePublicContractLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicContractLevel` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicContractLevel` being updated. */
  publicContractLevelPatch: PublicContractLevelPatch;
};

/** All input for the `updatePublicLevelByLevel` mutation. */
export type UpdatePublicLevelByLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  level: Scalars['Int'];
  /** An object where the defined keys will be set on the `PublicLevel` being updated. */
  publicLevelPatch: PublicLevelPatch;
};

/** All input for the `updatePublicLevel` mutation. */
export type UpdatePublicLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicLevel` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicLevel` being updated. */
  publicLevelPatch: PublicLevelPatch;
};

/** All input for the `updatePublicTxContextById` mutation. */
export type UpdatePublicTxContextByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `PublicTxContext` being updated. */
  publicTxContextPatch: PublicTxContextPatch;
};

/** All input for the `updatePublicTxContext` mutation. */
export type UpdatePublicTxContextInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicTxContext` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicTxContext` being updated. */
  publicTxContextPatch: PublicTxContextPatch;
};

export type LedgerSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
}>;

export type LedgerSubscription = {
  __typename?: 'Subscription';
  ledgers: Array<{
    __typename?: 'PmmStorageLedgerMap';
    id: any;
    tokenId: any | null;
    quantity: any | null;
    owner: string | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type LedgerByOwnerAndTokensSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type LedgerByOwnerAndTokensSubscription = {
  __typename?: 'Subscription';
  ledgers: Array<{
    __typename?: 'PmmStorageLedgerMap';
    id: any;
    tokenId: any | null;
    quantity: any | null;
    owner: string | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type LiveLedgerSubscriptionVariables = Exact<{ [key: string]: never }>;

export type LiveLedgerSubscription = {
  __typename?: 'Subscription';
  ledgers: Array<{
    __typename?: 'PmmStorageLedgerMapLive';
    id: any;
    tokenId: any | null;
    quantity: any | null;
    owner: string | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type LedgerByOwnerSubscriptionVariables = Exact<{
  owner: Maybe<Scalars['String']>;
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type LedgerByOwnerSubscription = {
  __typename?: 'Subscription';
  ledgers: Array<{
    __typename?: 'PmmStorageLedgerMapLive';
    id: any;
    tokenId: any | null;
    quantity: any | null;
    owner: string | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type MarketSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MarketSubscription = {
  __typename?: 'Subscription';
  markets: Array<{
    __typename?: 'PmmStorageMarketMapOrdered';
    id: any;
    metadataIpfsHash: string | null;
    metadataDescription: string | null;
    metadataAdjudicator: string | null;
    marketsState: string | null;
    marketId: any | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
    marketInfo: {
      __typename?: 'PmmStorageMarketMap';
      marketBootstrapped: Array<{
        __typename?: 'PmmStorageMarketMapMarketbootstrapped';
        resolutionResolvedAtBlock: any | null;
        marketBootstrappedBootstrappedAtBlock: any | null;
        auctionRewardCurrencyPool: any | null;
        liquidityRewardPool: any | null;
        marketCurrencyPool: any | null;
        bootstrapYesProbability: any | null;
        winningPrediction: string | null;
      }>;
      auctionRunning: Array<{
        __typename?: 'PmmStorageMarketMapAuctionrunning';
        auctionRunningAuctionPeriodEnd: any | null;
        auctionRunningQuantity: any | null;
        auctionRunningYesPreference: any | null;
        auctionRunningUniswapContribution: any | null;
      }>;
    } | null;
  }> | null;
};

export type MarketBetsSubscriptionVariables = Exact<{
  marketId: Maybe<Scalars['BigFloat']>;
}>;

export type MarketBetsSubscription = {
  __typename?: 'Subscription';
  allPmmStorageLiquidityProviderMapLivesList: Array<{
    __typename?: 'PmmStorageLiquidityProviderMapLive';
    id: any;
    marketId: any | null;
    originator: string | null;
    betDetails: {
      __typename?: 'PmmStorageLiquidityProviderMap';
      bets: Array<{
        __typename?: 'PmmStorageLiquidityProviderMapBet';
        probability: any | null;
        quantity: any | null;
      }>;
    } | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      txHash: string;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type TokenSupplyByTokenIdSubscriptionVariables = Exact<{
  tokens: Maybe<Array<Scalars['BigFloat']> | Scalars['BigFloat']>;
}>;

export type TokenSupplyByTokenIdSubscription = {
  __typename?: 'Subscription';
  supplyMaps: Array<{
    __typename?: 'PmmStorageSupplyMapLive';
    id: any;
    tokenId: any | null;
    totalSupply: any | null;
    tokenReserve: any | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      txHash: string;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export type UserBetsSubscriptionVariables = Exact<{
  originator: Maybe<Scalars['String']>;
}>;

export type UserBetsSubscription = {
  __typename?: 'Subscription';
  allPmmStorageLiquidityProviderMapLivesList: Array<{
    __typename?: 'PmmStorageLiquidityProviderMapLive';
    id: any;
    marketId: any | null;
    originator: string | null;
    betDetails: {
      __typename?: 'PmmStorageLiquidityProviderMap';
      bets: Array<{
        __typename?: 'PmmStorageLiquidityProviderMapBet';
        probability: any | null;
        quantity: any | null;
      }>;
    } | null;
    txContext: {
      __typename?: 'PublicTxContext';
      operationGroupNumber: number;
      operationNumber: number;
      contentNumber: number;
      txHash: string;
      blockInfo: { __typename?: 'PublicLevel'; bakedAt: any | null; block: number } | null;
    } | null;
  }> | null;
};

export const LedgerDocument = gql`
  subscription Ledger($owner: String) {
    ledgers: allPmmStorageLedgerMapsList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { deleted: false, idxTokensOwner: $owner }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerSubscription__
 *
 * To run a query within a React component, call `useLedgerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useLedgerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<LedgerSubscription, LedgerSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LedgerSubscription, LedgerSubscriptionVariables>(
    LedgerDocument,
    options,
  );
}
export type LedgerSubscriptionHookResult = ReturnType<typeof useLedgerSubscription>;
export type LedgerSubscriptionResult = Apollo.SubscriptionResult<LedgerSubscription>;
export const LedgerByOwnerAndTokensDocument = gql`
  subscription LedgerByOwnerAndTokens($owner: String, $tokens: [BigFloat!]) {
    ledgers: allPmmStorageLedgerMapsList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { deleted: false, idxTokensOwner: $owner }
      filter: { idxTokensTokenId: { in: $tokens } }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerByOwnerAndTokensSubscription__
 *
 * To run a query within a React component, call `useLedgerByOwnerAndTokensSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerByOwnerAndTokensSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerByOwnerAndTokensSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useLedgerByOwnerAndTokensSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LedgerByOwnerAndTokensSubscription,
    LedgerByOwnerAndTokensSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    LedgerByOwnerAndTokensSubscription,
    LedgerByOwnerAndTokensSubscriptionVariables
  >(LedgerByOwnerAndTokensDocument, options);
}
export type LedgerByOwnerAndTokensSubscriptionHookResult = ReturnType<
  typeof useLedgerByOwnerAndTokensSubscription
>;
export type LedgerByOwnerAndTokensSubscriptionResult =
  Apollo.SubscriptionResult<LedgerByOwnerAndTokensSubscription>;
export const LiveLedgerDocument = gql`
  subscription LiveLedger {
    ledgers: allPmmStorageLedgerMapLivesList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLiveLedgerSubscription__
 *
 * To run a query within a React component, call `useLiveLedgerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLiveLedgerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveLedgerSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLiveLedgerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LiveLedgerSubscription,
    LiveLedgerSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LiveLedgerSubscription, LiveLedgerSubscriptionVariables>(
    LiveLedgerDocument,
    options,
  );
}
export type LiveLedgerSubscriptionHookResult = ReturnType<typeof useLiveLedgerSubscription>;
export type LiveLedgerSubscriptionResult = Apollo.SubscriptionResult<LiveLedgerSubscription>;
export const LedgerByOwnerDocument = gql`
  subscription LedgerByOwner($owner: String, $tokens: [BigFloat!]) {
    ledgers: allPmmStorageLedgerMapLivesList(
      orderBy: PUBLIC_TX_CONTEXT_BY_TX_CONTEXT_ID__LEVEL_DESC
      condition: { idxTokensOwner: $owner }
      filter: { idxTokensTokenId: { in: $tokens } }
    ) {
      id
      tokenId: idxTokensTokenId
      quantity: tokensNat
      owner: idxTokensOwner
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
    }
  }
`;

/**
 * __useLedgerByOwnerSubscription__
 *
 * To run a query within a React component, call `useLedgerByOwnerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLedgerByOwnerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerByOwnerSubscription({
 *   variables: {
 *      owner: // value for 'owner'
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useLedgerByOwnerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LedgerByOwnerSubscription,
    LedgerByOwnerSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<LedgerByOwnerSubscription, LedgerByOwnerSubscriptionVariables>(
    LedgerByOwnerDocument,
    options,
  );
}
export type LedgerByOwnerSubscriptionHookResult = ReturnType<typeof useLedgerByOwnerSubscription>;
export type LedgerByOwnerSubscriptionResult = Apollo.SubscriptionResult<LedgerByOwnerSubscription>;
export const MarketDocument = gql`
  subscription Market {
    markets: allPmmStorageMarketMapOrderedsList {
      id
      marketId: idxMarketsNat
      metadataIpfsHash
      metadataDescription
      metadataAdjudicator
      marketsState
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
      }
      marketInfo: pmmStorageMarketMapById {
        marketBootstrapped: pmmStorageMarketMapMarketbootstrappedsByStorageMarketMapIdList {
          auctionRewardCurrencyPool: currencyPoolCreatorRewardCurrencyPool
          liquidityRewardPool: currencyPoolCreatorRewardCurrencyPool
          marketCurrencyPool: currencyPoolMarketCurrencyPool
          bootstrapYesProbability: marketBootstrappedBootstrapYesProbability
          winningPrediction: resolutionWinningPrediction
          resolutionResolvedAtBlock
          marketBootstrappedBootstrappedAtBlock
        }
        auctionRunning: pmmStorageMarketMapAuctionrunningsByStorageMarketMapIdList {
          auctionRunningAuctionPeriodEnd
          auctionRunningQuantity
          auctionRunningYesPreference
          auctionRunningUniswapContribution
        }
      }
    }
  }
`;

/**
 * __useMarketSubscription__
 *
 * To run a query within a React component, call `useMarketSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMarketSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMarketSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<MarketSubscription, MarketSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<MarketSubscription, MarketSubscriptionVariables>(
    MarketDocument,
    options,
  );
}
export type MarketSubscriptionHookResult = ReturnType<typeof useMarketSubscription>;
export type MarketSubscriptionResult = Apollo.SubscriptionResult<MarketSubscription>;
export const MarketBetsDocument = gql`
  subscription MarketBets($marketId: BigFloat) {
    allPmmStorageLiquidityProviderMapLivesList(
      condition: { idxMarketsMarketId: $marketId }
      orderBy: IDX_MARKETS_MARKET_ID_DESC
    ) {
      id
      marketId: idxMarketsMarketId
      originator: idxMarketsOriginator
      betDetails: pmmStorageLiquidityProviderMapById {
        bets: pmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdList {
          probability: betPredictedProbability
          quantity: betQuantity
        }
      }
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useMarketBetsSubscription__
 *
 * To run a query within a React component, call `useMarketBetsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMarketBetsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketBetsSubscription({
 *   variables: {
 *      marketId: // value for 'marketId'
 *   },
 * });
 */
export function useMarketBetsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MarketBetsSubscription,
    MarketBetsSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<MarketBetsSubscription, MarketBetsSubscriptionVariables>(
    MarketBetsDocument,
    options,
  );
}
export type MarketBetsSubscriptionHookResult = ReturnType<typeof useMarketBetsSubscription>;
export type MarketBetsSubscriptionResult = Apollo.SubscriptionResult<MarketBetsSubscription>;
export const TokenSupplyByTokenIdDocument = gql`
  subscription TokenSupplyByTokenId($tokens: [BigFloat!]) {
    supplyMaps: allPmmStorageSupplyMapLivesList(filter: { idxTokensNat: { in: $tokens } }) {
      id
      tokenId: idxTokensNat
      totalSupply: tokensTotalSupply
      tokenReserve: tokensInReserve
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useTokenSupplyByTokenIdSubscription__
 *
 * To run a query within a React component, call `useTokenSupplyByTokenIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTokenSupplyByTokenIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenSupplyByTokenIdSubscription({
 *   variables: {
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useTokenSupplyByTokenIdSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TokenSupplyByTokenIdSubscription,
    TokenSupplyByTokenIdSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    TokenSupplyByTokenIdSubscription,
    TokenSupplyByTokenIdSubscriptionVariables
  >(TokenSupplyByTokenIdDocument, options);
}
export type TokenSupplyByTokenIdSubscriptionHookResult = ReturnType<
  typeof useTokenSupplyByTokenIdSubscription
>;
export type TokenSupplyByTokenIdSubscriptionResult =
  Apollo.SubscriptionResult<TokenSupplyByTokenIdSubscription>;
export const UserBetsDocument = gql`
  subscription UserBets($originator: String) {
    allPmmStorageLiquidityProviderMapLivesList(
      condition: { idxMarketsOriginator: $originator }
      orderBy: IDX_MARKETS_MARKET_ID_DESC
    ) {
      id
      marketId: idxMarketsMarketId
      originator: idxMarketsOriginator
      betDetails: pmmStorageLiquidityProviderMapById {
        bets: pmmStorageLiquidityProviderMapBetsByStorageLiquidityProviderMapIdList {
          probability: betPredictedProbability
          quantity: betQuantity
        }
      }
      txContext: publicTxContextByTxContextId {
        blockInfo: publicLevelByLevel {
          block: level
          bakedAt
        }
        operationGroupNumber
        operationNumber
        contentNumber
        txHash: operationHash
      }
    }
  }
`;

/**
 * __useUserBetsSubscription__
 *
 * To run a query within a React component, call `useUserBetsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserBetsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBetsSubscription({
 *   variables: {
 *      originator: // value for 'originator'
 *   },
 * });
 */
export function useUserBetsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<UserBetsSubscription, UserBetsSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<UserBetsSubscription, UserBetsSubscriptionVariables>(
    UserBetsDocument,
    options,
  );
}
export type UserBetsSubscriptionHookResult = ReturnType<typeof useUserBetsSubscription>;
export type UserBetsSubscriptionResult = Apollo.SubscriptionResult<UserBetsSubscription>;
