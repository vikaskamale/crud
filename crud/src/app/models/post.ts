export interface Post {
  userId: number;
  id: number; // Optional since the API generates it
  title: string;
  body: string;
}
