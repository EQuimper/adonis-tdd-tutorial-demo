'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get User Challenges')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the user challenges', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const otherUser = await Factory.model('App/Models/User').create();
  const challenges = await Factory.model('App/Models/Challenge').makeMany(2)
  const otherChallenges = await Factory.model('App/Models/Challenge').makeMany(2)

  await user.challenges().saveMany(challenges)
  await otherUser.challenges().saveMany(otherChallenges)

  const response = await client
    .get('/api/me/challenges')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  assert.equal(response.body.length, 2);

  response.assertJSONSubset([
    { title: challenges[0].title },
    { title: challenges[1].title }
  ])
})
