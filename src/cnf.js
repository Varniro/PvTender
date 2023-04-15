import Stripe from "stripe"

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: function(token){
        fetch('/purchase',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },

            body: JSON.stringify({
                stripeTokenId: token.id
            })
        }).then(function(res){
            return res.json()
        }).then(function(data){
            alert(data.message)
        })
    }
})

document.getElementById('pay').addEventListener('click', (e) =>{
    e.preventDefault();
    stripeHandler.open({
        amount: 10
    })
})