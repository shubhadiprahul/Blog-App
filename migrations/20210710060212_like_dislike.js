
exports.up = function(knex) {
    return knex.schema
    .createTable('like_dislike',function(table){
        table.increments('id').primary()
        table.integer('user_id')
        table.string('like',200).notNullable()
        table.string('dislike',200).notNullable()

    })
};

exports.down = function(knex) {
    return knex.schema.droptable('like_dislike')
};
