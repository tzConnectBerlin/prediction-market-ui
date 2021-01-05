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
