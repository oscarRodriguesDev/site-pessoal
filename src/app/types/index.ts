export interface CosmicObjectsResponse {
  objects: ProjectObject[];
  total: number;
}

export interface ProjectObject {
  slug: string;
  title: string;
  type: string;
  metadata: ProjectMetadata;
}

export interface ProjectMetadata {
  title: string;
  short_description: string;
  description: string;
  featured_image: CosmicImage | null;
  screenshots: CosmicImage[] | null;
  tech_stack: string[];
  live_url: string;
  github_url: string | null;
  featured: boolean;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}
