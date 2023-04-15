// if(process.env.NODE_ENV != 'production'){
//     require('dotenv').config()
// }

// const stripeSecretKey = process.env.Stripe_Secret_Key
// const stripePublicKey = process.env.Stripe_Public_Key

// console.log(stripeSecretKey)
// console.log(stripePublicKey)

// const express = require('express')
// const app = express()
// const stripe = require('stripe')(stripeSecretKey)

// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

// app.set('view engine', 'ejs')
// app.set('views','./dist');
// // app.use(express.json)
// app.use(express.static('dist'))

// app.get('/cnf', function(req, res){
//     res.render('cnf.ejs',{
//         stripePublicKey : stripePublicKey,
//     })
// })

// app.post('/purchase',jsonParser,function(req, res){
//     console.log(req.body.stripeTokenId)
//     stripe.charges.create({
//         amount:'500',
//         source: req.body.stripeTokenId,
//         currency: 'inr'
//     }).then(function(){
//         console.log("Charge Succesfull")
//         res.json({
//             message: 'Successful'
//         })
//     }).catch(function(){
//         console.log('Failed')
//         console.log(res.status(500))
//         // res.status(500).end()
//     })
// })

// app.listen(3000)


// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Mx4lfSEPQtuaWeNVx7Lhpv4eTqK239xlo0LBblhIPfrXTbUcOFMXTTya8pOdx8gkow4SlaoJbgzlTZnigprBpFM00jntg3NOC');
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
// app.set('views','./dist');
app.use(express.static('dist'));
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session',jsonParser, async (req, res) => {
    console.log(req.query.sub)
    let pr = req.query.id.split('.')[0]
    let add = req.query.id.split('.')[1]
    const price = await stripe.prices.create({
        unit_amount: pr*100,
        currency: 'inr',
        product: 'prod_NiYtmBBTh7RqX0',
      });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,    
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/ContractorProfile.html?id`+add,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));