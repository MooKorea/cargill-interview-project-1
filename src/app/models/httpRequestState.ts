export type HttpRequestState<T> = {
  isLoading: boolean;
  data?: T;
  error?: Error | null;
};
