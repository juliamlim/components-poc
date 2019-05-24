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
        let { records = [] } = response.data;

        return records.map( item => {
          let { ProdDetail_Image, nonvisualVariant } = item.allMeta.visualVariant[0];

          let colors = item.allMeta.visualVariant.map(v => {
            let { Color_Name, Hex_Code } = v;
            return { name: Color_Name, hex: `#${Hex_Code}`, product: `https://${env.customer.origin}${v.ProdDetail_Image}` };
          });

          return {
            name: item.allMeta.title,
            image: `https://${env.customer.origin}${ProdDetail_Image}`,
            price: nonvisualVariant[0].gbi_price_display || 'FREE',
            colors,
          };
        })
      }

      axios.all([getNew(), getWomens(), getMens(), getAccessories()])
        .then(axios.spread((recent, womens, mens, accessories) => {

          recent = parseResponse(recent);
          womens = parseResponse(womens)[0];
          mens = parseResponse(mens)[0];
          accessories = parseResponse(accessories)[0];

          res.render('pages/home', { recent, womens, mens, accessories });
        }));
    });

module.exports = router;
