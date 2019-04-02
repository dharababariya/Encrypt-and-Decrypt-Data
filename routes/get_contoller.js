const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const knex = require('../helpers/knex')
router.get('/v1/getcontroller', async (req, res, next) => {
    try {

        const data = {
            input: {
                query: req.query
            }
        }

        const result = await knex("public.controller_password")
            .select("*").where('mac', data.input.query.mac).first()
            .returning('*');
        // console.log(result);

        const decrypt_username = decrypt(result.username);
        const decrypt_password = decrypt(result.password);
        console.log(decrypt_username,decrypt_password);

        res
            .status(201)
            .send({

               message:"Get controller"
              

            })
    } catch (error) {
        console.error(error.message)
        console.log(error)
    }
})

const decrypt = (text) => {
    var decipher = crypto.createDecipher(algorithm, my_secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
module.exports = router;