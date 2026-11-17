export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export type AuthResponse = {
  refresh: string;
  access: string;
  user: User;
};

export type TaskStatus = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  due_date: string;
  tags: string;
  owner: number;
};

export type Shape = { type: "polygon"; points: [number, number][] };
export type Annotation = {
  id: number;
  image: string;
  image_url: string;   
  shapes?: Shape[];
  shape_data?: string;
  owner: number;
};
