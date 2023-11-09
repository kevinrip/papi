define([], function anonymous(
) {
var pluralFuncs = {
  en: function(n, ord) {
    var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
    if (ord) return (n10 == 1 && n100 != 11) ? 'one'
        : (n10 == 2 && n100 != 12) ? 'two'
        : (n10 == 3 && n100 != 13) ? 'few'
        : 'other';
    return (n == 1 && v0) ? 'one' : 'other';
  }
};
var fmt = {};
var number = function(value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function(value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {
  "seo.#!/section/Coupons/category/Feeds1To2/": {
  },
  "seo.#!/section/Coupons/category/Feeds3To5/": {
  },
  "seo.#!/section/Coupons/category/Feeds6Plus/": {
  },
  "seo./": {
    metaDescription: function(d) { return "Order pizza online for carryout or delivery from Domino's Pizza Canada. View Domino's menu, find your local store location or track your order."; },
    metaKeywords: function(d) { return "pizza, pizza delivery, pizza carryout, pizza place, pizza restaurant, order pizza, dominos, dominos pizza"; },
    title: function(d) { return "Domino's Pizza Canada® - Order Pizza Online - Dominos.ca"; }
  },
  "seo./#!/content/apps/": {
    metaDescription: function(d) { return "Domino's makes it easy to order pizza, wings, or sandwiches right from your smartphone.  Download the Domino's app for your model of smartphone or tablet today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Mobile Apps - Domino's Pizza, Order Pizza Online for Delivery - Dominos.com"; }
  },
  "seo./#!/content/catering/": {
    metaDescription: function(d) { return "Feed a large group with Domino's catering. View pricing details and options for groups from 20-100 people, then place an order with your local Domino's Pizza store."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Catering - Find Details & Pricing Options - Dominos.ca"; }
  },
  "seo./#!/content/cookies/": {
  },
  "seo./#!/content/dinnerBell/": {
    metaDescription: function(d) { return "Domino's now makes it easy for people to come together and enjoy a meal with Dinner Bell. Easily notify friends and family when it is time to eat."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Dinner Bell by Domino's"; }
  },
  "seo./#!/content/employment/": {
    metaDescription: function(d) { return "Interested in working at Domino's Pizza Canada? Our team is looking for part and full-time employees, from cooks to delivery staff and more. Apply online today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Jobs - Apply Online - Dominos.ca"; }
  },
  "seo./#!/content/giftCards/": {
    metaDescription: function(d) { return "Order pizza, pasta, sandwiches & more online for carryout or delivery from Domino's. View menu, find locations, track orders. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "Gift Cards - Domino's Pizza, Order Pizza Online for Delivery - Dominos.ca"; },
    title: function(d) { return "Gift Cards - Domino's Pizza Canada®, Order Pizza Online for Delivery - Dominos.ca"; }
  },
  "seo./#!/content/giftcards/": {
    metaDescription: function(d) { return "Order pizza, pasta, sandwiches & more online for carryout or delivery from Domino's. View menu, find locations, track orders. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "Legal Gift Cards - Domino's Pizza, Order Pizza Online for Delivery - Dominos.com"; },
    title: function(d) { return "Legal Gift Cards - Domino's Pizza, Order Pizza Online for Delivery - Dominos.com"; }
  },
  "seo./#!/content/privacy/": {
    metaDescription: function(d) { return "Order pizza, pasta, sandwiches & more online for carryout or delivery from Domino's. View menu, find locations, track orders. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "Legal Privacy Policy - Domino's Pizza, Order Pizza Online for Delivery - Dominos.com"; },
    title: function(d) { return "Legal Privacy Policy - Domino's Pizza Canada®, Order Pizza Online for Delivery - Dominos.com"; }
  },
  "seo./#!/content/terms/": {
    metaDescription: function(d) { return "Order pizza, pasta, sandwiches & more online for carryout or delivery from Domino's. View menu, find locations, track orders. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "Legal Terms - Domino's Pizza, Order Pizza Online for Delivery - Dominos.com"; },
    title: function(d) { return "Legal Terms - Domino's Pizza Canada®, Order Pizza Online for Delivery - Dominos.com"; }
  },
  "seo./about-pizza/": {
    metaDescription: function(d) { return "Learn about Pizza and Domino's Pizza History in the restaurant industry since opening in 1960 - way beyond pizza delivery and not just pizza anymore."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "History of Domino's Pizza Canada® in the Pizza Restaurant Industry"; }
  },
  "seo./about-pizza/24-hour-food-delivery-near-me/": {
    metaDescription: function(d) { return "We live in an age of convenience, with lots of people searching for 24 hour food delivery near me. Domino&" + "#" + "x2019;s has extended delivery and carryout hours."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "24 Hour Food Delivery Near Me"; }
  },
  "seo./about-pizza/24-hr-food-delivery/": {
    metaDescription: function(d) { return "Domino's isn't your typical 24 hr food delivery pizzeria, but we have extended delivery and carryout hours to satisfy all your past-midnight pizza cravings."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Extended Hours but Not 24 Hr Food Delivery"; }
  },
  "seo./about-pizza/a-emporter/": function(d) { return ""; },
  "seo./about-pizza/about-halal/": function(d) { return ""; },
  "seo./about-pizza/about-menu/": {
    metaDescription: function(d) { return "Learn about Domino's Inspired Pizza menu that's more than a pizza menu, as well as customer feed back. Sign up for deals or find a nearby location."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Menu Information - Much more than just a Pizza"; }
  },
  "seo./about-pizza/acerca-menu/": function(d) { return ""; },
  "seo./about-pizza/amazon-echo/": {
    metaDescription: function(d) { return "Domino's has teamed up with Amazon Echo to make it easy, convenient, and cool to order your favorite pizzas, pastas, sandwiches, and more on command."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Your Domino's for Pickup or Delivery Using The Amazon Echo"; }
  },
  "seo./about-pizza/app/": {
    metaDescription: function(d) { return "Find a Domino's location near me for pizza, pasta, sandwiches, wings, breads, desserts & drinks. Order online & track your delivery with Domino's Tracker®!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online Delivery from a Domino's Pizza Restaurant Near Me"; }
  },
  "seo./about-pizza/best-pizza/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/beverages/coke/catering/": {
    metaDescription: function(d) { return "Domino's has catering services for family, business, school, and organization events. Order our pizza, pasta, sandwiches, chicken, desserts, and drinks online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Plan Party or Event Catering with Domino's Pizza Canada®"; }
  },
  "seo./about-pizza/beverages/drinks/drinks/": {
    metaDescription: function(d) { return "From hosting parties to feeding your family, every event needs refreshing drinks. Domino's proudly serves Coca-Cola products, including Coke, Sprite, Fanta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Cold Drinks That Complement Pizza and More"; }
  },
  "seo./about-pizza/boneless-chicken/": {
    metaDescription: function(d) { return "Domino's boneless chicken is the answer to your craving for boneless chicken wings. Customize your boneless chicken order with your choice of five dipping sauces."; },
    metaKeywords: function(d) { return "boneless chicken"; },
    title: function(d) { return "Discover the Boneless Chicken at Domino's"; }
  },
  "seo./about-pizza/bread/bites/": {
    metaDescription: function(d) { return "Domino's is a restaurant that offers sweet and savory bites for all events, parties, and occasions, delivered at your convenience. Plan ahead by ordering online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Think Domino's Pizza for Party Bites"; }
  },
  "seo./about-pizza/bread/bread-twists/": {
    metaDescription: function(d) { return "Domino’s Bread Twists, available in Garlic, Parmesan, and Cinnamon, are handmade to perfection using our buttery-tasting dough."; },
    metaKeywords: function(d) { return "breadsticks"; },
    title: function(d) { return "Add Domino's Bread Twists to Your Next Order"; }
  },
  "seo./about-pizza/bread/cheesy-bread/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Find Stuffed Cheesy Bread at Domino&" + "#" + "x2019;s | Order Online Today"; }
  },
  "seo./about-pizza/bread/oven-baked-dips-and-twists/": {
    metaDescription: function(d) { return "Get Domino&" + "#" + "x2019;s New Oven-Baked Dips and Twists OR any 3-topping pizza for $7.99 each when you carryout. Our dip flavors include baked apple, five cheese, and cheesy marinara."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "New Oven-Baked Dips &amp; Twists for Carryout – Domino&" + "#" + "x2019;s Pizza"; }
  },
  "seo./about-pizza/bread/oven-baked-dips-and-twists/baked-apple-dip/": {
    metaDescription: function(d) { return "Get Domino's New Oven-Baked Dips and Twists OR any 3-topping pizza for $7.99 each when you carry out. Try our Baked Apple Dip today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Cinnamon Baked Apple Dip – Domino's Dessert Dip"; }
  },
  "seo./about-pizza/bread/oven-baked-dips-and-twists/cheesy-marinara-dip/": {
    metaDescription: function(d) { return "Get Domino's New Oven-Baked Dips and Twists OR any 3-topping pizza for $7.99 each when you carryout. Try our Cheesy Marinara Dip today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Cheesy Marinara Dip – Domino's Savory Dip"; }
  },
  "seo./about-pizza/bread/oven-baked-dips-and-twists/five-cheese-dip/": {
    metaDescription: function(d) { return "Get Domino's New Oven-Baked Dips and Twists OR any 3-topping pizza for $7.99 each when you carryout. Try our Five Cheese Dip today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Oven-Baked Five Cheese Dip – Domino's Savory Dips"; }
  },
  "seo./about-pizza/brownies-near-me/": {
    metaDescription: function(d) { return "Looking for brownies near me? Look no further than Domino&" + "#" + "x2019;s. Our Marbled Cookie Brownie is cut into nine pieces so you can share &mdash; or not."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Brownies Near Me"; }
  },
  "seo./about-pizza/caesar-salad-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re wondering about Caesar salad near me, Domino&" + "#" + "x2019;s is the answer. Our Chicken Caesar salad works as an entr&eacute;e or an add-on to pizza, sandwiches, and pasta."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Caesar Salad Near Me"; }
  },
  "seo./about-pizza/calories-in-a-slice-of-pizza/": {
    metaDescription: function(d) { return "Calculating the number of calories in a slice of pizza is easy with the Domino&" + "#" + "x2019;s Cal-O-Meter. Get nutritional information for pizza, salad, pasta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Calories in a Slice of Pizza"; }
  },
  "seo./about-pizza/carry-out-pizza/": {
    metaDescription: function(d) { return "It's easy to get carry out pizza from Domino's. No matter your carryout pizza order, it'll be ready and waiting for you at the time you specify."; },
    metaKeywords: function(d) { return "carryout pizza"; },
    title: function(d) { return "Learn About Carryout Pizza from Domino's"; }
  },
  "seo./about-pizza/carryout-insurance/": {
    metaDescription: function(d) { return "Domino’s makes sure your pizza is perfect when you pick it up. Now, Carryout Insurance protects your order from any accidents that might happen after you leave our stores."; },
    metaKeywords: function(d) { return "carryout insurance"; },
    title: function(d) { return "Domino’s Carryout Insurance Program"; }
  },
  "seo./about-pizza/carside-delivery/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s Carside Delivery is contact-free carryout. Just pull up, check in online, and we&" + "#" + "x2019;ll bring your pizza and more out to your vehicle."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Carside Delivery Is Contact-Free Carryout"; }
  },
  "seo./about-pizza/catering/": {
    metaDescription: function(d) { return "Domino's has catering services for family, business, school, and organization events. Order our pizza, pasta, sandwiches, chicken, desserts, and drinks online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Plan Party or Event Catering with Domino's Pizza"; }
  },
  "seo./about-pizza/chicken-alfredo-near-me/": {
    metaDescription: function(d) { return "If you&" + "#" + "x2019;re looking for Chicken Alfredo near me, look to Domino&" + "#" + "x2019;s. We deliver hearty pasta, including Chicken Alfredo, as well as pizza, sandwiches, chicken, salad, and dessert."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Chicken Alfredo Near Me"; }
  },
  "seo./about-pizza/chicken-wings-delivery-near-you/": {
    metaDescription: function(d) { return "Have a hankering for chicken wings delivery? Thanks to Domino&" + "#" + "x2019;s, there&" + "#" + "x2019;s always chicken wings delivery near you."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Chicken Wings Delivery"; }
  },
  "seo./about-pizza/chicken-wings/": {
    metaDescription: function(d) { return "Discover Domino's chicken wings with marinated and oven baked flavors. Order your favorites today by location and sign up for free coupon deals!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Chicken Wings Recipe with Marinated & Oven Baked Flavors"; }
  },
  "seo./about-pizza/chicken/boneless-chicken/": {
    metaDescription: function(d) { return "Domino's boneless chicken is the answer to your craving for boneless chicken wings. Customize your boneless chicken order with your choice of five dipping sauces."; },
    metaKeywords: function(d) { return "boneless chicken"; },
    title: function(d) { return "Discover the Boneless Chicken at Domino's"; }
  },
  "seo./about-pizza/chicken/chicken-wings-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for chicken wings near me, look no further than Domino&" + "#" + "x2019;s. We deliver delicious chicken wings, boneless chicken, pizza, pasta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Chicken Wings Near Me"; }
  },
  "seo./about-pizza/chicken/hot-wings/": {
    metaDescription: function(d) { return "Chicken wings are one thing, but hot wings (aka Buffalo wings) are a whole other ballgame. To satisfy a craving for hot wings and more, call or click Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Hot Wings"; }
  },
  "seo./about-pizza/chicken/mango-habanero-wings/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s Sweet Mango Habanero Wings are the perfect marriage of sweet and spicy. They are just one of the varieties of chicken wings available for carryout or delivery at Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Mango Habanero Wings"; }
  },
  "seo./about-pizza/chicken/wing-delivery-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re craving wings, nothing else will satisfy. Look to Domino&" + "#" + "x2019;s for wing delivery near you. Our chicken wings come in 8-piece, 14-piece, and 40-piece orders."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Wing Delivery Near Me"; }
  },
  "seo./about-pizza/chicken/wings-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for delicious wings near me, look no further than your local Domino&" + "#" + "x2019;s. Wings are available in 8-piece, 14-piece, or 40-piece orders."; },
    metaKeywords: function(d) { return "wings near me"; },
    title: function(d) { return "Who has the Best Wings Near Me"; }
  },
  "seo./about-pizza/chicken/wings-restaurant-near-me/": {
    metaDescription: function(d) { return "Searching for wing restaurants near me? Domino&" + "#" + "x2019;s is the answer. We have four kinds of chicken wings &mdash; with dipping sauces &mdash; for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Wing Restaurants Near Me"; }
  },
  "seo./about-pizza/chicken/wings-restaurant/": {
    metaDescription: function(d) { return "If you&" + "#" + "x2019;re searching for a wings restaurant, you&" + "#" + "x2019;ve found it: Domino&" + "#" + "x2019;s. We have four kinds of chicken wings, plus Boneless Chicken and Specialty Chicken."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Wings Restaurant"; }
  },
  "seo./about-pizza/comida-a-domicilio/": function(d) { return ""; },
  "seo./about-pizza/commander-en-ligne/": function(d) { return ""; },
  "seo./about-pizza/consegna-a-domicilio/": function(d) { return ""; },
  "seo./about-pizza/consegna-pizza-online/": function(d) { return ""; },
  "seo./about-pizza/consegna-pizza/": function(d) { return ""; },
  "seo./about-pizza/convenient-dinners/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "When You Need Convenient Dinners, Think Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/coupons/": {
    metaDescription: function(d) { return "Get Domino's promotional coupons for delivery or carryout. Dominos has delicious pizzas, pasta, bread, sandwiches, specialty chicken, desserts &amp; drinks."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get National & Local Dominos Pizza Coupons for Carryout or Delivery"; }
  },
  "seo./about-pizza/crusts/brooklyn-style/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s Brooklyn Style pizza is a hand&mdash;stretched, thin&mdash;crust fan favorite, perfect for satisfying a crowd. Order online and track your order with Domino&" + "#" + "x2019;s Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Go Big With Domino&" + "#" + "x2019;s Brooklyn Style Pizza"; }
  },
  "seo./about-pizza/crusts/crunchy-thin/": {
    metaDescription: function(d) { return "Satisfy your cravings with a Crunchy Thin Crust pizza from Domino's. Add pastas, sandwiches, chicken wings, and dessert to your online order with just a few clicks."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Crunchy Thin Crust Pizza From Domino's"; }
  },
  "seo./about-pizza/crusts/deep-dish-pizza/": {
    metaDescription: function(d) { return "Craving deep&mdash;dish pizza? Look no further than the Domino&" + "#" + "x2019;s Handmade Pan, loaded with cheese, tomato sauce, and toppings. Any of our Specialty Pizzas can be customized as a medium Handmade Pan pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Deep&mdash;Dish Pizza From Domino&" + "#" + "x2019;s for Carryout or Delivery"; }
  },
  "seo./about-pizza/crusts/gluten-free/": {
    metaDescription: function(d) { return "Count on pizzas, pastas, and sandwiches from Domino&" + "#" + "x2019;s to please the entire crowd, including guests with gluten sensitivities. Try our Gluten Free Crust today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Gluten Free Crust Pizza at Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/crusts/hand-tossed/": {
    metaDescription: function(d) { return "Domino's offers a variety of pizzas, including the Hand Tossed crust, as well as pastas, sandwiches, desserts, and more. Track your order with Domino's Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Enjoy a Hand Tossed Pizza at Domino's"; }
  },
  "seo./about-pizza/crusts/handmade-pan/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s thick&mdash;crust Handmade Pan pizza earns rave reviews. Our Handmade Pan pizza crust is made from fresh, never frozen, dough."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Handmade Pan Pizza Perfection From Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/crusts/thin-crust-pizza/": {
    metaDescription: function(d) { return "If thin crust pizza is your favorite, then you&" + "#" + "x2019;ve come to the right place. Get any Domino&" + "#" + "x2019;s Specialty Pizza with thin crust, or build your own thin crust pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Thin Crust Pizza"; }
  },
  "seo./about-pizza/cupones/": function(d) { return ""; },
  "seo./about-pizza/deals/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/delivery-desserts-near-me/": {
    metaDescription: function(d) { return "Looking for delivery desserts near me? Domino&" + "#" + "x2019;s has you covered with Chocolate Lava Crunch Cakes, Marbled Cookie Brownie, and Cinnamon Bread Twists."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Delivery Desserts Near Me"; }
  },
  "seo./about-pizza/delivery-hotspots/": {
    metaDescription: function(d) { return "With Domino&" + "#" + "x2019;s Hotspots<sup>&reg;</sup>, you can get Domino&" + "#" + "x2019;s pizza delivered piping hot to parks, beaches, stadium lots, and other outdoor locations."; },
    metaKeywords: function(d) { return "delivery hotspots"; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Hotspots&reg; Pizza Delivery to Outdoor Locations"; }
  },
  "seo./about-pizza/delivery-insurance/": {
    metaDescription: function(d) { return "When you order from Domino&" + "#" + "x2019;s, you place your trust in us. Domino&" + "#" + "x2019;s delivery insurance program guarantees that if you&" + "#" + "x2019;re not completely satisfied with your order, we&" + "#" + "x2019;ll make it right."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Delivery Insurance"; }
  },
  "seo./about-pizza/delivery-near-me-open-now/": {
    metaDescription: function(d) { return "It&" + "#" + "x2019;s late and you want something good to eat, but you don&" + "#" + "x2019;t want to go get it. Search for delivery near me open now and order pizza and more from Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Delivery Near Me Open Now"; }
  },
  "seo./about-pizza/delivery-near-me/": {
    metaDescription: function(d) { return "When you think delivery near me, think Domino&" + "#" + "x2019;s. With thousands of locations, your order of pizzas, pastas, sandwiches, and more will reach you fast and fresh. The delivery fee will vary."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Offers Pizza Delivery Near Me"; }
  },
  "seo./about-pizza/delivery-places-near-me/": {
    metaDescription: function(d) { return "When it comes to delivery places near me, Domino&" + "#" + "x2019;s is the only place that delivers oven-baked pizza goodness to your door."; },
    metaKeywords: function(d) { return "delivery places near me"; },
    title: function(d) { return "Discover Delivery Places Near Me"; }
  },
  "seo./about-pizza/delivery-restaurants/": {
    metaDescription: function(d) { return "Delivery restaurants are a divine convenience when you don&" + "#" + "x2019;t feel like cooking or even going out. Good news: All Domino&" + "#" + "x2019;s restaurants deliver."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Delivery Restaurants"; }
  },
  "seo./about-pizza/desserts/brownies/": {
    metaDescription: function(d) { return "Few desserts are more beloved than brownies. Domino&" + "#" + "x2019;s Marbled Cookie Brownie brings together the fudge brownie and milk chocolate chunk cookie."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Brownies"; }
  },
  "seo./about-pizza/desserts/cinnamon-bread-twists/": {
    metaDescription: function(d) { return "Domino's Cinnamon Bread Twists are sweet, irresistible treats. Order them online for dessert or for parties."; },
    metaKeywords: function(d) { return "cinnamon bread twists"; },
    title: function(d) { return "Satisfy Your Sweet Tooth With Domino's Cinnamon Bread Twists"; }
  },
  "seo./about-pizza/desserts/desserts-near-me/": {
    metaDescription: function(d) { return "When the inevitable sweet tooth strikes, you&" + "#" + "x2019;ll find yourself wondering, Where can I get dessert near me? Domino&" + "#" + "x2019;s is a delicious match for dessert cravings."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Dessert Near Me"; }
  },
  "seo./about-pizza/desserts/lava-cake/": {
    metaDescription: function(d) { return "Few desserts invoke more excitement than molten lava cake. Domino&" + "#" + "x2019;s has Chocolate Lava Crunch Cakes in pairs for sharing &mdash; or not."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lava Cake"; }
  },
  "seo./about-pizza/desserts/marbled-cookie-brownie/": {
    metaDescription: function(d) { return "Try our Marbled Cookie Brownie: a delicious swirl of chocolate chunk cookie and fudge brownie. Go ahead! Add one to your Domino's order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order a Marbled Cookie Brownie Online at Domino's Today"; }
  },
  "seo./about-pizza/dinner-bell/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s Dinner Bell, an innovative delivery experience available through the Domino&" + "#" + "x2019;s app, makes it easy for people to come together to enjoy a meal."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "About Domino&" + "#" + "x2019;s Dinner Bell"; }
  },
  "seo./about-pizza/discounts/": {
    metaDescription: function(d) { return "Browse the menu & order online from Domino's for carryout or delivery. Build your own pizza with a variety of crust options to choose from. Try Hand Tossed, Handmade Pan, Crunchy Thin, Brooklyn Style, or Gluten Free Crust today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online Pizza from our Menu for Delivery or Carryout at Domino's"; }
  },
  "seo./about-pizza/dominos-and-basketball/": {
    metaDescription: function(d) { return "Order online for pick-up or delivery Domino's pizza or chicken wings and more for your basketball watching party. Sign up for free coupons and deals."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Domino's for Basketball Watching Parties - Pizza & Chicken Wings"; }
  },
  "seo./about-pizza/dominos-and-football/": {
    metaDescription: function(d) { return "Order Domino's pizza or chicken wings online for carryout or delivery for your football watching party. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Domino's for Football Watching Parties with Pizza, Wings & More"; }
  },
  "seo./about-pizza/dominos-and-kids-parties/": {
    metaDescription: function(d) { return "Domino's and kid's parties go together perfectly when you order pizza, wings, sandwiches, pastas, desserts, beverages and more. Order online for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's is Perfect for Kid's Parties with Pizza, Wings, Pasta, & More"; }
  },
  "seo./about-pizza/dominos-as-a-snack/": {
    metaDescription: function(d) { return "Choose Domino's as a snack and order pizza, pasta, sandwiches, wings, & desserts to cure your snack attack. Order online for carryout or delivery!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Choose Pizza as a Snack! Order Domino's for Carryout or Delivery"; }
  },
  "seo./about-pizza/dominos-cupones/": function(d) { return ""; },
  "seo./about-pizza/dominos-delivery-hours/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s delivery hours range from late morning to past midnight. Almost anytime you&" + "#" + "x2019;re hungry, we&" + "#" + "x2019;re ready to take your order for pizza, pasta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Delivery Hours"; }
  },
  "seo./about-pizza/dominos-delivery/": function(d) { return ""; },
  "seo./about-pizza/dominos-en-linea/": function(d) { return ""; },
  "seo./about-pizza/dominos-foodpanda-promocode/": {
  },
  "seo./about-pizza/dominos-grabfood-promo-code/": {
  },
  "seo./about-pizza/dominos-menu/": function(d) { return ""; },
  "seo./about-pizza/dominos-promociones/": function(d) { return ""; },
  "seo./about-pizza/en-linea-entrega/": function(d) { return ""; },
  "seo./about-pizza/en-linea-pizza/": function(d) { return ""; },
  "seo./about-pizza/entrega-comida/": function(d) { return ""; },
  "seo./about-pizza/extended-food-delivery-hours/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s isn&" + "#" + "x2019;t your typical 24 hr food delivery pizzeria, but we have extended delivery and carryout hours to satisfy all your past-midnight pizza cravings."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Has Extended Hours but Not 24 Hr Food Delivery"; }
  },
  "seo./about-pizza/family-dinner/": {
    metaDescription: function(d) { return "Between work, practice, and after-school activities, family dinner might not happen as often as you'd like. Domino's has plenty of tried-and-true dishes that are perfect for family dinner."; },
    metaKeywords: function(d) { return "family dinner"; },
    title: function(d) { return "Discover the Perfect Family Dinner at Domino's"; }
  },
  "seo./about-pizza/family-meal-deals/": {
    metaDescription: function(d) { return "For family meal deals, look no further than Domino’s Perfect Combo Deal: 2 medium 1-topping pizzas, Parmesan Bread Bites, Cinnamon Bread Twists, and a 2-liter of Coke."; },
    metaKeywords: function(d) { return "Family meal deals, Family meal deals near me, Family meal deals to go, Family meal deals to go near me"; },
    title: function(d) { return "Family Meal Deals"; }
  },
  "seo./about-pizza/faq/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/fast-food-near-me/": {
    metaDescription: function(d) { return "When you start to wonder about fast food near me, think Domino&" + "#" + "x2019;s. With tasty pizza, chicken, sandwiches, pasta, and dessert, we deliver."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Fast Food Near Me"; }
  },
  "seo./about-pizza/food-delivery-near-me-open-now/": {
    metaDescription: function(d) { return "When you want something delicious to eat and you don&" + "#" + "x2019;t want to go out to get it, a search for food delivery near me open now delivers Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Food Delivery Near Me Open Now"; }
  },
  "seo./about-pizza/food-delivery-near-me/": {
    metaDescription: function(d) { return "With restaurants that deliver near me, Domino&" + "#" + "x2019;s makes it easy to plan parties or just answer the question, what's for dinner?"; },
    metaKeywords: function(d) { return "restaurants that deliver near me"; },
    title: function(d) { return "Restaurants That Deliver Near Me"; }
  },
  "seo./about-pizza/food-delivery/": {
    metaDescription: function(d) { return "Find a Domino's location near me for pizza, pasta, sandwiches, wings, breads, desserts & drinks. Order online & track your delivery with Domino's Tracker®!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Food Delivery Near Me - Order Pizza, Wings, Pasta, Sandwiches, &amp; More"; }
  },
  "seo./about-pizza/food-near-me/": {
    metaDescription: function(d) { return "Order food online from Domino's and discover there's more to just ordering food online. Try interactive games, cheesy font, iPad app, and Domino's tracker."; },
    metaKeywords: function(d) { return "food near me"; },
    title: function(d) { return "Order Food Online From Domino's and More Than Ordering Food Online"; }
  },
  "seo./about-pizza/food-online/": {
    metaDescription: function(d) { return "Order food online from Domino's and discover there's more to just ordering food online. Try interactive games, cheesy font, iPad app, and Domino's tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Food Online From Domino's and More Than Ordering Food Online"; }
  },
  "seo./about-pizza/food-open-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re hungry and the fridge is empty, you may go in search of food open near me. For pizza, chicken, sandwiches, and more, there is Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Food Open Near Me"; }
  },
  "seo./about-pizza/food-order-online-malaysia/": {
  },
  "seo./about-pizza/food-places-near-me/": {
    metaDescription: function(d) { return "When hunger strikes, you&" + "#" + "x2019;ll start to wonder, What are some great food places near me? Domino&" + "#" + "x2019;s has tasty pizza, chicken, sandwiches, pasta, and dessert."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Food Places Near Me"; }
  },
  "seo./about-pizza/food-places-that-deliver-near-me/": {
    metaDescription: function(d) { return "Domino's is the recognized world leader in pizza delivery, so it makes sense that we'd rank up there when it comes to food places that deliver near me."; },
    metaKeywords: function(d) { return "food places that deliver near me"; },
    title: function(d) { return "Food Places That Deliver Near Me"; }
  },
  "seo./about-pizza/good-lunch-places-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for good lunch places near me, look no further than Domino&" + "#" + "x2019;s. We have all your lunchtime favorites, from sandwiches to pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Good Lunch Places Near Me"; }
  },
  "seo./about-pizza/gps-tracker/": {
    metaDescription: function(d) { return "The Domino’s Tracker now has GPS for pizza delivery drivers, giving customers real-time info about when their food will arrive."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino’s Tracker Now Has Pizza Delivery GPS"; }
  },
  "seo./about-pizza/how-many-calories-in-a-piece-of-pizza/": {
    metaDescription: function(d) { return "Wondering how many calories are in a piece of pizza? Domino&" + "#" + "x2019;s Cal-O-Meter makes it easy to calculate the calories in pizza and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "How Many Calories in a Piece of Pizza?"; }
  },
  "seo./about-pizza/how-many-slices-are-in-a-large-pizza/": {
    metaDescription: function(d) { return "At Domino's, the answer to how many slices are in a large pizza depends on the type of crust you choose. Here's how to know how many slices are in a large pizza."; },
    metaKeywords: function(d) { return "how many slices in a large pizza"; },
    title: function(d) { return "How Many Slices in a Large Pizza?"; }
  },
  "seo./about-pizza/ideas-for-dinner/": {
    metaDescription: function(d) { return "In addition to helping you save time with easy ideas for dinner, such as pasta, pizza, and oven-baked sandwiches, Domino's offers online coupons and money-saving deals."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Has Ideas for Dinner | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/kl-fast-food-delivery-online/": {
  },
  "seo./about-pizza/late-night-delivery-near-me/": {
    metaDescription: function(d) { return "Sometimes hunger strikes late at night. When you need late night delivery near me, Domino&" + "#" + "x2019;s has pizza, pasta, sandwiches, chicken, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Late Night Delivery Near Me"; }
  },
  "seo./about-pizza/late-night-food-delivery/": {
    metaDescription: function(d) { return "Domino's specializes in pizzas, pastas, sandwiches, wings, and more day and night. You can count on us for late-night food delivery that's fast and convenient."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Think Domino's Pizza for Online Late-Night Food Delivery"; }
  },
  "seo./about-pizza/late-night-food-near-me/": {
    metaDescription: function(d) { return "Time flies when you&" + "#" + "x2019;re having fun. And fun times can leave you hungry and in search of late night food near me. Domino&" + "#" + "x2019;s has extended delivery hours."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Late Night Food Near Me"; }
  },
  "seo./about-pizza/late-night-food/": {
    metaDescription: function(d) { return "Domino's has countless options for late night food, because our late night menu is the same as our regular menu. We stay open after other places have closed their kitchens to give you the tastiest options for late night food."; },
    metaKeywords: function(d) { return "late night food"; },
    title: function(d) { return "Discover Late Night Food Options"; }
  },
  "seo./about-pizza/late-night-pizza/": {
    metaDescription: function(d) { return "Domino's satisfies late-night pizza cravings, along with hankerings for Oven Baked Sandwiches and hearty pasta dishes. Order online and your food is on the way."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Is the Answer to Late-Night Pizza Cravings | Order Online"; }
  },
  "seo./about-pizza/livraison-de-repas/": function(d) { return ""; },
  "seo./about-pizza/livraison/": function(d) { return ""; },
  "seo./about-pizza/loaded-tots/": {
    metaDescription: function(d) { return "Order new Domino’s Loaded Tots online! Available for carryout or delivery. Sign up for email & text offers for great deals on your next Loaded Tots order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "NEW! Loaded Tots Near You | Domino’s"; }
  },
  "seo./about-pizza/local-pizza-places/": {
    metaDescription: function(d) { return "At Domino's, our goal is to deliver delicious pizza, just the way you like it - hot, fresh, and fast. That's why we have so many convenient local pizza places."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Thousands of Local Pizza Places"; }
  },
  "seo./about-pizza/local-pizza/": {
    metaDescription: function(d) { return "Having a Domino's restaurant in your neighborhood is a little bit like having several local pizza places in one. Domino's is the local pizza place for a delicious hand-tossed pizza every time."; },
    metaKeywords: function(d) { return "local pizza place, local pizza places"; },
    title: function(d) { return "Discover Local Pizza Places in Your Area"; }
  },
  "seo./about-pizza/local-places-to-eat-near-me/": {
    metaDescription: function(d) { return "When hunger strikes and you need something fast, you look for local places to eat near me. Good news: There&" + "#" + "x2019;s probably a Domino&" + "#" + "x2019;s restaurant near you."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Local Places to Eat Near Me"; }
  },
  "seo./about-pizza/local-restaurants-near-me/": {
    metaDescription: function(d) { return "There aren't too many places in the world where Domino's isn't a local restaurant near me. And because Domino's offers so many different menu items, it's like having several different local restaurants all in one place!"; },
    metaKeywords: function(d) { return "local restaurants near me"; },
    title: function(d) { return "Find Local Restaurants Near Me"; }
  },
  "seo./about-pizza/low-calorie-pizza/": {
    metaDescription: function(d) { return "At Domino's, everything on our menu, including our pizza, is made fresh to order. There are many ways to lighten up your Domino's order to make it a low calorie pizza."; },
    metaKeywords: function(d) { return "low calorie pizza"; },
    title: function(d) { return "Discover Low Calorie Pizza at Domino's"; }
  },
  "seo./about-pizza/lunch-catering/": {
    metaDescription: function(d) { return "Domino's pizza restaurants provide lunch catering for businesses, schools, and organizations of all sizes. We make it easy to plan lunch catering for a small gathering or a large group."; },
    metaKeywords: function(d) { return "lunch catering, lunch catering order"; },
    title: function(d) { return "Get Lunch Catering Services through Domino's"; }
  },
  "seo./about-pizza/lunch-delivery-near-me/": {
    metaDescription: function(d) { return "Looking for lunch delivery near me? Look no further than Domino&" + "#" + "x2019;s. We deliver delicious pizza, chicken, sandwiches, pasta, and dessert at lunchtime &mdash; or anytime."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lunch Delivery Near Me"; }
  },
  "seo./about-pizza/lunch-food-near-me/": {
    metaDescription: function(d) { return "Looking for lunch food near me? Look no further than Domino&" + "#" + "x2019;s. We have pizza, sandwiches, salads, chicken, and pasta for delivery or carryout."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lunch Food Near Me"; }
  },
  "seo./about-pizza/lunch-ideas/": {
    metaDescription: function(d) { return "Discover Domino's lunch ideas for one or more. Advance order online small pizzas, oven baked sandwiches, boneless chicken, & wings for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Lunch Ideas near you. Order ahead and online for Delivery"; }
  },
  "seo./about-pizza/lunch-near-me/": {
    metaDescription: function(d) { return "Domino's has places near me that are open for lunch every day of the week. Just enter your location, and you'll be directed to the nearest Domino's open for lunch."; },
    metaKeywords: function(d) { return "lunch near me"; },
    title: function(d) { return "Discover Who Has the Best Lunch Near Me"; }
  },
  "seo./about-pizza/lunch-options-near-me/": {
    metaDescription: function(d) { return "When it comes to lunch options near me, there&" + "#" + "x2019;s always Domino&" + "#" + "x2019;s. In addition to pizza, we offer sandwiches, salads, chicken, and pasta for your midday meal."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lunch Options Near Me"; }
  },
  "seo./about-pizza/lunch-places-near-me/": {
    metaDescription: function(d) { return "Escape the ordinary lunch places near me with Domino&" + "#" + "x2019;s. A lunch place near me like Domino&" + "#" + "x2019;s always offers great deals and savings on the meals you crave."; },
    metaKeywords: function(d) { return "lunch places near me"; },
    title: function(d) { return "Discover Lunch Places Near Me"; }
  },
  "seo./about-pizza/lunch-restaurants-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for lunch spots near me, look no further than Domino&" + "#" + "x2019;s. Order pizza, pasta, sandwiches, and salads for lunch &mdash; for yourself or for a crowd."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lunch Restaurants Near Me"; }
  },
  "seo./about-pizza/lunch-spots-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for lunch spots near me, end your search with Domino&" + "#" + "x2019;s. Order pizza, pasta, sandwiches, and more for lunch, brunch, dinner, or a snack."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Lunch Spots Near Me"; }
  },
  "seo./about-pizza/menu/": {
    metaDescription: function(d) { return "Learn about Domino's Inspired Pizza menu that's more than a pizza menu, as well as customer feed back. Sign up for deals or find a nearby location."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Menu Information - Much more than just a Pizza"; }
  },
  "seo./about-pizza/menu/bread/": {
    metaDescription: function(d) { return "Domino's has several bread options on the menu, including our new Bread Twists in Garlic, Parmesan, and Cinnamon."; },
    metaKeywords: function(d) { return "bread"; },
    title: function(d) { return "Find Savory and Sweet Bread at Domino's"; }
  },
  "seo./about-pizza/menu/chocolate-dessert/marbled-cookie-brownie/": {
    metaDescription: function(d) { return "Try our Marbled Cookie Brownie: a delicious swirl of chocolate chunk cookie and fudge brownie. Go ahead! Add one to your Domino's order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order a Marbled Cookie Brownie Online at Domino's Today"; }
  },
  "seo./about-pizza/menu/desserts/": {
    metaDescription: function(d) { return "Domino's desserts, including Cinnamon Bread Twists, are sweet endings to a delicious meal."; },
    metaKeywords: function(d) { return "desserts"; },
    title: function(d) { return "Get Chocolate, Brownie, and Cinnamon Desserts at Domino’s"; }
  },
  "seo./about-pizza/menu/drinks/": {
    metaDescription: function(d) { return "From hosting parties to feeding your family, every event needs refreshing drinks. Domino's proudly serves Coca-Cola products, including Coke, Sprite, Fanta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Cold Drinks That Complement Pizza and More"; }
  },
  "seo./about-pizza/menu/pasta/": {
    metaDescription: function(d) { return "Chicken Parmesan, Chicken Alfredo, and Chicken Carbonara & vegetarian-friendly Pasta Primavera- order at a Domino's restaurant near you."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pasta"; }
  },
  "seo./about-pizza/menu/salad/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s has three delicious salads to choose from, as well as three different dressing options for added zing."; },
    metaKeywords: function(d) { return "salad"; },
    title: function(d) { return "Discover the Salad at Domino&" + "#" + "x2019;s Pizza"; }
  },
  "seo./about-pizza/menu/sandwiches/": {
    metaDescription: function(d) { return "When you’re getting hungry for pizza, pasta, sandwiches, and dessert, think Domino’s. Try the Oven-Baked Chicken Parm and Philly Cheese-steak sandwiches today."; },
    metaKeywords: function(d) { return "sandwiches"; },
    title: function(d) { return "Domino’s Oven-Baked Sandwiches Are Talk of the Town - Order Online"; }
  },
  "seo./about-pizza/microsites/": {
    metaDescription: function(d) { return "Domino's Pizza microsites deliver a glimpse into DXP: The Ultimate Pizza Delivery Vehicle, Pizza Payback, Domino's Anyware, and charitable giving."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Microsites Are Fun and Informative"; }
  },
  "seo./about-pizza/nearby-restaurants/": {
    metaDescription: function(d) { return "When looking for nearby restaurants, you’re sure to find a Domino’s ready to satisfy your pizza and pasta cravings."; },
    metaKeywords: function(d) { return "nearby restaurants"; },
    title: function(d) { return "Locate Nearby Restaurants in Your Area"; }
  },
  "seo./about-pizza/nearest-food-places-near-me/": {
    metaDescription: function(d) { return "What are the nearest food places near me? Domino&" + "#" + "x2019;s, of course. With nearly 15,000+ locations worldwide, there&" + "#" + "x2019;s probably a Domino&" + "#" + "x2019;s restaurant in your neighborhood."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Nearest Food Places Near Me"; }
  },
  "seo./about-pizza/new-york-crust-pizza/": {
  },
  "seo./about-pizza/new-york-pizza/": {
    metaDescription: function(d) { return "We at Domino's agree that New York pizza is particularly tasty. We created our Brooklyn-style crust as a tribute to the beloved pie."; },
    metaKeywords: function(d) { return "new york pizza"; },
    title: function(d) { return "Discover New York Pizza at Domino's"; }
  },
  "seo./about-pizza/o-donaske/": function(d) { return ""; },
  "seo./about-pizza/o-menu/": function(d) { return ""; },
  "seo./about-pizza/occasions/24-hr-food-delivery/": {
    metaDescription: function(d) { return "Domino's isn't your typical 24 hr food delivery pizzeria, but we have extended delivery and carryout hours to satisfy all your past-midnight pizza cravings."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Extended Hours but Not 24 Hr Food Delivery"; }
  },
  "seo./about-pizza/occasions/baseball/": {
    metaDescription: function(d) { return "America's favorite pizza, Domino's, and America's favorite pastime, baseball, make for the best summertime memories, fantasy draft parties, and championship games."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Baseball and Pizza Are the Winning National Championship Team"; }
  },
  "seo./about-pizza/occasions/birthday-parties/": {
    metaDescription: function(d) { return "Birthday parties can be stressful, but don't worry. Domino's has pizzas, pastas, drinks, wings and desserts to keep the whole crew fed, happy and having fun."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Birthday Parties Need Domino's Pizza Canada® | Order for Pickup or Delivery"; }
  },
  "seo./about-pizza/occasions/delivery-near-me/": {
    metaDescription: function(d) { return "Thinking of pizza delivery near me? With over 5,000 locations, your order of pizzas, pastas, sandwiches, and more will arrive fast. Order online and use Domino's Tracker"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Offers Pizza Delivery Near Me"; }
  },
  "seo./about-pizza/occasions/dominos-and-basketball/": {
    metaDescription: function(d) { return "Order online for pick-up or delivery Domino's pizza or chicken wings and more for your basketball watching party. Sign up for free coupons and deals."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Domino's for Basketball Watching Parties - Pizza & Chicken Wings"; }
  },
  "seo./about-pizza/occasions/dominos-and-football/": {
    metaDescription: function(d) { return "Order Domino's pizza or chicken wings online for carryout or delivery for your football watching party. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Domino's for Football Watching Parties with Pizza, Wings & More"; }
  },
  "seo./about-pizza/occasions/dominos-and-kids-parties/": {
    metaDescription: function(d) { return "Domino's and kid's parties go together perfectly when you order pizza, wings, sandwiches, pastas, desserts, beverages and more. Order online for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's is Perfect for Kid's Parties with Pizza, Wings, Pasta, & More"; }
  },
  "seo./about-pizza/occasions/easy-dinner-ideas/": {
    metaDescription: function(d) { return "For easy dinner ideas, you need to know only one name: Domino's. Our smartphone app makes it a cinch to order pizzas, pasta, sandwiches, and chicken for dinner."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Delivers Easy Dinner Ideas - Pizza, Pasta, & More"; }
  },
  "seo./about-pizza/occasions/food-delivery-near-me/": {
    metaDescription: function(d) { return "With restaurants that deliver near me, Domino&" + "#" + "x2019;s makes it easy to plan parties or just answer the question, what's for dinner?"; },
    metaKeywords: function(d) { return "restaurants that deliver near me"; },
    title: function(d) { return "Restaurants That Deliver Near Me"; }
  },
  "seo./about-pizza/occasions/ideas-for-dinner/": {
    metaDescription: function(d) { return "In addition to helping you save time with easy ideas for dinner, such as pasta, pizza, and oven-baked sandwiches, Domino's offers online coupons and money-saving deals."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Has Ideas for Dinner | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/occasions/late-night-food-delivery/": {
    metaDescription: function(d) { return "Domino's specializes in pizzas, pastas, sandwiches, wings, and more day and night. You can count on us for late-night food delivery that's fast and convenient."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Think Domino's Pizza Canada® for Online Late-Night Food Delivery"; }
  },
  "seo./about-pizza/occasions/late-night-pizza/": {
    metaDescription: function(d) { return "Domino's satisfies late-night pizza cravings, along with hankerings for Oven Baked Sandwiches and hearty pasta dishes. Order online and your food is on the way."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Is the Answer to Late-Night Pizza Cravings | Order Online"; }
  },
  "seo./about-pizza/occasions/local-pizza-places/": {
    metaDescription: function(d) { return "At Domino's, our goal is to deliver delicious pizza, just the way you like it - hot, fresh, and fast. That's why we have so many convenient local pizza places."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Thousands of Local Pizza Places"; }
  },
  "seo./about-pizza/occasions/office-parties/": {
    metaDescription: function(d) { return "Domino's is the best choice for catering office parties. Our pizzas, pastas, sandwiches, desserts, and drinks make it easy to keep all your co-workers happy."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Is the Best Choice for Catering Office Parties"; }
  },
  "seo./about-pizza/occasions/picnics/": {
    metaDescription: function(d) { return "Picnics include a soft blanket, a Frisbee, and lunch. Swing by Domino's for pizza, pasta, chicken, sandwiches and more &mdash; or have your food delivered to the park."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Perk Up Picnics With Domino's | Order Online Now"; }
  },
  "seo./about-pizza/occasions/snacks/": {
    metaDescription: function(d) { return "Pizza, pasta, sandwiches, chicken wings, and desserts from Domino&" + "#" + "x2019;s satisfy appetites large and small. Dominos will deliver pizza as a snack day or night. Order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get Pizza as a Snack at Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/offers/": {
    metaDescription: function(d) { return "Get Domino's promotional coupons for delivery or carryout. Dominos has delicious pizzas, pasta, bread, sandwiches, specialty chicken, desserts &amp; drinks."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get National & Local Dominos Pizza Coupons for Carryout or Delivery"; }
  },
  "seo./about-pizza/online-bestellen/": function(d) { return ""; },
  "seo./about-pizza/online-delivery/": {
    metaDescription: function(d) { return "Find a Domino's location near me for pizza, pasta, sandwiches, wings, breads, desserts & drinks. Order online & track your delivery with Domino's Tracker®!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online Delivery from a Domino's Pizza Canada® Restaurant Near Me"; }
  },
  "seo./about-pizza/online-food-delivery-near-me-malaysia/": {
  },
  "seo./about-pizza/online-order/": {
  },
  "seo./about-pizza/online-pizza/": {
    metaDescription: function(d) { return "Browse the menu & order online from Domino's for carryout or delivery. Build your own pizza with a variety of crust options to choose from. Try Hand Tossed, Handmade Pan, Crunchy Thin, Brooklyn Style, or Gluten Free Crust today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online Pizza from our Menu for Delivery or Carryout at Domino's"; }
  },
  "seo./about-pizza/options/crusts/brooklyn-style/": {
    metaDescription: function(d) { return "Domino's Brooklyn Style pizza is a hand-stretched fan favorite, perfect for satisfying crowds of all ages. Order online and track your order with Domino's Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Go Big With Domino's Brooklyn Style Pizza"; }
  },
  "seo./about-pizza/options/crusts/crunchy-thin/": {
    metaDescription: function(d) { return "Satisfy your cravings with a Crunchy Thin Crust pizza from Domino's. Add pastas, sandwiches, chicken wings, and dessert to your online order with just a few clicks."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Crunchy Thin Crust Pizza From Domino's"; }
  },
  "seo./about-pizza/options/crusts/deep-dish-pizza/": {
    metaDescription: function(d) { return "Order Deep-Dish Pizza From Domino's for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Deep-Dish Pizza From Domino's for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/crusts/gluten-free/": {
    metaDescription: function(d) { return "Count on pizzas, pastas, and sandwiches from Domino's to please the entire crowd, including guests with gluten sensitivities. Try our Gluten-Free Crust today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Gluten Free Crust Pizza at Domino's"; }
  },
  "seo./about-pizza/options/crusts/hand-tossed/": {
    metaDescription: function(d) { return "Domino's offers a variety of pizzas, including the Hand Tossed crust, as well as pastas, sandwiches, desserts, and more. Track your order with Domino's Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Enjoy a Hand Tossed Pizza at Domino's"; }
  },
  "seo./about-pizza/options/crusts/handmade-pan/": {
    metaDescription: function(d) { return "Domino's thick-crust Handmade Pan pizza earns rave reviews. Order pizzas, pastas, sandwiches, desserts, and more online and have them delivered right to your door."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Handmade Pan Pizza Perfection From Domino's"; }
  },
  "seo./about-pizza/options/sauces/alfredo-sauce/": {
    metaDescription: function(d) { return "Domino's offers a variety of pizzas and pastas for carryout and delivery, including Chicken Alfredo pasta. Order your favorite Alfredo sauce dish online and enjoy."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Takeout or Delivery Alfredo Sauce Dishes From Domino's"; }
  },
  "seo./about-pizza/options/sauces/bbq-sauce/": {
    metaDescription: function(d) { return "First, Domino's brought the taste of barbecue to pizza (think: Memphis BBQ Chicken pizza). Now, you can add BBQ sauce goodness to your order with Specialty Chicken."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Barbecue Pizza Satisfies BBQ Cravings | Order Online Today"; }
  },
  "seo./about-pizza/options/sauces/garlic-parmesan-white-sauce/": {
    metaDescription: function(d) { return "Want white sauce on your pizza or pasta? Build Your Own and request it! When you crave a unique Domino's pizza, customize it with garlic parmesan white sauce."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get Garlic Parmesan White Sauce on Your Domino's Pizza Canada®"; }
  },
  "seo./about-pizza/options/sauces/hot-sauce/": {
    metaDescription: function(d) { return "When your pizza or sandwich needs a bit of a punch, Domino's hot sauce is perfect for dipping &mdash; or drizzling. Give your Domino's order a kick and add hot sauce."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Pizza Online for Pickup or Delivery With Hot Sauce"; }
  },
  "seo./about-pizza/options/sauces/pizza-sauce/": {
    metaDescription: function(d) { return "Delicious pizza starts with delicious pizza sauce. Domino's offers nine tasty sauces, from tomato to Alfredo, so you can customize every order to your taste."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has the Perfect Pizza Sauce | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/sauces/tomato-sauce/": {
    metaDescription: function(d) { return "Domino's Tomato Sauce Is Delicious | Order for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Tomato Sauce Is Delicious | Order for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/sides/blue-cheese/": {
    metaDescription: function(d) { return "Domino's Blue Cheese sauce is creamy and tangy with a savory finish. Enjoy Blue Cheese sauce with chicken wings and sandwiches, and as a dipping sauce for pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Blue Cheese Sauce Is Good on Pizza, Chicken Wings and More"; }
  },
  "seo./about-pizza/options/sides/icing/": {
    metaDescription: function(d) { return "Domino's icing is a sweet, creamy dipping sauce with hints of vanilla in every bite. Try it with our signature Cinna Stix<sup>&reg;</sup> or decadent Chocolate Lava Crunch Cake."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Desserts With Icing at Domino's"; }
  },
  "seo./about-pizza/options/sides/mango-habanero-sauce/": {
    metaDescription: function(d) { return "When hot habanero peppers meet sweet mangoes, you have Domino's Mango Habanero Sauce. Try it on the Sweet and Spicy Chicken Habanero sandwich or even pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Mango Habanero Sauce on Your Domino's Pizza Canada®"; }
  },
  "seo./about-pizza/options/sides/marinara/": {
    metaDescription: function(d) { return "At Domino's, you can order marinara sauce in a dipping cup or on your pizza for a sweet taste that goes great with anything, including a veggie or traditional pepperoni pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Has Great Marinara Sauce"; }
  },
  "seo./about-pizza/options/sides/parmesan/": {
    metaDescription: function(d) { return "Parmesan cheese is so popular at Domino's that you can buy your own Parmesan shaker, perfect for adding extra to pizzas and pastas. Don't forget an order of Parmesan Bread Bites!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has Parmesan Bread Bites | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/sides/ranch/": {
    metaDescription: function(d) { return "Ranch has a creamy, tangy taste with black pepper and herbs that pairs with everything from pizza to chicken wings. Try our Chicken Bacon Ranch pizza or sandwich."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Ranch Goes With Everything at Domino's | Order for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/sides/salad/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s has three delicious salads to choose from, as well as three different dressing options for added zing."; },
    metaKeywords: function(d) { return "salad"; },
    title: function(d) { return "Discover the Salad at Domino&" + "#" + "x2019;s Pizza"; }
  },
  "seo./about-pizza/options/sizes/large/": {
    metaDescription: function(d) { return "Domino's pizza comes in a variety of sizes, including small, medium, large, and extra large. Order several large pizzas online now and feed the whole crew."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Large Pizza Online for Pickup or Delivery From Domino's"; }
  },
  "seo./about-pizza/options/sizes/medium/": {
    metaDescription: function(d) { return "A medium pizza (or two) from Domino's is great for any occasion, from date night to lunch with a friend. Choose your crust, pick your toppings, and order online now."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Medium Pizzas Online for Pickup or Delivery at Domino's"; }
  },
  "seo./about-pizza/options/sizes/small/": {
    metaDescription: function(d) { return "Domino's is America's favorite pizzeria for small pizzas, pastas, and more. Order online now, track your order with Domino's Tracker, and get ready to eat."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Ordering Small Pizzas Is a Big Deal at Domino's. Order Pizza Online"; }
  },
  "seo./about-pizza/options/sizes/x-large/": {
    metaDescription: function(d) { return "Satisfy X-large appetites with an X-large pizza (or two) from Domino's. Feed your cravings by ordering pizza, pasta, sandwiches, desserts, and more online now."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order X-Large Pizzas Online for Pickup or Delivery - Domino's Pizza Canada®"; }
  },
  "seo./about-pizza/options/topping/bacon/": {
    metaDescription: function(d) { return "Everything, even pizza, is better with bacon. Try one of Domino's bacon pizzas, like the Cali Chicken Bacon Ranch, or build your own for dinner delivery tonight."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Carryout or Delivery Domino's Pizza Canada® With Bacon"; }
  },
  "seo./about-pizza/options/topping/banana-peppers/": {
    metaDescription: function(d) { return "Banana peppers add a surprisingly sweet, tangy flavor to pizzas and sandwiches. Experiment by adding banana peppers to your usual Domino's order or build your own pizza or pasta."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® With Banana Peppers Is Delicious | Order Online"; }
  },
  "seo./about-pizza/options/topping/bbq-chicken/": {
    metaDescription: function(d) { return "There's a reason BBQ chicken is a summer picnic staple: It's hugely popular. Order Domino's Memphis BBQ Chicken pizza for your next party and watch the crowd go wild."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With BBQ Chicken for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/topping/beef/": {
    metaDescription: function(d) { return "Our seasoned beef is a flavorful addition to any Domino's pizza, from the Spinach & Feta to the Bacon Cheeseburger Feast. Order online for pickup or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Pickup or Delivery Domino's Pizza Canada® With Beef"; }
  },
  "seo./about-pizza/options/topping/black-olives/": {
    metaDescription: function(d) { return "Order Domino's Pizza With Black Olives for Pickup or Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Earthy black olives complement meats and veggies perfectly on pizza, making black olives a popular addition to pizzas like Domino's MeatZZa Feast or Spinach & Feta"; }
  },
  "seo./about-pizza/options/topping/buffalo-chicken/": {
    metaDescription: function(d) { return "For those who love the spicy sweetness of buffalo sauce without the messiness of wings, the Domino's Buffalo Chicken pizza gets you the best of both worlds."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Buffalo Chicken Pizza From Domino's"; }
  },
  "seo./about-pizza/options/topping/cheddar-cheese/": {
    metaDescription: function(d) { return "At Domino's, we know you can't get enough melty cheddar cheese. Order Domino's Stuffed Cheesy Bread, cheesy chicken bites, or one of our Specialty Pizzas today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Pizza Online for Pickup or Delivery with Cheddar Cheese"; }
  },
  "seo./about-pizza/options/topping/cheese/": {
    metaDescription: function(d) { return "Cheese is an essential ingredient in Domino's recipes. Professionals test cheddar, mozzarella, feta, Parmesan, and provolone cheeses for ideal flavor and freshness."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "What's Behind Domino's Cheese for Pizza, Sandwiches, and More?"; }
  },
  "seo./about-pizza/options/topping/chicken/": {
    metaDescription: function(d) { return "Domino's uses whole breast white meat chicken, which we feature in pizzas like Buffalo Chicken and Memphis BBQ. Add an order of Specialty Chicken for more goodness."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Pickup or Delivery Domino's Pizza Canada® With Chicken"; }
  },
  "seo./about-pizza/options/topping/diced-tomatoes/": {
    metaDescription: function(d) { return "Diced tomatoes are perfect for Italian dishes, especially pizza. Add a little or a lot for a burst of freshness to your favorite Domino's Pizza Canada®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Diced Tomatoes Today"; }
  },
  "seo./about-pizza/options/topping/feta-cheese/": {
    metaDescription: function(d) { return "Feta cheese from Domino's is a delicious addition to our Specialty Pizzas, Stuffed Cheesy Bread, and pastas. Track your Spinach &amp; Feta pizza with Online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Feta Cheese Pizza"; }
  },
  "seo./about-pizza/options/topping/garlic/": {
    metaDescription: function(d) { return "Domino's Pizza Canada® With the Great Taste of Garlic | Order Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® With the Great Taste of Garlic | Order Delivery Today"; }
  },
  "seo./about-pizza/options/topping/green-peppers/": {
    metaDescription: function(d) { return "Green peppers are delicious on pizza and sandwiches. Order the Philly Cheese Steak or Deluxe pizzas or build your own pie with extra green pepper crunch."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Green Peppers Online"; }
  },
  "seo./about-pizza/options/topping/habanero/": {
    metaDescription: function(d) { return "Our Sweet Mango Habanero sauce is surprisingly versatile, adding a tangy kick to sandwiches, chicken, wings, and even pizza, especially the Honolulu Hawaiian."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has a Habanero Sauce That Goes on Pizza and More"; }
  },
  "seo./about-pizza/options/topping/ham/": {
    metaDescription: function(d) { return "Ham on pizza pairs well with other meats, spicy sauces, and fruit. Order online and prepare to go on a Hawaiian adventure when your pineapple and ham pizza arrives."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pizza Canada® With Ham"; }
  },
  "seo./about-pizza/options/topping/italian-sausage/": {
    metaDescription: function(d) { return "Spicy, rich Italian sausage is one of America's favorite pizza toppings. Order online your Domino's pizza with Italian sausage for Pickup or Delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Italian Sausage Online"; }
  },
  "seo./about-pizza/options/topping/jalapeno-peppers/": {
    metaDescription: function(d) { return "Pair jalape&ntilde;o peppers with other spicy toppings to create a feisty pizza. Or wake up a trusty favorite like pepperoni by adding jalape&ntilde;os when you order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Jalape&ntilde;o Peppers Today"; }
  },
  "seo./about-pizza/options/topping/mushrooms/": {
    metaDescription: function(d) { return "Mushrooms add mild, earthy flavor and tasty texture to pizzas of any variety, from meat to vegetarian. Try your favorite Domino's pizza with mushrooms today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Pizza with Mushrooms"; }
  },
  "seo./about-pizza/options/topping/onions/": {
    metaDescription: function(d) { return "When added to pizzas, pastas, and sandwiches, onions highlight the flavors of meats, cheeses, and other vegetables. Order your Domino's favorite with onions today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Onions Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/topping/pepperoni/": {
    metaDescription: function(d) { return "Order Domino's Pizza With Pepperoni Online for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Pepperoni Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/topping/peppers/": {
    metaDescription: function(d) { return "All types of peppers make versatile and beloved pizza toppings. Try one of Domino's pepper-ful pizzas, like the Deluxe or Honolulu Hawaiian Specialty Pizzas, or build your own."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Peppers Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/options/topping/pineapple/": {
    metaDescription: function(d) { return "Domino's makes the Hawaiian pineapple pizza even better with our Honolulu Hawaiian pizza, which features traditional ham and pineapple as well as smoked bacon."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Delivery or Pickup Pizza With Pineapple"; }
  },
  "seo./about-pizza/options/topping/pizza-toppings/": {
    metaDescription: function(d) { return "People love Domino's pizza all over the world. No matter where you are, you can enjoy the types of toppings you want."; },
    metaKeywords: function(d) { return "pizza toppings"; },
    title: function(d) { return "Domino's Pizza Canada® Toppings Around the World"; }
  },
  "seo./about-pizza/options/topping/provolone-cheese/": {
    metaDescription: function(d) { return "Try provolone cheese on our Specialty Pizzas, like the Honolulu Hawaiian, or on our Oven Baked Sandwiches. You can also build your own pizza or pasta with provolone cheese."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has the Perfect Provolone Cheese for Pizza and More"; }
  },
  "seo./about-pizza/options/topping/roasted-red-peppers/": {
    metaDescription: function(d) { return "Roasted red peppers pair well with meats, such as premium chicken, beef, and Philly steak. Add roasted red peppers to your Domino's pizza or sandwich today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® With Roasted Red Peppers Is Delicious"; }
  },
  "seo./about-pizza/options/topping/salami/": {
    metaDescription: function(d) { return "At Domino's, salami adds subtle flavor to any pizza and takes center stage in our Italian sandwich. Order delivery and track your order via the Domino's Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pizza Canada® With Salami"; }
  },
  "seo./about-pizza/options/topping/spinach/": {
    metaDescription: function(d) { return "Spinach adds texture and distinctive flavor to a variety of Domino's pizzas, as well as our Stuffed Cheesy Bread. Try the popular Spinach &amp; Feta pizza today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Carryout or Delivery Domino's Pizza Canada® With Spinach"; }
  },
  "seo./about-pizza/options/topping/veggie/": {
    metaDescription: function(d) { return "Need more veggies in your life? Go the all-veggie route with Domino's Pacific Veggie pizza or enjoy the fresh flavor added to our pizzas and sandwiches."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Veggies for Pickup or Delivery"; }
  },
  "seo./about-pizza/order-food-online/": {
    metaDescription: function(d) { return "At Domino's, we pride ourselves on making it easy to order food online that you love. Just connect to the internet or open up our app, and you're on your way to ordering food online."; },
    metaKeywords: function(d) { return "order food online"; },
    title: function(d) { return "Learn About How To Order Food Online"; }
  },
  "seo./about-pizza/other-foods/competitor/cinnamon-bread-twists/": {
    metaDescription: function(d) { return "Domino's Cinnamon Bread Twists are sweet, irresistible treats. Order them online for dessert or for parties."; },
    metaKeywords: function(d) { return "cinnamon bread twists "; },
    title: function(d) { return "Satisfy Your Sweet Tooth With Domino's Cinnamon Bread Twists"; }
  },
  "seo./about-pizza/other-foods/dominos/bites/": {
    metaDescription: function(d) { return "Domino's is a restaurant that offers sweet and savory bites for all events, parties, and occasions, delivered at your convenience. Plan ahead by ordering online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Think Domino's Pizza Canada® for Party Bites"; }
  },
  "seo./about-pizza/other-foods/dominos/bread-twists/": {
    metaDescription: function(d) { return "Domino’s Bread Twists, available in Garlic, Parmesan, and Cinnamon, are handmade to perfection using our buttery-tasting dough."; },
    metaKeywords: function(d) { return "breadsticks"; },
    title: function(d) { return "Add Domino's Bread Twists to Your Next Order"; }
  },
  "seo./about-pizza/other-foods/dominos/bread/": {
    metaDescription: function(d) { return "Domino's has several bread options on the menu, including our new Bread Twists in Garlic, Parmesan, and Cinnamon."; },
    metaKeywords: function(d) { return "bread"; },
    title: function(d) { return "Find Savory and Sweet Bread at Domino's"; }
  },
  "seo./about-pizza/other-foods/dominos/cheese-steak/": {
    metaDescription: function(d) { return "Enjoy Philly cheese steak two ways at Domino's: on a sandwich or on a pizza with cheese and saut&eacute;ed onions. Ordering this flavor classic online is a breeze."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza Canada® With Cheese Steak Today"; }
  },
  "seo./about-pizza/other-foods/dominos/chicken-alfredo/": {
    metaDescription: function(d) { return "Available as a stand-alone dish or served in one of Domino's bread bowls, creamy Chicken Alfredo is the perfect pasta for a date night or a hearty lunch option."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Chicken Alfredo Pasta at Domino's"; }
  },
  "seo./about-pizza/other-foods/dominos/chicken-carbonara/": {
    metaDescription: function(d) { return "Order Chicken Carbonara From Domino's Online for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Chicken Carbonara From Domino's Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/other-foods/dominos/chicken-parm/": {
    metaDescription: function(d) { return "Order Chicken Parmesan From Domino's for Pickup or Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Chicken Parmesan From Domino's for Pickup or Delivery Today"; }
  },
  "seo./about-pizza/other-foods/dominos/chocolate-lava-cake/": {
    metaDescription: function(d) { return "Domino's Chocolate Lava Crunch Cake explodes with warm chocolate goodness. When you're ordering pizza, don't forget to add a little indulgence for dessert."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Chocolate Lava Crunch Cake"; }
  },
  "seo./about-pizza/other-foods/dominos/desserts/": {
    metaDescription: function(d) { return "Domino's desserts, including Cinnamon Bread Twists, are sweet endings to a delicious meal."; },
    metaKeywords: function(d) { return "desserts"; },
    title: function(d) { return "Get Chocolate, Brownie, and Cinnamon Desserts at Domino’s"; }
  },
  "seo./about-pizza/other-foods/dominos/italian-sandwich/": {
    metaDescription: function(d) { return "The toasted Italian sandwich, along with all your favorite Specialty Pizzas, are as close as your nearest Domino's. Order online and get classic flavor delivered."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Italian Sandwich Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/other-foods/dominos/pasta/": {
    metaDescription: function(d) { return "Chicken Parmesan, Chicken Alfredo, and Chicken Carbonara & vegetarian-friendly Pasta Primavera- order at a Domino's restaurant near you."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pasta"; }
  },
  "seo./about-pizza/other-foods/dominos/primavera/": {
    metaDescription: function(d) { return "Ordering Pasta Primavera from Domino's means you get garden-ripe deliciousness without the hassle. A few clicks, and this creamy, dreamy pasta is on its way."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pasta Primavera Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/party-food-delivery/": {
  },
  "seo./about-pizza/pasta-delivery-near-me/": {
    metaDescription: function(d) { return "For pasta delivery near me, there&" + "#" + "x2019;s Domino&" + "#" + "x2019;s. We have all the classics, plus a build your own pasta option."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pasta Delivery Near Me"; }
  },
  "seo./about-pizza/pasta-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re noodling over what to eat and pasta comes to mind, you might search for pasta near me. Domino&" + "#" + "x2019;s has pasta classics for delivery or carryout."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pasta Near Me"; }
  },
  "seo./about-pizza/pasta-restaurants-near-me/": {
    metaDescription: function(d) { return "When you are looking for pasta restaurants near me, think Domino&" + "#" + "x2019;s. With tasty pasta dishes, including a build-your-own option, Domino&" + "#" + "x2019;s delivers."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pasta Restaurants Near Me"; }
  },
  "seo./about-pizza/pasta/chicken-alfredo/": {
    metaDescription: function(d) { return "Available as a stand&mdash;alone dish or served in one of Domino&" + "#" + "x2019;s bread bowls, creamy Chicken Alfredo is the perfect pasta for a date night or a hearty lunch option."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Chicken Alfredo Pasta at Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/pasta/chicken-carbonara/": {
    metaDescription: function(d) { return "Order Chicken Carbonara From Domino's Online for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Chicken Carbonara From Domino's Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/pasta/primavera/": {
    metaDescription: function(d) { return "Ordering Pasta Primavera from Domino's means you get garden-ripe deliciousness without the hassle. A few clicks, and this creamy, dreamy pasta is on its way."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pasta Primavera Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/pedidos-en-linea/": function(d) { return ""; },
  "seo./about-pizza/pepperoni-pizza/": {
  },
  "seo./about-pizza/petit-chef/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/philly-cheese-steak/": {
    metaDescription: function(d) { return "Order Domino's oven-baked Philly Cheese Steak sandwiches. Order online for carryout or delivery and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Oven Baked Philly Cheese Steak Sandwiches at Domino's"; }
  },
  "seo./about-pizza/pie-pass/": {
    metaDescription: function(d) { return "When Domino’s carryout customers place digital orders and choose VIP Check-In, they know their pizza, pasta, and more will be ready when they arrive. It’s called Pie Pass, and it’s awesome."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino’s Pizza VIP Check-In Gives Carryout Customers a Pie Pass"; }
  },
  "seo./about-pizza/pizza-adomicilio/": function(d) { return ""; },
  "seo./about-pizza/pizza-around-me/": {
    metaDescription: function(d) { return "When you're wondering, &ldquo;Is there a Domino's Pizza around me?&rdquo; the answer is probably &ldquo;yes.&rdquo; With thousands of locations, Domino's is in or near your neighborhood."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Is There a Domino's Pizza Canada® Around Me | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/pizza-crust/": {
    metaDescription: function(d) { return "Browse the menu & order online from Domino's for carryout or delivery. Build your own pizza with a variety of crust options to choose from. Try Hand Tossed, Handmade Pan, Crunchy Thin, Brooklyn Style, or Gluten Free Crust today! Order online for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Domino's Pizza Canada® - Pan & Hand Tossed, Thin, Brooklyn & Gluten Free"; }
  },
  "seo./about-pizza/pizza-crust/cheesy-crust/": function(d) { return ""; },
  "seo./about-pizza/pizza-crust/pan-pizza/": function(d) { return ""; },
  "seo./about-pizza/pizza-deals-and-specials/": {
    metaDescription: function(d) { return "Sign up to receive deals by email or text. Order online for carryout or delivery and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pizza Deals &amp; Specials; Coupons for Pasta, Sandwiches &amp; Wings - Domino's"; }
  },
  "seo./about-pizza/pizza-deals-near-me/": {
    metaDescription: function(d) { return "Everybody likes a bargain. When you&" + "#" + "x2019;re looking for pizza deals near me, your neighborhood Domino&" + "#" + "x2019;s has money-saving coupons for quality pizza, pasta, and more."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pizza Deals Near Me"; }
  },
  "seo./about-pizza/pizza-delivery/": {
    metaDescription: function(d) { return "Discover why Domino's is the world leader in pizza delivery. Order online and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Choose the World Leader in Pizza Delivery for your Pizza - Domino's"; }
  },
  "seo./about-pizza/pizza-dough/": {
    metaDescription: function(d) { return "All of Domino's pizza dough recipes start with the same thing: really good ingredients. As soon as you place your order online for delivery or carryout, that pizza dough is on its way to becoming pizza perfection."; },
    metaKeywords: function(d) { return "pizza dough"; },
    title: function(d) { return "Discover the Pizza Dough in Domino's Pizza Canada®"; }
  },
  "seo./about-pizza/pizza-entrega/": function(d) { return ""; },
  "seo./about-pizza/pizza-for-dinner/": {
    metaDescription: function(d) { return "When you need dinner ideas, Domino's pizza, pasta, wings, sandwiches & more are a great choice. Order online for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Dinner Ideas for Pizza, Pasta, Wings, Sandwiches & Chicken"; }
  },
  "seo./about-pizza/pizza-lieferservice/": function(d) { return ""; },
  "seo./about-pizza/pizza-lieferung/": function(d) { return ""; },
  "seo./about-pizza/pizza-locations/": {
    metaDescription: function(d) { return "Looking for the most convenient Domino's pizza locations? Just put in your location on our website, and we'll give you a list of pizzerias nearby ready for your order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Offers Convenient Pizza Locations | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/pizza-menu/": {
    metaDescription: function(d) { return "Order a Domino's Specialty Pizza online for carryout or delivery. Try the Philly Cheese Steak, Pacific Veggie or Buffalo Chicken today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order from the Domino's Pizza Canada® Menu or Customize Your Own Pizza"; }
  },
  "seo./about-pizza/pizza-near-me-open/": {
    metaDescription: function(d) { return "You can get hungry for pizza anytime day or night &mdash; even odd hours. When your search for pizza near me open leads to Domino&" + "#" + "x2019;s, you&" + "#" + "x2019;re in luck."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pizza Near Me Open"; }
  },
  "seo./about-pizza/pizza-near-me/": {
    metaDescription: function(d) { return "If you're looking for 'pizza near me', think Domino's. With more than 12,600 pizzerias, there may be a nearby pizza store. Order online for carryout or delivery and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Your Answer to Where's Pizza Near Me? Domino's Pizza Canada®."; }
  },
  "seo./about-pizza/pizza-offer/": function(d) { return ""; },
  "seo./about-pizza/pizza-online/": function(d) { return ""; },
  "seo./about-pizza/pizza-open-now/": {
    metaDescription: function(d) { return "Whenever you're wondering if there's pizza near you open now, chances are, the pizza experts at Domino's are awaiting your order. Use the Domino's location finder to determine the closest pizza place open now."; },
    metaKeywords: function(d) { return "pizza near me open now, pizza open now, pizza delivery open now"; },
    title: function(d) { return "How To Find Pizza Open Now"; }
  },
  "seo./about-pizza/pizza-party/": {
    metaDescription: function(d) { return "Plan a pizza party with Domino's and sign up online for special offers by text or email. Order online and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Plan a Pizza Party with Domino's and Receive Pizza Party Deals"; }
  },
  "seo./about-pizza/pizza-place-near-me/": {
    metaDescription: function(d) { return "With thousands of locations in the United States and around the world, Domino&" + "#" + "x2019;s has pizza places near me. In fact, there is probably more than one Domino&" + "#" + "x2019;s pizza place close by."; },
    metaKeywords: function(d) { return "pizza place, pizza place near me"; },
    title: function(d) { return "Locate a Pizza Place Near Me"; }
  },
  "seo./about-pizza/pizza-places/": {
    metaDescription: function(d) { return "Discover nearby pizza places for carryout or delivery options. Order and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Find a nearby Pizza Place - Order Dominos for Takeout or Delivery"; }
  },
  "seo./about-pizza/pizza-promo/": {
    metaDescription: function(d) { return "Sign up for free coupons by email or text and never miss another deal from Domino's."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get Pizza Promos Savings & Deals at Domino's with a Mobile Device"; }
  },
  "seo./about-pizza/pizza-promociones/": function(d) { return ""; },
  "seo./about-pizza/pizza-restaurant/": {
    metaDescription: function(d) { return "From humble beginnings as a single pizza restaurant in 1960, Domino's has become today's recognized world leader in pizza delivery. Learn more about Domino's history in the pizza industry."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Learn about Domino's Pizza Canada® Restaurant History in the Pizza Industry"; }
  },
  "seo./about-pizza/pizza-restaurants-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re searching for pizza restaurants near me, you&" + "#" + "x2019;re likely to find a Domino&" + "#" + "x2019;s. Order pizza, pasta, sandwiches, salads, and more for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Pizza Restaurants Near Me"; }
  },
  "seo./about-pizza/pizza-sizes/": {
    metaDescription: function(d) { return "At Domino's, pizza sizes vary by our five different types of crust. We offer all the traditional pizza sizes — small, medium, and large, plus one extra large option."; },
    metaKeywords: function(d) { return "pizza sizes, standard pizza sizes, Domino's Pizza Canada® sizes"; },
    title: function(d) { return "Discover the Different Pizza Sizes at Domino's"; }
  },
  "seo./about-pizza/pizza-wedding/": {
    metaDescription: function(d) { return "When you're planning to tie the knot with the one you love, why not invite your other great love — pizza — to the party? We can think of several reasons pizza weddings are becoming more popular."; },
    metaKeywords: function(d) { return "pizza wedding, wedding pizza"; },
    title: function(d) { return "How Domino's Can Help Plan a Pizza Weddings"; }
  },
  "seo./about-pizza/pizzaboden/": function(d) { return ""; },
  "seo./about-pizza/pizzaboden/cheesy-crust/": function(d) { return ""; },
  "seo./about-pizza/pizzaboden/pan-pizza/": function(d) { return ""; },
  "seo./about-pizza/pizzakurier/": function(d) { return ""; },
  "seo./about-pizza/pizzeria/": {
    metaDescription: function(d) { return "Browse coupons & order Domino's online for carryout or delivery. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Discover The American Pizzeria"; }
  },
  "seo./about-pizza/places-that-deliver-near-me/": {
    metaDescription: function(d) { return "You know you want something good to eat, and you know you don&" + "#" + "x2019;t want to go get it. A quick search for places that deliver near me delivers Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Places That Deliver Near Me"; }
  },
  "seo./about-pizza/places-that-deliver/": {
    metaDescription: function(d) { return "When you think about pizza places that deliver, think about this: Domino&" + "#" + "x2019;s delivers more than 1 million pizzas a day worldwide. We are the recognized world leader in pizza delivery!"; },
    metaKeywords: function(d) { return "places that deliver, places to deliver to me"; },
    title: function(d) { return "Discover Places That Deliver Pizza"; }
  },
  "seo./about-pizza/places-to-eat-nearby/": {
    metaDescription: function(d) { return "Find places to eat nearby easily with Domino&" + "#" + "x2019;s online location finder. Simply type in your address, and Domino&" + "#" + "x2019;s will locate your nearest place to eat."; },
    metaKeywords: function(d) { return "places to eat nearby, places to eat near me"; },
    title: function(d) { return "Discover Places to Eat Nearby"; }
  },
  "seo./about-pizza/places-to-get-a-salad-near-me/": {
    metaDescription: function(d) { return "Wondering about places to get a salad near me? Wonder no more. In addition to pizza, Domino&" + "#" + "x2019;s has salad, sandwiches, pasta, and chicken for carryout and delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Places to Get a Salad Near Me"; }
  },
  "seo./about-pizza/promociones-pizza/": function(d) { return ""; },
  "seo./about-pizza/promos/": function(d) { return ""; },
  "seo./about-pizza/promozioni-pizza/": function(d) { return ""; },
  "seo./about-pizza/rabatte/": function(d) { return ""; },
  "seo./about-pizza/restaurantes/": function(d) { return ""; },
  "seo./about-pizza/restaurants-near-me-now/": {
    metaDescription: function(d) { return "When hunger strikes and you don&" + "#" + "x2019;t want to cook, you might search for restaurants near me now. With thousands of locations, Domino&" + "#" + "x2019;s is the answer."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Restaurants Near Me Now"; }
  },
  "seo./about-pizza/restaurants-near-me-open-late-night/": {
    metaDescription: function(d) { return "Your search for restaurants near me open late night will lead to Domino&" + "#" + "x2019;s. Our restaurants are open until midnight during the week and until 1 am on weekends."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Restaurants Near Me Open Late Night"; }
  },
  "seo./about-pizza/restaurants-near-me-open-now/": {
    metaDescription: function(d) { return "Whenever you are looking for restaurants near me open now, you&" + "#" + "x2019;ll likely find one of Domino&" + "#" + "x2019;s pizza places."; },
    metaKeywords: function(d) { return "restaurants near me, restaurants near me open now"; },
    title: function(d) { return "Discover Restaurants Near Me Open Now"; }
  },
  "seo./about-pizza/restaurants-near-me/": {
    metaDescription: function(d) { return "When wanting a pizza near me, look for a nearby Domino's."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "When wanting a pizza near me, look for a nearby Domino's."; }
  },
  "seo./about-pizza/restaurants-open-near-me/": {
    metaDescription: function(d) { return "When you don&" + "#" + "x2019;t want to cook, you&" + "#" + "x2019;re probably wondering, What are some restaurants open near me? For pizza, chicken, sandwiches, and more, the answer is Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Restaurants Open Near Me"; }
  },
  "seo./about-pizza/restaurants-that-deliver-near-me/": {
    metaDescription: function(d) { return "When you don&" + "#" + "x2019;t feel like cooking or even going out, take a shortcut in your search for restaurants that deliver near me and order from Domino&" + "#" + "x2019;s."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Restaurants That Deliver Near Me"; }
  },
  "seo./about-pizza/salad-delivery-near-me/": {
    metaDescription: function(d) { return "When you want salad delivery near me, Domino&" + "#" + "x2019;s is the solution. We deliver two kinds of salad for lunch or dinner: Classic Garden and Chicken Caesar."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Salad Delivery Near Me"; }
  },
  "seo./about-pizza/salad-delivery/": {
    metaDescription: function(d) { return "In addition to pizza, pasta, sandwiches, and chicken, Domino&" + "#" + "x2019;s offers salad delivery. Choose from two: Classic Garden or Chicken Caesar."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Salad Delivery"; }
  },
  "seo./about-pizza/salads-near-me/": {
    metaDescription: function(d) { return "When a craving for a crisp salad strikes, you need to know: Where can I get salads near me? Domino&" + "#" + "x2019;s has quality salads and more for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Salads Near Me"; }
  },
  "seo./about-pizza/sandwich-delivery-near-me/": {
    metaDescription: function(d) { return "Looking for sandwich delivery near me? There&" + "#" + "x2019;s probably a Domino&" + "#" + "x2019;s close by. We have seven varieties of oven-baked sandwiches, including Italian and Chicken Parm."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Sandwich Delivery Near Me"; }
  },
  "seo./about-pizza/sandwich-shops-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re searching for sandwich shops near me, you&" + "#" + "x2019;re bound to find a Domino&" + "#" + "x2019;s. Get oven-baked sandwiches and more delivered right to your door."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Sandwich Shops Near Me"; }
  },
  "seo./about-pizza/sandwiches/cheese-steak/": {
    metaDescription: function(d) { return "Enjoy Philly cheese steak two ways at Domino's: on a sandwich or on a pizza with cheese and saut&eacute;ed onions. Ordering this flavor classic online is a breeze."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Cheese Steak Today"; }
  },
  "seo./about-pizza/sandwiches/chicken-parm/": {
    metaDescription: function(d) { return "Order Chicken Parmesan From Domino's for Pickup or Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Chicken Parmesan From Domino's for Pickup or Delivery Today"; }
  },
  "seo./about-pizza/sandwiches/italian-sandwich/": {
    metaDescription: function(d) { return "The toasted Italian sandwich, along with all your favorite Specialty Pizzas, are as close as your nearest Domino's. Order online and get classic flavor delivered."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Italian Sandwich Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/sandwiches/philly-cheese-steak/": {
    metaDescription: function(d) { return "Order Domino's oven-baked Philly Cheese Steak sandwiches. Order online for carryout or delivery and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Oven Baked Philly Cheese Steak Sandwiches at Domino's"; }
  },
  "seo./about-pizza/sauces/alfredo-sauce/": {
    metaDescription: function(d) { return "Domino's offers a variety of pizzas and pastas for carryout and delivery, including Chicken Alfredo pasta. Order your favorite Alfredo sauce dish online and enjoy."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Takeout or Delivery Alfredo Sauce Dishes From Domino's"; }
  },
  "seo./about-pizza/sauces/bbq-sauce/": {
    metaDescription: function(d) { return "First, Domino's brought the taste of barbecue to pizza (think: Memphis BBQ Chicken pizza). Now, you can add BBQ sauce goodness to your order with Specialty Chicken."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Barbecue Pizza Satisfies BBQ Cravings | Order Online Today"; }
  },
  "seo./about-pizza/sauces/blue-cheese/": {
    metaDescription: function(d) { return "Domino's Blue Cheese sauce is creamy and tangy with a savory finish. Enjoy Blue Cheese sauce with chicken wings and sandwiches, and as a dipping sauce for pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Blue Cheese Sauce Is Good on Pizza, Chicken Wings and More"; }
  },
  "seo./about-pizza/sauces/garlic-parmesan-white-sauce/": {
    metaDescription: function(d) { return "Want white sauce on your pizza or pasta? Build Your Own and request it! When you crave a unique Domino's pizza, customize it with garlic parmesan white sauce."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Get Garlic Parmesan White Sauce on Your Domino's Pizza"; }
  },
  "seo./about-pizza/sauces/hot-sauce/": {
    metaDescription: function(d) { return "When your pizza or sandwich needs a bit of a punch, Domino's hot sauce is perfect for dipping &mdash; or drizzling. Give your Domino's order a kick and add hot sauce."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Pizza Online for Pickup or Delivery With Hot Sauce"; }
  },
  "seo./about-pizza/sauces/icing/": {
    metaDescription: function(d) { return "Domino's icing is a sweet, creamy dipping sauce with hints of vanilla in every bite. Try it with our signature Cinna Stix<sup>&reg;</sup> or decadent Chocolate Lava Crunch Cake."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Desserts With Icing at Domino's"; }
  },
  "seo./about-pizza/sauces/mango-habanero-sauce/": {
    metaDescription: function(d) { return "When hot habanero peppers meet sweet mangoes, you have Domino's Mango Habanero Sauce. Try it on the Sweet and Spicy Chicken Habanero sandwich or even pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Try Mango Habanero Sauce on Your Domino's Pizza"; }
  },
  "seo./about-pizza/sauces/marinara/": {
    metaDescription: function(d) { return "At Domino's, you can order marinara sauce in a dipping cup or on your pizza for a sweet taste that goes great with anything, including a veggie or traditional pepperoni pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Has Great Marinara Sauce"; }
  },
  "seo./about-pizza/sauces/pizza-sauce/": {
    metaDescription: function(d) { return "Delicious pizza starts with delicious pizza sauce. Domino's offers nine tasty sauces, from tomato to Alfredo, so you can customize every order to your taste."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has the Perfect Pizza Sauce | Order Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/sauces/ranch/": {
    metaDescription: function(d) { return "Ranch has a creamy, tangy taste with black pepper and herbs that pairs with everything from pizza to chicken wings. Try our Chicken Bacon Ranch pizza or sandwich."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Ranch Goes With Everything at Domino's | Order for Pickup or Delivery"; }
  },
  "seo./about-pizza/sauces/tomato-sauce/": {
    metaDescription: function(d) { return "Domino's Tomato Sauce Is Delicious | Order for Pickup or Delivery"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Tomato Sauce Is Delicious | Order for Pickup or Delivery"; }
  },
  "seo./about-pizza/sitemap/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/sizes/large/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s pizza comes in a variety of sizes, including small, medium, large, and extra large. Order several large pizzas online now and feed the whole crew."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Large Pizza Online for Pickup or Delivery From Domino&" + "#" + "x2019;s"; }
  },
  "seo./about-pizza/sizes/medium/": {
    metaDescription: function(d) { return "A medium pizza (or two) from Domino's is great for any occasion, from date night to lunch with a friend. Choose your crust, pick your toppings, and order online now."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Medium Pizzas Online for Pickup or Delivery at Domino's"; }
  },
  "seo./about-pizza/sizes/small/": {
    metaDescription: function(d) { return "Domino's is America's favorite pizzeria for small pizzas, pastas, and more. Order online now, track your order with Domino's Tracker, and get ready to eat."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Ordering Small Pizzas Is a Big Deal at Domino's. Order Pizza Online"; }
  },
  "seo./about-pizza/sizes/x-large/": {
    metaDescription: function(d) { return "Satisfy X-large appetites with an X-large pizza (or two) from Domino's. Feed your cravings by ordering pizza, pasta, sandwiches, desserts, and more online now."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order X-Large Pizzas Online for Pickup or Delivery - Domino's Pizza"; }
  },
  "seo./about-pizza/specialty-pizzas/": {
    metaDescription: function(d) { return "Order a specialty pizza for carryout or delivery from Domino&" + "#" + "x2019;s. Choose from our famous pizzas and their mouthwatering toppings for the best specialty pizza near you."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Specialty Pizzas"; }
  },
  "seo./about-pizza/take-away/": {
    metaDescription: function(d) { return ""; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return ""; }
  },
  "seo./about-pizza/take-out-near-me/": {
    metaDescription: function(d) { return "Domino&" + "#" + "x2019;s offers endless options for take-out near me. Check out our extensive menu of pizzas, pasta, salads, wings, and more, then click order online and select the carryout option."; },
    metaKeywords: function(d) { return "take out near me"; },
    title: function(d) { return "How to Get Take Out Near Me"; }
  },
  "seo./about-pizza/take-out-restaurants-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for take out restaurants near me, look no further than Domino&" + "#" + "x2019;s. Thousands of locations offer pizza, pasta, chicken wings, salads, and more for take out."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Take Out Restaurants Near Me"; }
  },
  "seo./about-pizza/terms-of-use/": function(d) { return ""; },
  "seo./about-pizza/thin-crust-pizza-near-me/": {
    metaDescription: function(d) { return "Searching for thin crust pizza near me? You&" + "#" + "x2019;ll find it at Domino&" + "#" + "x2019;s. We have specialty pizzas and build-your-own options for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Thin Crust Pizza Near Me"; }
  },
  "seo./about-pizza/toppings/bacon/": {
    metaDescription: function(d) { return "Everything, even pizza, is better with bacon. Try one of Domino's bacon pizzas, like the Cali Chicken Bacon Ranch, or build your own for dinner delivery tonight."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Carryout or Delivery Domino's Pizza With Bacon"; }
  },
  "seo./about-pizza/toppings/banana-peppers/": {
    metaDescription: function(d) { return "Banana peppers add a surprisingly sweet, tangy flavor to pizzas and sandwiches. Experiment by adding banana peppers to your usual Domino's order or build your own pizza or pasta."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza With Banana Peppers Is Delicious | Order Online"; }
  },
  "seo./about-pizza/toppings/bbq-chicken/": {
    metaDescription: function(d) { return "There's a reason BBQ chicken is a summer picnic staple: It's hugely popular. Order Domino's Memphis BBQ Chicken pizza for your next party and watch the crowd go wild."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With BBQ Chicken for Pickup or Delivery"; }
  },
  "seo./about-pizza/toppings/beef/": {
    metaDescription: function(d) { return "Our seasoned beef is a flavorful addition to any Domino's pizza, from the Spinach & Feta to the Bacon Cheeseburger Feast. Order online for pickup or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Pickup or Delivery Domino's Pizza With Beef"; }
  },
  "seo./about-pizza/toppings/black-olives/": {
    metaDescription: function(d) { return "Order Domino's Pizza With Black Olives for Pickup or Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Earthy black olives complement meats and veggies perfectly on pizza, making black olives a popular addition to pizzas like Domino's MeatZZa Feast or Spinach & Feta"; }
  },
  "seo./about-pizza/toppings/buffalo-chicken/": {
    metaDescription: function(d) { return "For those who love the spicy sweetness of buffalo sauce without the messiness of wings, the Domino's Buffalo Chicken pizza gets you the best of both worlds."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Buffalo Chicken Pizza From Domino's"; }
  },
  "seo./about-pizza/toppings/cheddar-cheese/": {
    metaDescription: function(d) { return "At Domino's, we know you can't get enough melty cheddar cheese. Order Domino's Stuffed Cheesy Bread, cheesy chicken bites, or one of our Specialty Pizzas today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Pizza Online for Pickup or Delivery with Cheddar Cheese"; }
  },
  "seo./about-pizza/toppings/cheese/": {
    metaDescription: function(d) { return "Cheese is an essential ingredient in Domino's recipes. Professionals test cheddar, mozzarella, feta, Parmesan, and provolone cheeses for ideal flavor and freshness."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "What's Behind Domino's Cheese for Pizza, Sandwiches, and More?"; }
  },
  "seo./about-pizza/toppings/chicken/": {
    metaDescription: function(d) { return "Domino's uses whole breast white meat chicken, which we feature in pizzas like Buffalo Chicken and Memphis BBQ. Add an order of Specialty Chicken for more goodness."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order for Pickup or Delivery Domino's Pizza With Chicken"; }
  },
  "seo./about-pizza/toppings/diced-tomatoes/": {
    metaDescription: function(d) { return "Diced tomatoes are perfect for Italian dishes, especially pizza. Add a little or a lot for a burst of freshness to your favorite Domino's pizza."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Diced Tomatoes Today"; }
  },
  "seo./about-pizza/toppings/feta-cheese/": {
    metaDescription: function(d) { return "Feta cheese from Domino's is a delicious addition to our Specialty Pizzas, Stuffed Cheesy Bread, and pastas. Track your Spinach &amp; Feta pizza with Online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Feta Cheese Pizza"; }
  },
  "seo./about-pizza/toppings/garlic/": {
    metaDescription: function(d) { return "Domino's Pizza With the Great Taste of Garlic | Order Delivery Today"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza With the Great Taste of Garlic | Order Delivery Today"; }
  },
  "seo./about-pizza/toppings/green-peppers/": {
    metaDescription: function(d) { return "Green peppers are delicious on pizza and sandwiches. Order the Philly Cheese Steak or Deluxe pizzas or build your own pie with extra green pepper crunch."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Green Peppers Online"; }
  },
  "seo./about-pizza/toppings/habanero/": {
    metaDescription: function(d) { return "Our Sweet Mango Habanero sauce is surprisingly versatile, adding a tangy kick to sandwiches, chicken, wings, and even pizza, especially the Honolulu Hawaiian."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has a Habanero Sauce That Goes on Pizza and More"; }
  },
  "seo./about-pizza/toppings/ham/": {
    metaDescription: function(d) { return "Ham on pizza pairs well with other meats, spicy sauces, and fruit. Order online and prepare to go on a Hawaiian adventure when your pineapple and ham pizza arrives."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pizza With Ham"; }
  },
  "seo./about-pizza/toppings/italian-sausage/": {
    metaDescription: function(d) { return "Spicy, rich Italian sausage is one of America's favorite pizza toppings. Order online your Domino's pizza with Italian sausage for Pickup or Delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Italian Sausage Online"; }
  },
  "seo./about-pizza/toppings/jalapeno-peppers/": {
    metaDescription: function(d) { return "Pair jalape&ntilde;o peppers with other spicy toppings to create a feisty pizza. Or wake up a trusty favorite like pepperoni by adding jalape&ntilde;os when you order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Jalape&ntilde;o Peppers Today"; }
  },
  "seo./about-pizza/toppings/mushrooms/": {
    metaDescription: function(d) { return "Mushrooms add mild, earthy flavor and tasty texture to pizzas of any variety, from meat to vegetarian. Try your favorite Domino's pizza with mushrooms today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Pizza with Mushrooms"; }
  },
  "seo./about-pizza/toppings/onions/": {
    metaDescription: function(d) { return "When added to pizzas, pastas, and sandwiches, onions highlight the flavors of meats, cheeses, and other vegetables. Order your Domino's favorite with onions today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Onions Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/toppings/pepperoni/": {
    metaDescription: function(d) { return "Pepperoni pairs well with meats, veggies, and all kinds of cheese. No matter how you like your pepperoni pizza, Domino’s delivers it hot and fresh to your door."; },
    metaKeywords: function(d) { return "pepperoni, pizza delivery"; },
    title: function(d) { return "Order Domino’s Pepperoni Pizza Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/toppings/peppers/": {
    metaDescription: function(d) { return "All types of peppers make versatile and beloved pizza toppings. Try one of Domino's pepper-ful pizzas, like the Deluxe or Honolulu Hawaiian Specialty Pizzas, or build your own."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Domino's Pizza With Peppers Online for Pickup or Delivery"; }
  },
  "seo./about-pizza/toppings/pineapple/": {
    metaDescription: function(d) { return "Domino's makes the Hawaiian pineapple pizza even better with our Honolulu Hawaiian pizza, which features traditional ham and pineapple as well as smoked bacon."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Delivery or Pickup Pizza With Pineapple"; }
  },
  "seo./about-pizza/toppings/pizza-toppings/": {
    metaDescription: function(d) { return "Pepperoni might be the most popular of all pizza toppings, but Domino&" + "#" + "x2019;s has you covered no matter what. Perfect your pizza order with nine meat toppings and 18 non&mdash;meat options."; },
    metaKeywords: function(d) { return "pizza toppings, veggie pizza, veggies"; },
    title: function(d) { return "Domino&" + "#" + "x2019;s Has Popular Pizza Toppings for All Kinds of Pizza Lovers"; }
  },
  "seo./about-pizza/toppings/provolone-cheese/": {
    metaDescription: function(d) { return "Try provolone cheese on our Specialty Pizzas, like the Honolulu Hawaiian, or on our Oven Baked Sandwiches. You can also build your own pizza or pasta with provolone cheese."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Has the Perfect Provolone Cheese for Pizza and More"; }
  },
  "seo./about-pizza/toppings/roasted-red-peppers/": {
    metaDescription: function(d) { return "Roasted red peppers pair well with meats, such as premium chicken, beef, and Philly steak. Add roasted red peppers to your Domino's pizza or sandwich today!"; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza With Roasted Red Peppers Is Delicious"; }
  },
  "seo./about-pizza/toppings/salami/": {
    metaDescription: function(d) { return "At Domino's, salami adds subtle flavor to any pizza and takes center stage in our Italian sandwich. Order delivery and track your order via the Domino's Tracker."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Order Online for Pickup or Delivery Domino's Pizza With Salami"; }
  },
  "seo./about-pizza/toppings/spinach/": {
    metaDescription: function(d) { return "Spinach adds texture and flavor to a variety of Domino’s pizzas, as well as our Stuffed Cheesy Bread. Try the popular Spinach & Feta pizza today."; },
    metaKeywords: function(d) { return "spinach, pizza spinach"; },
    title: function(d) { return "Domino’s Pizza With Spinach"; }
  },
  "seo./about-pizza/toppings/veggie/": {
    metaDescription: function(d) { return "Need more veggies in your life? Go the all-veggie route with Domino’s Pacific Veggie pizza. Or enjoy fresh veggie flavor added to our Specialty Pizzas and sandwiches."; },
    metaKeywords: function(d) { return "veggies, pizza delivery"; },
    title: function(d) { return "Order Domino’s Pizza With Veggies for Pickup or Delivery"; }
  },
  "seo./about-pizza/vegetarian-pizza/": {
    metaDescription: function(d) { return "If a vegetarian pizza is what you crave, then order from Domino&" + "#" + "x2019;s. We have several types of vegetarian pizza for carryout or delivery."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Vegetarian Pizza"; }
  },
  "seo./about-pizza/vegetarian/": {
    metaDescription: function(d) { return "Domino's offers veggie pizza options. Try the Pacific Veggie specialty pizza or build your own vegetarian pizza with the Domino's Pizza Builder. Order online for carryout or delivery and track your order with Domino's Tracker®."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Find Veggie Pizzas with Domino's Vegetarian Pizza Assortment"; }
  },
  "seo./about-pizza/what-time-does-dominos-close/": {
    metaDescription: function(d) { return "When it&" + "#" + "x2019;s late at night and you want pizza, you need to know what time Domino&" + "#" + "x2019;s closes. Domino&" + "#" + "x2019;s delivers oven-baked goodness all day and into the night."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "What Time Does Domino&" + "#" + "x2019;s Close?"; }
  },
  "seo./about-pizza/wing-delivery/": {
    metaDescription: function(d) { return "When your clan clucks for wings delivery, let Domino&" + "#" + "x2019;s answer the call. We offer chicken wings &mdash; plus pizza, pasta, and sandwiches &mdash; for delivery or carryout."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Wings Delivery"; }
  },
  "seo./about-pizza/wings-near-me/": {
    metaDescription: function(d) { return "When you&" + "#" + "x2019;re looking for delicious wings near me, look no further than your local Domino&" + "#" + "x2019;s. Wings are available in 8-piece, 14-piece, or 40-piece orders."; },
    metaKeywords: function(d) { return "wings near me"; },
    title: function(d) { return "Who has the Best Wings Near Me"; }
  },
  "seo./acerca-de-pizza/": {
  },
  "seo./acerca-de-pizza/acerca-menu/": {
  },
  "seo./acerca-de-pizza/cupones/": {
  },
  "seo./acerca-de-pizza/delivery-comida/": {
  },
  "seo./acerca-de-pizza/delivery/": {
  },
  "seo./acerca-de-pizza/dominos-cupones/": {
  },
  "seo./acerca-de-pizza/dominos-delivery/": {
  },
  "seo./acerca-de-pizza/dominos-en-linea/": {
  },
  "seo./acerca-de-pizza/dominos-menu/": {
  },
  "seo./acerca-de-pizza/dominos-promociones/": {
  },
  "seo./acerca-de-pizza/en-linea-entrega/": {
  },
  "seo./acerca-de-pizza/en-linea-pizza/": {
  },
  "seo./acerca-de-pizza/entrega-comida/": {
  },
  "seo./acerca-de-pizza/menu/": {
  },
  "seo./acerca-de-pizza/pide-online/": {
  },
  "seo./acerca-de-pizza/pizza-delivery/": {
  },
  "seo./acerca-de-pizza/pizza-entrega/": {
  },
  "seo./acerca-de-pizza/pizza-menu/": {
  },
  "seo./acerca-de-pizza/pizza-promociones/": {
  },
  "seo./pages/#!/content/cookies/": {
  },
  "seo./pages/#/content/cookies/": {
  },
  "seo./pages/carryout-insurance/": {
    metaDescription: function(d) { return "Learn more about the Domino's Carryout Insurance program, now available for a limited time at participating Domino's locations."; },
    metaKeywords: function(d) { return "dominos pizza menu, delivery food, delivery food prices, pizza deals, pizza deals online"; },
    title: function(d) { return "Domino's Carryout Insurance | Domino's"; }
  },
  "seo./pages/content/customer-service/faq": {
    metaDescription: function(d) { return "Contact Domino's Pizza Customer Service via phone or email. We care about our customers - View our FAQs and let us know how we can help make your experience better."; },
    metaKeywords: function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
    title: function(d) { return "Domino's Pizza Canada® Customer Service - Contact Us - Dominos.ca"; }
  },
  "seo./pages/content/customer-service/glutenfreecrust": {
    metaDescription: function(d) { return "Domino's gluten free crust information features the gluten free pizza at Domino's that contains wheat, rye, barley content at less than 20ppm. Order gluten free today."; },
    metaKeywords: function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
    title: function(d) { return "Domino's Gluten Free Crust Information - Gluten Free Pizza at Domino's"; }
  },
  "seo./pages/content/nutritional/allergen-info": {
    metaDescription: function(d) { return "View Domino's nutritional allergen information chart with allergen information for all food items on the menu. Contact us for any questions or concerns."; },
    metaKeywords: function(d) { return "dominos calories, dominos nutritional info"; },
    title: function(d) { return "Nutritional Allergen Information Chart Guide - Domino's Pizza Canada®"; }
  },
  "seo./pages/content/nutritional/cal-o-meter": {
    metaDescription: function(d) { return "Calculate the calories with the Domino's Cal-O-Meter before you order pizza, sandwiches, pasta, drinks, sides, desserts, and condiments. Build your pizza now!"; },
    metaKeywords: function(d) { return "dominos calories, dominos nutritional info"; },
    title: function(d) { return "Nutritional Cal-O-Meter for Building a Pizza Online with Domino's"; }
  },
  "seo./pages/content/nutritional/ingredients": {
    metaDescription: function(d) { return "Domino's nutritional ingredients information for pizza, sides, sandwiches, pasta, crusts, topping, breads, desserts, salads, dressings, sauce, and dipping cups!"; },
    metaKeywords: function(d) { return "ingredients, ingredients information, dominos ingredients, dominos ingredients information"; },
    title: function(d) { return "Domino's nutritional ingredients information for pizza, sides, sandwiches, pasta, crusts, topping, breads, desserts, salads, dressings, sauce, and dipping cups!"; }
  },
  "seo./pages/content/nutritional/lighter-options": {
    metaDescription: function(d) { return "Domino's Nutritional Lighter Options include veggie, veggie and chicken, chicken and green pepper, onion, chicken and ham, ham and pineapple. Order online now!"; },
    metaKeywords: function(d) { return "dominos calories, dominos nutritional info"; },
    title: function(d) { return "5 Nutritional Lighter Options before Ordering Pizza at Domino's"; }
  },
  "seo./pages/content/nutritional/nutrition": {
    metaDescription: function(d) { return "Domino's nutritional information on the Cal-O-Meter includes Lighter Options, Gluten Free Crust, Ingredients, Allergen Info & FAQs. Download the nutrition details PDF."; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Nutritional Information on Your Favorite Foods on the Menu at Domino's"; }
  },
  "seo./pages/content/opt-in/opt-in": {
    metaDescription: function(d) { return "Receive promotions, coupons & new store information from Domino's Pizza Canada. Sign up to receive our newsletter so you can stay up-to-date on all news."; },
    metaKeywords: function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
    title: function(d) { return "Sign Up for Domino's Pizza Canada® Newsletter - Dominos.ca"; }
  },
  "seo./pages/content/opt-out/opt-out": {
    metaDescription: function(d) { return "Domino's Pizza lets you browse coupons and order online - try the all new hand tossed crust, robust sauce and shredded mozzarella cheese."; },
    metaKeywords: function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
    title: function(d) { return "Email Opt Out - Domino's Pizza Canada®, Order Pizza Online for Delivery - Dominos.com"; }
  },
  "seo./pages/customer/": {
    metaDescription: function(d) { return "A Domino's Pizza Profile lets you save personal and payment information for faster checkout, access previous orders and join Domino's Piece of the Pie Rewards to get rewards points toward free pizza."; },
    title: function(d) { return "Domino's Pizza Profile - Sign Up or Sign In Today"; }
  },
  "seo./pages/customer/#!/ccpa/": {
    title: function(d) { return "Domino's | Consumer Rights"; }
  },
  "seo./pages/customer/#!/customer/claim-rewards/": {
  },
  "seo./pages/customer/#!/customer/login/": {
    metaDescription: function(d) { return "Sign in to your Domino's pizza profile or continue your order as a guest to place your order for carryout or delivery, track your order, or find a location nearest to you."; },
    title: function(d) { return "Login to your Domino's Pizza Profile"; }
  },
  "seo./pages/customer/#!/customer/profile/": {
    metaDescription: function(d) { return "Create a Domino's pizza profile, then submit your account information, update payment info, & receive or redeem rewards. Order your pizza online today!"; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Pizza Profile Edit Details - Create a Domino's Pizza Canada® Profile for your Account, Payments, & Rewards"; }
  },
  "seo./pages/customer/#!/customer/profile/new": {
    metaDescription: function(d) { return "Create a pizza profile with Domino's Pizza for order tracking & pizza rewards. Easily place an order and start collecting points towards your next free pizza!"; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Create a Pizza Profile at Domino's Canada - Dominos.ca"; }
  },
  "seo./pages/customer/#!/customer/rewards/": {
    metaDescription: function(d) { return "Create a Domino's pizza profile, then submit your account information, update payment info, & receive or redeem rewards. Order your pizza online today!"; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Pizza Profile Edit Details - Create a Domino's Pizza Canada® Profile for your Account, Payments, & Rewards"; }
  },
  "seo./pages/customer/#!/customer/settings/": {
    metaDescription: function(d) { return "Create a Domino's pizza profile, then submit your account information, update payment info, & receive or redeem rewards. Order your pizza online today!"; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Pizza Profile Edit Details - Create a Domino's Pizza Canada® Profile for your Account, Payments, & Rewards"; }
  },
  "seo./pages/giftcard/": {
    metaDescription: function(d) { return "Order gift cards & eGift cards from Domino's in electronic or plastic. Submit corporate order or check your remaining balance. Order online today!"; },
    metaKeywords: function(d) { return "dominos pizza menu, delivery food, delivery food prices, pizza deals, pizza deals online"; },
    title: function(d) { return "Order Gift Cards & eGift Cards from Dominos for Pizza, Pasta, & Wings"; }
  },
  "seo./pages/international/": {
  },
  "seo./pages/order/#!/checkout/": {
    metaDescription: function(d) { return "Review cart and continue to checkout."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Cart | Domino's Pizza"; }
  },
  "seo./pages/order/#!/locations/": {
    metaDescription: function(d) { return "Order delivery or carry-out from your local Domino's Pizza. Use our store locator to find the closest Domino's Pizza location to you and place your order online."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Domino's Pizza Canada® Store Locator"; }
  },
  "seo./pages/order/#!/locations/results/": {
    metaDescription: function(d) { return "Select how your Dominos order is delivered. Get you pizza, wings, or sandwiches delivered to you, to one of Dominos Hotspots, or place your order for carryout."; },
    metaKeyworkds: function(d) { return ""; },
    title: function(d) { return "Location Results - Find a Nearby Domino's"; }
  },
  "seo./pages/order/#!/locations/search/": {
    metaDescription: function(d) { return "Find pizza places near me for carryout or delivery with Domino's. Over 5,000 nearby pizza restaurants to choose from."; },
    metaKeywords: function(d) { return "pizza places, pizza restaurants, restaurants near me, food near me"; },
    title: function(d) { return "Pizza Restaurants Near Me - Find a Nearby Domino's"; }
  },
  "seo./pages/order/#!/locations/search/?type=Carryout": {
  },
  "seo./pages/order/#!/locations/search/?type=Delivery": {
  },
  "seo./pages/order/#!/section/Coupons/category/All/": {
  },
  "seo./pages/order/#!/section/Coupons/category/EnterCode/": {
  },
  "seo./pages/order/#!/section/Food/category/AllDrinks/": {
  },
  "seo./pages/order/#!/section/Food/category/AllEntrees/": {
  },
  "seo./pages/order/#!/section/Food/category/AllPizzas/": {
  },
  "seo./pages/order/#!/section/Food/category/Bread/": {
  },
  "seo./pages/order/#!/section/Food/category/BreadAndOvenBakedDips/": {
  },
  "seo./pages/order/#!/section/Food/category/Breads/": {
  },
  "seo./pages/order/#!/section/Food/category/Dessert/": {
  },
  "seo./pages/order/#!/section/Food/category/OvenBakedDips/": {
  },
  "seo./pages/order/#!/section/Food/category/Sides/": {
  },
  "seo./pages/order/#!/section/Food/category/Tots/": {
  },
  "seo./pages/order/#!/section/Food/category/Wings/": {
  },
  "seo./pages/order/#!/store-list/": {
    metaDescription: function(d) { return "Find your local Domino's Pizza store and order delivery or take away! 17 stores in Geneva, Zurich, Basel, Bern, Winterthur, Dietikon and Neuchâtel"; },
    metaKeywords: function(d) { return "Domino's Pizza stores, Domino's Pizza Menu, Pizza, Food Delivery, Take Away, Domino's Pizza Prices, Pizza Deals, Special Offer, home delivery, pizza zurich, pizza geneva, pizza basel"; },
    title: function(d) { return "Domino's Pizza | Stores"; }
  },
  "seo./pages/order/#/locations/search/": {
    metaDescription: function(d) { return "Find pizza places near me for carryout or delivery with Domino's. Over 5,000 nearby pizza restaurants to choose from."; },
    metaKeywords: function(d) { return "pizza places, pizza restaurants, restaurants near me, food near me"; },
    title: function(d) { return "Pizza Restaurants Near Me - Find a Nearby Domino's"; }
  },
  "seo./pages/order/#/store-list/": function(d) { return ""; },
  "seo./pages/order/coupon": {
    metaDescription: function(d) { return "Find pizza locations near me for carryout or delivery with Domino's. Sign into your account then choose delivery or carryout. Order Dominos for lunch or dinner."; }
  },
  "seo./pages/order/coupon#!/coupon/national/": {
    metaDescription: function(d) { return "Find Domino's Pizza Coupons and save big on your next order. View daily deals and weekly specials on your favourite Domino's pizza, pasta, sides and more."; },
    metaKeywords: function(d) { return "pizza deals, pizza coupons, online pizza deals, online pizza coupons, dominos coupons, dominos deals"; },
    title: function(d) { return "Domino's Pizza Canada® Coupons - Save on Your Order - Dominos.ca"; }
  },
  "seo./pages/order/menu#!/menu/category/all/": {
    metaDescription: function(d) { return "View Domino's menu for information on your favourite pizzas, pastas & sides. Review Domino's specialty pizzas, side options and more, then place your order online."; },
    metaKeywords: function(d) { return "dominos menu, dominos pizza menu, food menu, build your own pizza, specialty pizza, chicken, sides, pasta, sandwiches"; },
    title: function(d) { return "Domino's Pizza Canada® Menu - Pizza, Pasta, Sides & More"; }
  },
  "seo./pages/order/menu#!/menu/category/breads/": {
  },
  "seo./pages/order/menu#!/menu/category/breadsAndSides/": {
  },
  "seo./pages/order/menu#!/menu/category/breadsandOvenBakedDips/": {
    metaDescription: function(d) { return "Order your favorite Domino's bread & oven-baked dips online! Sign up for Domino's email & text offers to get great deals on your next order."; },
    title: function(d) { return "Breads & Dips | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/breadsandovenbakeddips/": {
  },
  "seo./pages/order/menu#!/menu/category/breadsandsides/": {
    metaDescription: function(d) { return "The Domino's Breads & Sides menu includes stuffed cheesy bread, bread twists and a selection of salads to order for carryout or delivery."; },
    metaKeywords: function(d) { return "salad, break twists"; },
    title: function(d) { return "Order Salads, Bread Twists, Bites & Stuffed Cheesy Bread"; }
  },
  "seo./pages/order/menu#!/menu/category/byo-pizza/": {
    metaDescription: function(d) { return "Build Your Own Pizza at Domino's! Order online for carryout or delivery. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "pizza"; },
    title: function(d) { return "Pizza Near Me - Build Your Own Pizza | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/calzon/": {
  },
  "seo./pages/order/menu#!/menu/category/chicken/": {
    metaDescription: function(d) { return "Order your favorite Domino's hot wings, BBQ wings, & boneless chicken online! Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "chicken wings, boneless chicken"; },
    title: function(d) { return "Chicken & Wings Near Me | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/combo/": {
  },
  "seo./pages/order/menu#!/menu/category/desserts/": {
    metaDescription: function(d) { return "View Domino's dessert menu for information on your favourite treats. Review Domino's dessert menu to learn about chocolate lava crunch cake or marble brownies."; },
    metaKeywords: function(d) { return "order pizza online for delivery, pizza, domino's, pizza delivery, pizza online, order pizza online, order pizza, order pizza near me, order pizza online near me, order pizza at dominos, order a pizza online dominos, order pizza delivery online"; },
    title: function(d) { return "Domino's Pizza Canada® Menu - Desserts - Dominos.ca"; }
  },
  "seo./pages/order/menu#!/menu/category/drinks/": {
    metaDescription: function(d) { return "View Domino's drink menu for information on your favourite beverages. Review Domino's drink menu to learn about Coke® products & other drink options."; },
    metaKeywords: function(d) { return "order pizza online for delivery, pizza, domino's, pizza delivery, pizza online, order pizza online, order pizza, order pizza near me, order pizza online near me, order pizza at dominos, order a pizza online dominos, order pizza delivery online"; },
    title: function(d) { return "Domino's Pizza Canada® Menu - Drinks - Dominos.ca"; }
  },
  "seo./pages/order/menu#!/menu/category/entrees/": {
    metaDescription: function(d) { return "View Domino's menu for information on your favourite entrees. Review Domino's menu to learn about specialty pizzas, topping options & delicious pasta bowl entrees."; },
    metaKeywords: function(d) { return "order pizza online for delivery, pizza, domino's, pizza delivery, pizza online, order pizza online, order pizza, order pizza near me, order pizza online near me, order pizza at dominos, order a pizza online dominos, order pizza delivery online"; },
    title: function(d) { return "Domino's Pizza Canada® Menu - Pizza & Pasta Entrees - Dominos.ca"; }
  },
  "seo./pages/order/menu#!/menu/category/extras/": {
    metaDescription: function(d) { return "Order your favorite Domino's dipping sauce, including Garlic, Hot Buffalo, & more! Sign up for email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "salad dressing, dipping sauces"; },
    title: function(d) { return "Sauces & Salad Dressing | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/gifts/": {
  },
  "seo./pages/order/menu#!/menu/category/menu/": {
  },
  "seo./pages/order/menu#!/menu/category/ovenbakeddips/": {
  },
  "seo./pages/order/menu#!/menu/category/pasta/": {
    metaDescription: function(d) { return "Order your favorite Domino's pasta online or build your own! Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "pasta"; },
    title: function(d) { return "Pasta Near Me | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/pizza/": {
    metaDescription: function(d) { return "Build Your Own Pizza at Domino's! Order online for carryout or delivery. Sign up for Domino's email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "pizza"; },
    title: function(d) { return "Pizza Near Me - Build Your Own Pizza | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/salads/": {
    metaDescription: function(d) { return "Order your favorite Domino's Classic Garden or Chicken Caesar salad online. Sign up for Domino's email & text offers to get great deals on your next order."; },
    title: function(d) { return "Salads Near Me | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/sandwich/": {
    metaDescription: function(d) { return "Order your favorite Domino's sandwiches online, including Italian, Buffalo Chicken & more! Sign up for email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return "sandwiches"; },
    title: function(d) { return "Sandwiches Near Me | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/sides/": {
    metaDescription: function(d) { return "View Domino's menu for information on your favourite sides. Review Domino's menu to learn about cheesy bread, chicken wings and our delicious sauces."; },
    metaKeywords: function(d) { return "order pizza online for delivery, pizza, domino's, pizza delivery, pizza online, order pizza online, order pizza, order pizza near me, order pizza online near me, order pizza at dominos, order a pizza online dominos, order pizza delivery online"; },
    title: function(d) { return "Domino's Pizza Canada® Menu - Chicken, Breads & Sauces - Dominos.ca"; }
  },
  "seo./pages/order/menu#!/menu/category/specialty-pizzas/": {
    metaDescription: function(d) { return "Order your favorite Domino's specialty pizza online! Available for carryout or delivery. Sign up for email & text offers for great deals on your next order."; },
    metaKeywords: function(d) { return "specialty pizza near me, specialty pizza"; },
    title: function(d) { return "Specialty Pizza Near Me | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/tots/": {
    metaDescription: function(d) { return "Order your favorite Domino's Loaded Tots, including Philly Cheese Steak, Melty 3-Cheese & more! Sign up for email & text offers to get great deals on your next order."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Loaded Tots | Domino's Menu"; }
  },
  "seo./pages/order/menu#!/menu/category/viewAll/": {
    metaDescription: function(d) { return "The Domino's includes build your own pizza, specialty pizzas, sandwiches, pasta, chicken, breads, salads, drinks & desserts. Order carryout or delivery."; },
    metaKeywords: function(d) { return "dominos menu, dominos pizza menu, food menu, build your own pizza, specialty pizza, chicken, sides, pasta, sandwiches"; },
    title: function(d) { return "dominos menu, dominos pizza menu, food menu, build your own pizza, specialty pizza, chicken, sides, pasta, sandwiches"; }
  },
  "seo./pages/order/menu#!/menu/category/viewall/": {
    metaDescription: function(d) { return "Order Domino's pizza, pasta, sandwiches & more, available for carryout or delivery. Sign up for Domino's email & text offers for great deals on your next order."; },
    metaKeywords: function(d) { return "domino's menu"; },
    title: function(d) { return "Dominos' Menu - Order Pizza, Pasta, Wings & More Online!"; }
  },
  "seo./pages/order/payment": {
    metaDescription: function(d) { return "Order summary and checkout. Enter payment information to complete."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Checkout | Domino's Pizza"; }
  },
  "seo./pages/rewards/#!/claim/": {
    metaDescription: function(d) { return "Claim Your Piece of the Pie Rewards, enter your info to claim your points."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Claim Your Rewards | Domino's Pizza"; }
  },
  "seo./pages/rewards/#!/create-profile/": {
    metaDescription: function(d) { return "Create a Domino's Pizza Profile to save personal and payment information for faster checkout, access previous orders and join Domino's Piece of the Pie Rewards to get free pizza."; },
    metaKeywords: function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online"; },
    title: function(d) { return "Create a Domino's Pizza Profile - Sign Up Today"; }
  },
  "seo./pages/rewards/#!/rewards/": {
    metaDescription: function(d) { return "Domino's Piece of the Pie Rewards program gives you rewards points toward free pizza. Learn more about the member benefits and how our loyalty program will have you eating free pizza faster. Join today."; },
    metaKeywords: function(d) { return ""; },
    title: function(d) { return "Piece of the Pie Rewards | Domino's Rewards Program"; }
  },
  "seo./pages/services/": {
  },
  "seo./pages/services/?p=customerFeedback": {
  },
  "seo./pages/services/customer-feedback": {
  },
  "seo./pages/tracker/#!/track/order/": {
    metaDescription: function(d) { return "Log in to Domino's Pizza tracker to keep an eye on your order! See how soon until your pizza, pasta, dessert or side arrives at your doorstep."; },
    metaKeywords: function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
    title: function(d) { return "Domino's Pizza Canada® Tracker - Dominos.ca"; }
  },
  "seo.pages/tracker/#!/track/order/": {
  }
}
}
);
