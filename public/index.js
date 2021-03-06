'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
console.log(events);
console.log(actors);


// Function that compute the booking price ! 
function booking_price()
{

	events.forEach(event=>{
 	 bars.forEach(bar => {
    	if (event.barId==bar.id) {
     	 event.price = event.time*bar.pricePerHour + event.persons*bar.pricePerPerson;
    	}
  	});
	});

}
booking_price()


function decreasing_price(){
events.forEach(event=>{
  
    if (event.persons>=10 && event.persons<20) {
      event.price -=event.price*0.1;
    }
    if (event.persons>=20 && event.persons<60) {
      event.price -=event.price*0.3;
    }
    if (event.persons>=60) {
      event.price -=event.price*0.5;
    }
  });
}


decreasing_price()
events.forEach(event=>{console.log("Price : "+event.price)})


// Step 3 

function DispatchingMoney()
{
	events.forEach(event=>{
		actors.forEach(actor=>{
			if(event.id==actor.eventId)
			{
				actor.payment[1].amount=event.price*0.3
				actor.payment[2].amount=(event.price*0.3)*0.50
				actor.payment[3].amount=event.persons
				actor.payment[4].amount=(event.price*0.3)-(actor.payment[2].amount + actor.payment[3].amount	)
			}
		})
	})
}


DispatchingMoney()

function Deductible()
{
	events.forEach(event=>{

		if(event.options[0]==true)
		{
			event.price=event.price + event.persons
		}
	})
}

Deductible()



function PayTheActor()
{
	events.forEach(event=>{
		actors.forEach(actor=>{
			if(event.eventId==actor.id)
			{
				actor.payment[0].amount=event.price*0.30
				actor.payment[1].amount=event.price*0.70
				actor.payment[2].amount=0.50*(actor.payment[0].amount)
				actor.payment[3].amount=event.persons
				if(event.options.deductibleReduction==true)
				{
  					actor.payment[4].amount=200+(event.price*0.3)-actor.payment[2].amount-actor.payment[3].amount;
  				}
  				else
  				{
  					actor.payment[4].amount=5000+(event.price*0.3)-actor.payment[2].amount-actor.payment[3].amount;
  				}

			}
		})
	})
}


PayTheActor()

