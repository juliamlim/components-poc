const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('../env');

router.route('/')
    .get((req, res) => {
      axios.post(env.search.endpoint, env.search.params)
        .then( response => {
          const { records } = response.data;

          let a = 1;
          const products = records.map( item => {

            const { ProdDetail_Image, nonvisualVariant } = item.allMeta.visualVariant[0];

            const { gbi_price_display } = nonvisualVariant[0];

            const colors = item.allMeta.visualVariant.map(v => {
              const { Color_Name, Hex_Code } = v;

              return { name: Color_Name, hex: `#${Hex_Code}`, product: `https://${env.customer.origin}${v.ProdDetail_Image}` };
            });

            return product = {
              name: item.allMeta.title,
              image: `https://${env.customer.origin}${ProdDetail_Image}`,
              price: gbi_price_display,
              colors,
            };
          });

          res.render('pages/home', { products });
        });

    });

module.exports = router;
