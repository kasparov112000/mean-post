export interface EventListConfig {
  type: string;

  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    attending?: string,
    limit?: number,
    offset?: number
  };
}
