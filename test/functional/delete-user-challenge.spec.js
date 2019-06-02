'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('a user can delete a challenge owned', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const challenge = await Factory.model('App/Models/Challenge').make()

  await user.challenges().save(challenge)

  const response = await client
    .delete(`/api/challenges/${challenge.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
})

test('cannot delete challenge if not the author', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const otherUser = await Factory.model('App/Models/User').create()
  const challenge = await Factory.model('App/Models/Challenge').make()

  await otherUser.challenges().save(challenge)

  const response = await client
    .delete(`/api/challenges/${challenge.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(401)

  const _challenge = await use('App/Models/Challenge').find(challenge.id)

  assert.isNotNull(_challenge)
})
