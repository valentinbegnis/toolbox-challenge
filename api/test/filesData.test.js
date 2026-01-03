const request = require('supertest')
const { expect } = require('chai')
const nock = require('nock')

const app = require('../src/app')
const { API_BASE_URL } = require('../src/config')

describe('GET /files/data', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('returns formatted data from valid CSV files', async () => {
    // Mock list of files
    nock(API_BASE_URL)
      .get('/v1/secret/files')
      .reply(200, {
        files: ['test1.csv']
      })

    // Mock file content
    nock(API_BASE_URL)
      .get('/v1/secret/file/test1.csv')
      .reply(
        200,
        `file,text,number,hex
        test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
        test1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`
      )

    const res = await request(app).get('/files/data')

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(1)

    expect(res.body[0]).to.deep.equal({
      file: 'test1.csv',
      lines: [
        {
          text: 'RgTya',
          number: 64075909,
          hex: '70ad29aacf0b690b0467fe2b2767f765'
        },
        {
          text: 'AtjW',
          number: 6,
          hex: 'd33a8ca5d36d3106219f66f939774cf5'
        }
      ]
    })
  })

  it('ignores invalid CSV lines', async () => {
    nock(API_BASE_URL)
      .get('/v1/secret/files')
      .reply(200, {
        files: ['test2.csv']
      })

    nock(API_BASE_URL)
      .get('/v1/secret/file/test2.csv')
      .reply(
        200,
        `file,text,number,hex
        test2.csv,VALID,10,70ad29aacf0b690b0467fe2b2767f765
        test2.csv,BADLINE
        test2.csv,INVALID,notanumber,70ad29aacf0b690b0467fe2b2767f765`
      )

    const res = await request(app).get('/files/data')

    expect(res.status).to.equal(200)
    expect(res.body[0].lines).to.have.lengthOf(1)
    expect(res.body[0].lines[0].text).to.equal('VALID')
  })

  it('continues processing if one file fails to download', async () => {
    nock(API_BASE_URL)
      .get('/v1/secret/files')
      .reply(200, {
        files: ['test1.csv', 'test2.csv']
      })

    nock(API_BASE_URL)
      .get('/v1/secret/file/test1.csv')
      .reply(500)

    nock(API_BASE_URL)
      .get('/v1/secret/file/test2.csv')
      .reply(
        200,
        `file,text,number,hex
        test2.csv,OK,1,70ad29aacf0b690b0467fe2b2767f765`
      )

    const res = await request(app).get('/files/data')

    expect(res.status).to.equal(200)
    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('test2.csv')
  })

  it('filters by fileName query param', async () => {
    nock(API_BASE_URL)
      .get('/v1/secret/files')
      .reply(200, {
        files: ['test1.csv', 'test2.csv']
      })

    nock(API_BASE_URL)
      .get('/v1/secret/file/test2.csv')
      .reply(
        200,
        `file,text,number,hex
        test2.csv,ONLY,5,70ad29aacf0b690b0467fe2b2767f765`
      )

    const res = await request(app).get('/files/data?fileName=test2.csv')

    expect(res.status).to.equal(200)
    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('test2.csv')
  })

  it('returns empty array if fileName does not exist', async () => {
    nock(API_BASE_URL)
      .get('/v1/secret/files')
      .reply(200, {
        files: ['test1.csv']
      })

    const res = await request(app).get('/files/data?fileName=notfound.csv')

    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal([])
  })
})
