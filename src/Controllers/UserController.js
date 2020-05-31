const path = require('path')
const knex = require('../database')
const axios = require('axios')

module.exports = {
  async index(req, res, next) {
    try {
      const people = await knex('users')

      const data = {
        titlePage: 'Objetivos do Desenvolvimento Sustentável - 7',
        users: people
      }
  
      return res.render(path.join(__dirname, '..', 'public', 'index.html'), data)
      //return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
  async create(req, res, next) {
    const { username, mail ,cep, report } = req.body
    const geolocationResponse = await axios.get('https://ipapi.co/json/')
    const adressResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    

    const { latitude, longitude } = geolocationResponse.data
    const { logradouro, bairro, localidade, uf } = adressResponse.data

    function parseUserFirstName(string) {
      return string.split(' ').map(w => w.trim()).shift()
    }

    try {
      await knex('users').insert({
        username,
        mail,
        first_name: parseUserFirstName(username),
        user_city: localidade,
        user_state: uf,
        latitude,
        longitude,
        street: logradouro,
        district: bairro,
        report
      })

      return res.status(202).send()
    } catch (error) {
      next(error)
    }
  
  }
}