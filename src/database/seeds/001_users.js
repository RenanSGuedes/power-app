
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Renan Guedes',
          user_city: 'São Paulo',
          user_state: 'São Paulo',
          latitude: -23.6120802,
          longitude: -46.761513,
          report: 'Nos últimos dias passei próximo a uma comunidade que contava com condições precárias de energia. As pessoas do local precisavam caminhar longas distância para chegar à cidade vizinha. A linha de transportes dessa região já não funciona a anos, infelizmente.'
        }
      ]);
    });
};
