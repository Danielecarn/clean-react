import { HttpPostCliente, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClienteSpy<T, R> implements HttpPostCliente<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
