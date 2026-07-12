export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type AuthResponse = {
  refresh: string;
  access: string;
  user: User;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  due_date: string; // "YYYY-MM-DD"
  owner: number;
};

export type Shape = {
  type: "polygon";
  points: [number, number][];
};

export type Annotation = {
  id: number;
  image: string; // URL
  shapes: Shape[];
  owner: number;
};
