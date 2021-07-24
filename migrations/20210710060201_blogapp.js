exports.up = function(knex) {
    return knex.schema
    .createTable('blogapp',function(table){
        table.increments('id').primary()
        table.string('author',250).notNullable()
        table.string('text',255).notNullable()
        table.string('description',255).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('blogapp')
};
