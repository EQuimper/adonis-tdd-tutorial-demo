'use strict'

class MeController {
  async challenges({ response ,auth}) {
    const user = await auth.getUser();

    const challenges = await user.challenges().fetch();

    return response.ok(challenges.toJSON());
  }
}

module.exports = MeController
