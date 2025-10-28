export default interface ICommonResponse<T> {
  httpStatus: string;
  status: string;
  data: T | null;
}
