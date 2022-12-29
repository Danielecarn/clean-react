export type HttpPostParams = {
  url: string
}
export interface HttpPostCliente {
  post (params: HttpPostParams): Promise<void>
}
