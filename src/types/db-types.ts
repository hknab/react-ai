export type TMessage = {
  role: string;
  id: string;
  content: string;
  createdAt: Date;
  position: number;
  chatId: string;
};
