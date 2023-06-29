export interface IWsMessage<T> {
  event: string;
  data: T;
}
