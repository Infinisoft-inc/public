export interface Dependency {
    id: string;
    name: string;
    description: string;
    run: () => void;
  }