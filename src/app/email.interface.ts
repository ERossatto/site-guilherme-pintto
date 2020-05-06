export interface EmailFormat {
  from: string;
  to: Array<string>;
  subject: string;
  html: string;
};