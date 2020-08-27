import Knex from 'knex'

export async function seed(knex: Knex){
    await knex('items').insert([
        { title: 'Pneus', image: 'wheel.png', description: 'Pneus'},
        { title: 'Motor', image: 'engine.png', description: 'Motor'},
        { title: 'Óleo', image: 'oil.png', description: 'Óleo'},
        { title: 'Radiador', image: 'filter.png', description: 'Radiador'},
        { title: 'Outros', image: 'other.png', description: ' '},
        { title: 'Não sei informar', image: 'dontknow.png', description: 'Não sei informar'},
    ])
}