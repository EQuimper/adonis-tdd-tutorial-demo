'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedException extends LogicalException {
  handle(error, { response }) {
    response.status(401).send('Not authorized')
  }
}

module.exports = UnauthorizedException
