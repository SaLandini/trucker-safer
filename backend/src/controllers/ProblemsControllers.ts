import {Request, Response} from 'express'
import knex from '../database/connection'

class ProblemsControllers {
    async index(request: Request, response: Response){
       // const { city, uf, items } = request.query

       // const parsedItens = String(items)
       // .split(',')
       // .map(item => Number(item.trim()))

       // const problems = await knex('problems')
        //.join('problems_items', 'problems_id', '=', 'problems_items.problems_id')
        //.whereIn('problems_items.item_id', parsedItens)
        //.where('city', String(city))
        //.where('uf', String(uf))
        //.distinct()
        //.select('problems.*')

        const problems =  await knex('problems').select('*')

       
        const serializedProblems = problems.map(problem => {
            return {
                id: problem.id,
                name: problem.name,
                truck: problem.truck,
                whatsapp: problem.whatsapp,
                uf: problem.uf,
                city: problem.city,
                description: problem.description,
            }
        })

        return response.json(serializedProblems)
    }

    async show(request: Request, response: Response){
        const { id } = request.params

        const problems = await knex('problems').where('id', id).first()

        if (!problems) {
            return response.status(400).json({ message: 'ERROR: Problems not found' })
        }
        
        const items = await knex('items')
        .join('problems_items', 'items.id', '=', 'problems_items.item_id')
        .where('problems_items.problems_id', id)
        .select('items.title')

        return response.json({ problems, items })
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
    
        const problems = {
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

        const insertedIds = await trx('problems').insert(problems)
    
        const problems_id = insertedIds[0]
    
        const problemsItems = items.map((item_id: number) => {
            return {
                item_id,
                problems_id,
            }
        })
    
        await trx('problems_items').insert(problemsItems)

        await trx.commit()
    
        return response.json({
            id: problems_id,
            ... problems,
        })
    }
}

export default ProblemsControllers