'use strict'

const Challenge = use('App/Models/Challenge')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')


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

  async update({ response, request, params, auth }) {
    const user = await auth.getUser()

    const challenge = await Challenge.findOrFail(params.id)

    if (challenge.user_id !== user.id) {
      throw new UnauthorizedException();
    }

    challenge.merge(request.only(['title', 'description']));

    await challenge.save();

    return response.ok(challenge)
  }

  async destroy({ response, params, auth }) {
    const user = await auth.getUser()

    const challenge = await Challenge.findOrFail(params.id)

    if (challenge.user_id !== user.id) {
      throw new UnauthorizedException();
    }

    await challenge.delete()

    return response.noContent();
  }
}

module.exports = ChallengeController
