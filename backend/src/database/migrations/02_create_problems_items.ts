import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('problems_items', table => {
        table.increments('id').primary()

        table.integer('problem_id')
        .notNullable()
        .references('id')
        .inTable('problems')

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items')
    }) 
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('problems_items')
}