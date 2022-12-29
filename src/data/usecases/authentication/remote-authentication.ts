import { HttpPostCliente } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostCliente: HttpPostCliente
  ) {}

  async auth (): Promise<void> {
    await this.httpPostCliente.post(this.url)
  }
}
