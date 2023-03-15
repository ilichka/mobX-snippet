export interface TodoItem {
    id: number;
    title: TodoTitle;
    completed: boolean
}

export interface TodoResponseItem {
    id: number;
    title: string;
    completed: boolean
}

export interface TodoTitle {
    id: number;
    value: string
}