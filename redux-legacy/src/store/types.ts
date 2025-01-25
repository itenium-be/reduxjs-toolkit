export type Todo = {
  id: number;
  title: string;
  text: string;
  done: boolean;
}

export type RootStore = {
  todos: Todo[];
}
