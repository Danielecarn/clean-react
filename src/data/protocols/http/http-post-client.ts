export type HttpPostParams = {
  url: string
  body?: object
}
export interface HttpPostCliente {
  post (params: HttpPostParams): Promise<void>
}
