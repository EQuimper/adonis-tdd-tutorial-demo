'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChallengeSchema extends Schema {
  up() {
    this.create('challenges', table => {
      table.string('title').notNullable()
      table.text('description')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges')
  }
}

module.exports = ChallengeSchema
