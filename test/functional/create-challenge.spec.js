'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a challenge if valid data', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const { title, description } = await Factory.model(
    'App/Models/Challenge'
  ).make()

  const data = {
    title,
    description
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: data.title,
    description: data.description,
    user_id: user.id
  })
})

test('cannot create a challenge if not authenticated', async ({
  assert,
  client
}) => {
  const data = {
    title: 'Top 5 2018 Movies to watch',
    description: 'A list of 5 movies from 2018 to absolutely watched'
  }

  const response = await client
    .post('/api/challenges')
    .send(data)
    .end()

  response.assertStatus(401)
})

test('cannot create a challenge if no title', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const { description } = await Factory.model('App/Models/Challenge').make()

  const data = {
    description
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is required',
      field: 'title',
      validation: 'required'
    }
  ])
})

test('cannot create a challenge if title and description are not a string', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const data = {
    title: 123,
    description: 123
  }

  const response = await client
    .post('/api/challenges')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is not a valid string',
      field: 'title',
      validation: 'string'
    },
    {
      message: 'description is not a valid string',
      field: 'description',
      validation: 'string'
    }
  ])
})
