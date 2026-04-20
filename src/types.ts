export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'Indoor' | 'Outdoor' | 'Rare' | 'Medicinal';
  difficulty: 1 | 2 | 3 | 4 | 5;
  sunlight: 'Low' | 'Medium' | 'High';
  water: 'Low' | 'Medium' | 'High';
  soil: string;
  description: string;
  price: number;
  image: string;
  secondaryImage?: string;
  health?: number;
  lastWatered?: string;
  // New filter properties
  isPetFriendly: boolean;
  isAirPurifying: boolean;
  isLowLight: boolean;
}

export interface Store {
  id: string;
  name: string;
  distance: string;
  rating: number;
  image: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  video?: string;
  caption: string;
  likes: number;
  comments: Comment[];
  shares: number;
  time: string;
  tags: string[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

export interface TrendingTopic {
  id: string;
  name: string;
  postsCount: string;
}
