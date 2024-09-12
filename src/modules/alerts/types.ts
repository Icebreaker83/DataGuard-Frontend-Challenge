export interface Alert {
  type: "error" | "success" | "warning" | "info";
  color?: string;
  message: string;
  title?: string;
}

export interface IndexedAlert extends Alert {
  id: number;
}
