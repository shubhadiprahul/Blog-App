 
const { Model } = require('objection');
const knex = require('../config/config');

// Give the knex instance to objection.
Model.knex(knex);


// Person model.
class Like_Dislike extends Model {
    static get tableName() {
        return 'like_dislike';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                like: { type: Boolean },
                dislike: { type: Boolean },
            }
        }
    }
}
module.exports = Like_Dislike;
