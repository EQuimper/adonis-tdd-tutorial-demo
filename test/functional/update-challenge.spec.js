'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Update Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('a user can update a challenge owned', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const challenge = await Factory.model('App/Models/Challenge').make()

  await user.challenges().save(challenge)

  const data = {
    title: 'This is my new title'
  }

  const response = await client
    .put(`/api/challenges/${challenge.id}`)
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    id: challenge.id,
    title: data.title,
  })
})

test('cannot update challenge if not the author', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const otherUser = await Factory.model('App/Models/User').create()
  const challenge = await Factory.model('App/Models/Challenge').make()

  await otherUser.challenges().save(challenge)

  const data = {
    title: 'This is my new title'
  }

  const response = await client
    .put(`/api/challenges/${challenge.id}`)
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(401)

  const _challenge = await use('App/Models/Challenge').find(challenge.id)

  assert.notEqual(_challenge.title, data.title)
})
