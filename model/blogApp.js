const { Model } = require('objection');
const knex = require('../config/config');

// Give the knex instance to objection.
Model.knex(knex);


// Person model.
class Blogapp extends Model {
    static get tableName() {
        return 'blogapp';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['author'],
            properties: {
                id: { type: 'integer' },
                author: { type: 'string' },
                text: { type: 'string' },
                description: { type: 'string' },
            }
        }
    }
}
module.exports = Blogapp;