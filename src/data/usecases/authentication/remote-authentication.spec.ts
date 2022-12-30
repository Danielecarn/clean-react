import { HttpPostClienteSpy } from '@/data/test'
import { RemoteAuthentication } from './remote-authentication'
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

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

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClienteSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClienteSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
