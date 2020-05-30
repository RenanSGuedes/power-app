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
    const { username, report } = req.body
    const apiResponse = await axios.get('https://ipapi.co/json/')
  
    const { city, region_code, latitude, longitude } = apiResponse.data
  
    try {
      await knex('users').insert({
        username,
        user_city: city,
        user_state: region_code,
        latitude,
        longitude,
        report
      })
  
      res.status(202).send()
    } catch (error) {
      next(error)
    }
  
  }
}