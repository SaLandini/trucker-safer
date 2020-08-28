import {Request, Response} from 'express'
import knex from '../database/connection'

class ProblemsController {
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query

        const parsedItens = String(items)
        .split(',')
        .map(item => Number(item.trim()))

        const problems = await knex('problem')
        .join('problems_items', 'problems_id', '=', 'problems_items.problem_id')
        .whereIn('problems_items.item_id', parsedItens)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('problems.*')

        return response.json(problems)
    }

    async show(request: Request, response: Response){
        const { id } = request.params

        const problem = await knex('problems').where('id', id).first()

        if (!problem) {
            return response.status(400).json({ message: 'ERROR: Problems not found' })
        }
        
        const items = await knex('items')
        .join('problems_items', 'items.id', '=', 'problems_items.item_id')
        .where('problems_items.problem_id', id)
        .select('items.title')

        return response.json({ problem, items })
    }
    
    async create(request: Request, response: Response){
        const {
            name,
            truck,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
            description
        } = request.body
    
        const trx = await knex.transaction()
    
        const problem = {
            image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=600-fake',
            name,
            truck,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            description
        }

        const insertedIds = await trx('problems').insert(problem)
    
        const problem_id = insertedIds[0]
    
        const problemItems = items.map((item_id: number) => {
            return {
                item_id,
                problem_id,
            }
        })
    
        await trx('problems_items').insert(problemItems)

        await trx.commit()
    
        return response.json({
            id: problem_id,
            ... problem,
        })
    }
}

export default ProblemsController