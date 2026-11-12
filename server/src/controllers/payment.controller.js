stripe_secret = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(stripe_secret);

const getCheckoutSession = async (req, res)=>{
    try{
        // The logic for generating checkout session
        const {amount, currency} = res.body;
        console.log(amount, currency);
        if(amount<=0){
            res.status(400).json({
                message: "Please provide a valid amount",
            });
        }

        // generate the checkout-session
        const session = await stripe.checkout.session.create({
            
        })
        res.status(201).json({
            message: "checkout session created successfully",
            session_url,
        })
    }catch(error){
        return res.status(500).josn({
            message: "Internal Server Error! Please check server logs"
        });
    }
}

module.exports = {
    getCheckoutSession,
}