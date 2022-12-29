import { HttpPostClienteSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '@/domain/test/mock-authentication'
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
    await sut.auth(mockAuthentication())
    expect(httpPostClienteSpy.url).toBe(url)
  })

  test('Should call httpPostCliente with correct body', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClienteSpy.body).toEqual(authenticationParams)
  })
})
