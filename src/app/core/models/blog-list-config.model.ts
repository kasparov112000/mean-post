// import { ShowAuthedDirective } from "../../shared";

export interface BlogListConfig {
  type: string;

  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    toFrontPage?: boolean,
    approved?: boolean,
    showOnlyPreview?: boolean,
    limit?: number,
    offset?: number
  };
  }
