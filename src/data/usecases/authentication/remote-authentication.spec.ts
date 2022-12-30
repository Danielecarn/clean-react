import { HttpPostClienteSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import faker from 'faker'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClienteSpy: HttpPostClienteSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClienteSpy = new HttpPostClienteSpy<AuthenticationParams, AccountModel>()
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

  test('Should throw InvalidCredentialsError if httpPostCliente returns 401', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if httpPostCliente returns 400', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.badResquest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if httpPostCliente returns 500', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.ServerError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if httpPostCliente returns 404', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
