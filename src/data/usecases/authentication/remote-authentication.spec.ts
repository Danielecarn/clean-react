import { HttpPostClienteSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call httpPostCliente with correct URL', async () => {
    const url = 'any_url'
    const httpPostClienteSpy = new HttpPostClienteSpy()
    const sut = new RemoteAuthentication(url, httpPostClienteSpy)
    await sut.auth()
    expect(httpPostClienteSpy.url).toBe(url)
  })
})
