import { HttpPostCliente } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call httpPostCliente with correct URL', async () => {
    class HttpPostClienteSpy implements HttpPostCliente {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClienteSpy = new HttpPostClienteSpy()
    const sut = new RemoteAuthentication(url, httpPostClienteSpy)
    await sut.auth()
    expect(httpPostClienteSpy.url).toBe(url)
  })
})
