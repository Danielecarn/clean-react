import { HttpPostCliente } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostCliente: HttpPostCliente
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostCliente.post({
      url: this.url,
      body: params
    })
  }
}
