'use strict'

const Movie = use('App/Models/Movie')

class MovieController {
  async index({ request, response }) {
    const title = request.input('title')

    if (!title) {
      return response.status(400).json({ error: 'title is required' })
    }

    const movies = await Movie.query()
      .where('title', 'LIKE', `%${title}%`)
      .fetch()

    return response.ok(movies)
  }
}

module.exports = MovieController
