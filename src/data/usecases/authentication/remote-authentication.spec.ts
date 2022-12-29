import { HttpPostClienteSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClienteSpy: HttpPostClienteSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClienteSpy = new HttpPostClienteSpy()
  const sut = new RemoteAuthentication(url, httpPostClienteSpy)
  return {
    sut,
    httpPostClienteSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call httpPostCliente with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClienteSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClienteSpy.url).toBe(url)
  })
})
