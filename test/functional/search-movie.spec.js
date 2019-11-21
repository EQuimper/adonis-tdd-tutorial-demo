'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Search Movie')

trait('Test/ApiClient')
trait('Auth/Client')

test('can query for a certain movie title', async ({ assert, client }) => {
  await Factory.model('App/Models/Movie').create({ title: 'Joker' })

  const response = await client.get('/api/movies?title=Joker').end()

  response.assertStatus(200)
  response.assertJSONSubset([
    {
      title: 'Joker'
    }
  ])
})

test('can query with a subset of the title', async ({ assert, client }) => {
  await Factory.model('App/Models/Movie').create({ title: 'Joker' })

  const response = await client.get('/api/movies?title=jok').end()

  response.assertStatus(200)
  response.assertJSONSubset([
    {
      title: 'Joker'
    }
  ])
})

test('should throw 400 if no title is pass', async ({ assert, client }) => {
  const response = await client.get('/api/movies').end()

  response.assertStatus(400)
})
