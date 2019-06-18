const pizzas = [{
    name: 'Pepperoni',
    price: 3.50
}, {
    name: 'Hawaii',
    price: 3.25
}, {
    name: 'BBQ Mixed-Grill',
    price: 3.75
}];

const cart = [];

function RenderCart() {
    let basket = document.getElementById('basket-body');
    basket.innerHTML = "";
    for (i = 0; i < cart.length; i++) {
        let priceString = FormatPriceToString(cart[i].price *cart[i].amount, ",", "€");
        basket.innerHTML +=cart[i].amount + " x " + cart[i].name + ' <span class="nend">' + priceString + '</span><br />';
    }
}

function AddToCart(product) {
    let pizzaIndex = FindIndexOfPizzaByName(pizzas[product].name);
    if (pizzaIndex > -1) {
        cart[pizzaIndex].amount++;
    } else {
        let pizza = {
            name: pizzas[product].name,
            price: pizzas[product].price,
            amount: 1
        };
        cart.push(pizza);
    }

    document.getElementById('total-amount').innerHTML = FormatPriceToString(CalculateTotalPrice(), ",", "€");
    RenderCart();
}

/**
 * @return {number}
 */
function FindIndexOfPizzaByName(pizzaName) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === pizzaName) {
            return i;
        }
    }
    return -1;
}

/**
 * @return {string}
 */
function FormatPriceToString(price, delimiter, prefix) {
    let priceString = parseFloat(Math.round(price * 100) / 100).toFixed(2);
    priceString = priceString.replace(".", delimiter);
    return prefix + priceString;
}

/**
 * @return {number}
 */
function CalculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].amount;
    }
    return totalPrice;
}