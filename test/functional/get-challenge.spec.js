'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get a challenge by id', async ({ assert, client }) => {
  const challenges = await Factory.model('App/Models/Challenge').createMany(3)

  const challenge = challenges[0]

  const response = await client.get(`/api/challenges/${challenge.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ title: challenge.title, id: challenge.id })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/challenges/999').end()

  response.assertStatus(404)
})
