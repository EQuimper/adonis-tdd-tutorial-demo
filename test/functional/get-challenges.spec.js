'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Challenges')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the challenges', async ({ assert, client }) => {
  const challenges = await Factory.model('App/Models/Challenge').createMany(3)

  const response = await client.get('/api/challenges').end()

  response.assertStatus(200)

  response.assertJSONSubset([
    { title: challenges[0].title },
    { title: challenges[1].title },
    { title: challenges[2].title }
  ])
})
