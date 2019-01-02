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
}

module.exports = ChallengeController
