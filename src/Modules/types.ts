export interface Module {
  id: string;
  owner: string;
  namespace: string;
  name: string;
  alias: string | null;
  version: string;
  provider: string;
  tag: string;
  description: string;
  source: string;
  published_at: string;
  downloads: number;
  tier: string;
  provider_logo_url: string;
}

export interface ModulesResponse {
  meta: {
    limit: number;
    current_offset: number;
    next_offset: number;
    next_url: string;
  };
  modules: Module[];
}
