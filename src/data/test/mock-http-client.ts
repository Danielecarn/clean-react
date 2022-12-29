import { HttpPostCliente, HttpPostParams } from 'data/protocols/http/http-post-client'

export class HttpPostClienteSpy implements HttpPostCliente {
  url?: string
  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
