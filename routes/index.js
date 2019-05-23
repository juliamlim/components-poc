const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('../env');

router.route('/')
    .get((req, res) => {

      function getNew() {
        return axios.post(env.search.endpoint, env.search.params.new)
      }

      function getWomens() {
        return axios.post(env.search.endpoint, env.search.params.womens)
      }

      function getMens() {
        return axios.post(env.search.endpoint, env.search.params.mens)
      }

      function getAccessories() {
        return axios.post(env.search.endpoint, env.search.params.accessories)
      }

      function parseResponse(response) {
        const { records = [] } = response.data;

        return records.map( item => {
          const { ProdDetail_Image, nonvisualVariant } = item.allMeta.visualVariant[0];

          const colors = item.allMeta.visualVariant.map(v => {
            const { Color_Name, Hex_Code } = v;
            return { name: Color_Name, hex: `#${Hex_Code}`, product: `https://${env.customer.origin}${v.ProdDetail_Image}` };
          });

          return product = {
            name: item.allMeta.title,
            image: `https://${env.customer.origin}${ProdDetail_Image}`,
            price: nonvisualVariant[0].gbi_price_display || 'FREE',
            colors,
          };
        })
      }

      axios.all([getNew(), getWomens(), getMens(), getAccessories()])
        .then(axios.spread((recent, womens, mens, accessories) => {

          console.log(recent.data.records, womens.data.records, mens.data.records, accessories.data.records,)

          recent = parseResponse(recent);
          womens = parseResponse(womens);
          mens = parseResponse(mens);
          accessories = parseResponse(accessories);

          res.render('pages/home', { recent, womens, mens, accessories });
        }));
    });

module.exports = router;
