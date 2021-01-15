interface Generic {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SimilarContract {
  added?: number;
  address: string;
  alias?: string;
  annotations?: string[];
  balance?: number;
  count?: number;
  delegate?: string;
  delegate_alias?: string;
  entrypoints?: string[];
  fail_strings?: string[];
  found_by?: string;
  hardcoded?: string[];
  hash: string;
  id?: string;
  language?: string;
  last_action?: string;
  level?: number;
  manager?: string;
  migrations_count?: number;
  network?: string;
  project_id?: string;
  removed?: number;
  slug?: string;
  subscription?: Subscription;
  tags?: string[];
  timestamp?: string;
  tokens?: TokenBalance[];
  total_subscribed?: number;
  total_withdrawn?: number;
  tx_count?: number;
  verification_source?: string;
  verified?: boolean;
}

export interface Subscription {
  address?: string;
  alias?: string;
  network?: string;
  sentry_dsn?: string;
  sentry_enabled?: boolean;
  subscribed_at?: string;
  watch_calls?: boolean;
  watch_deployments?: boolean;
  watch_errors?: boolean;
  watch_mempool?: boolean;
  watch_migrations?: boolean;
  watch_same?: boolean;
  watch_similar?: boolean;
}

export interface TokenBalance {
  balance?: number;
  contract?: string;
  decimals?: number;
  name?: string;
  symbol?: string;
  token_id?: number;
}

export interface SimilarContractResponse {
  contracts?: SimilarContract[];
  count?: number;
}

export interface NodeSchema {
  children?: NodeSchema[];
  diff_type?: string;
  from?: Generic;
  name?: string;
  prim?: string;
  type?: string;
  value?: Generic;
}

export interface BigMapItem {
  key: NodeSchema;
  key_hash: string;
  key_string: string;
  level: number;
  timestamp: string;
  value: NodeSchema;
}

export interface BigMapKeysResponseItem {
  count: number;
  data: BigMapItem;
}

export interface Error {
  descr?: string;
  id?: string;
  kind?: string;
  title?: string;
}

export interface OperationResult {
  allocated_destination_contract?: boolean;
  consumed_gas?: number;
  paid_storage_size_diff?: number;
  storage_size?: number;
}
export interface Operation {
  allocated_destination_contract_burned?: number;
  amount?: number;
  balance?: number;
  burned?: number;
  content_index?: number;
  counter?: number;
  delegate?: string;
  destination?: string;
  destination_alias?: string;
  entrypoint?: string;
  errors?: Error[];
  fee?: number;
  gas_limit?: number;
  hash?: string;
  id?: string;
  internal?: boolean;
  kind?: string;
  level?: number;
  manager_pubkey?: string;
  mempool?: boolean;
  network?: string;
  parameters?: Generic;
  protocol?: string;
  public_key?: string;
  rawMempool?: Generic;
  result?: OperationResult;
  source?: string;
  source_alias?: string;
  status?: string;
  storage_diff?: Generic;
  storage_limit?: number;
  timestamp?: string;
}

export interface OperationResponse {
  last_id?: string;
  operations?: Operation[];
}
