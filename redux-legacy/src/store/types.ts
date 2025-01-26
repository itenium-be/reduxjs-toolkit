export type Todo = {
  id: number;
  title: string;
  text: string;
  done: boolean;
}

export type RootState = {
  todos: Todo[];
}
