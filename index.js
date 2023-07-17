const {create_instrument_identifier_card, create_payment_instrument_card, setup_completion_with_card_number} = require('./process');

create_instrument_identifier_card().then(result => {
    create_payment_instrument_card(result.data.id).then(result => {        
        setup_completion_with_card_number(result.data.id).then(result => {
            console.log("quue mas",result.data);
        })
    })
});