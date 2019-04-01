'use strict'

const Challenge = use('App/Models/Challenge')

class ChallengeController {
  async store({ response, request, auth }) {
    const user = await auth.getUser()

    const challenge = await Challenge.create({
      ...request.only(['title', 'description']),
      user_id: user.id
    })

    return response.created(challenge)
  }

  async all({ response, request }) {
    const challenges = await Challenge.all()

    return response.ok(challenges)
  }

  async show({ response, params }) {
    const challenge = await Challenge.findOrFail(params.id)

    return response.ok(challenge)
  }
}

module.exports = ChallengeController
