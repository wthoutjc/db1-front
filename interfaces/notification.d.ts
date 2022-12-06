type Severity = "error" | "warning" | "info" | "success";

export interface INotification {
  id: string;
  severity: Severity;
  title: string;
  message: string;
}
