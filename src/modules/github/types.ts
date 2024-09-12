export interface RangeFilter<T> {
  from?: T | null;
  to?: T | null;
}

export interface DateRangeFilter extends RangeFilter<string> {}
export interface NumberRangeFilter extends RangeFilter<number> {}

export type GithubFilter =
  | number
  | number[]
  | string
  | string[]
  | boolean
  | DateRangeFilter
  | NumberRangeFilter
  | null;

export interface GithubFilters {
  language: string[];
  created: DateRangeFilter;
  stars: NumberRangeFilter;
}

export type SearchRepositoriesFilters = Pick<
  GithubFilters,
  "language" | "created" | "stars"
>;

export interface GithubRepository {
  html_url: string;
  language: string;
  description: string | null;
  created_at: string;
  stargazers_count: number;
  name: string;
}

export interface GithubRepositoryResponse {
  incomplete_results: boolean;
  items: GithubRepository[];
  total_count: number;
}

export interface GithubRepositoriesByLanguage
  extends Pick<GithubRepositoryResponse, "items"> {
  value: string;
}
