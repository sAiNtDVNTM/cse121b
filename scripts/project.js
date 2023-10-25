
const db = {
    methods: {
        find: (id) => {
            return db.items.find((item) => item.id == id);
        },
        remove: (items) => {
            items.forEach((item) => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;
            });

            console.log(db);
        },
    },
    items: [
        {
            id: 0,
            title: 'Naruto',
            price: 350,
            qty: 8,
        },
        {
            id: 1,
            title: 'Demon Slayer',
            price: 950,
            qty: 32,
        },
        {
            id: 2,
            title: 'Deaht Note',
            price: 650,
            qty: 21,
        },
        {
            id: 3,
            title: 'One Piece',
            price: 650,
            qty: 70,
        },
    ],
};

const shoppingCart = {
    items: [],
    methods: {
        add: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if(cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
                    cartItem.qty += qty;
                } else {
                    alert("no longer in stock");
                }
            } else {
                shoppingCart.items.push({id, qty});
            }
        },
        remove: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);
            if(cartItem.qty - qty > 0) {
                cartItem.qty -= qty;
            }else { // probably error here != or !==
                shoppingCart.items = shoppingCart.items.filter(item => item.id !== id);
            }
        },
        count: () => {
            return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
        },
        get: (id) => {
            const index = shoppingCart.items.findIndex(item => item.id == id);
            return index >= 0 ? shoppingCart.items[index] : null;
        },
        getTotal: () => {
            const total = shoppingCart.items.reduce((acc, item) => {
                const found = db.methods.find(item.id);
                return acc + found.price * item.qty;
            }, 0);
            return total; 
        },
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id == id).qty - qty >= 0;
        },
        purchase: () => {
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
        },
    },
};

renderStore();

function renderStore(){
const html = db.items.map(item => {
    return `
        <div class="item">
            <div class="title">${item.title}</div>
            <div class="price">${numberToCurrency(item.price)}</div>
            <div class="qty">${item.qty} units</div>   

            <div class="actions">
            <button class="add" data-id="${
                item.id
            }">Add to Shopping Cart</button>
            </div>   
        </div>
    `;
});

document.querySelector("#store-container").innerHTML = html.join(""); 

document.querySelectorAll('.item .actions .add').forEach(botton =>{
    botton.addEventListener('click', e => {
        const id = parseInt(botton.getAttribute('data-id'));
        const item = db.methods.find(id);

        if(item && item.qty - 1 > 0){
            shoppingCart.methods.add(id, 1);
            console.log(shoppingCart);
            renderShoppingCart();
        }else{
            console.log("no longer in stock");
        }
    });
});
}
function renderShoppingCart(){
    const html = shoppingCart.items.map(item => {
        const dbItem = db.methods.find(item.id);
        return `
        <div class="item">
            <div class="title">${dbItem.title}</div>
            <div class="price">${numberToCurrency(dbItem.price)}</div>
            <div class="qty">${item.qty} units</div>
            <div class="subtotal">
            SubTotal: ${numberToCurrency(item.qty * dbItem.price)}
            </div>
            <div class="actions">
            <button class="addOne" data-id="${item.id}">+</button>
            <button class="removeOne" data-id="${item.id}">-</button>
            </div>
           </div> 
        `;
    });

    const closeButton = `
        <div class="cart-header">
            <button class="bClose">Close</button>
        </div>
    `;
    const purchaseButton = shoppingCart.items.length > 0
    ? `
        <div class="cart-actions">
            <button id="bPurchase">Purchase</button>
        </div>
    `
    : ""; 

    const total = shoppingCart.methods.getTotal();
    const totalContainer = `<div class="total">Total:${numberToCurrency(total)}</div>`;

    const shoppingCartContainer = document.querySelector(
        "#shopping-cart-container"
    );
        shoppingCartContainer.classList.remove('hide');
        shoppingCartContainer.classList.add('show');
    shoppingCartContainer.innerHTML = 
    closeButton + html.join("") + totalContainer + purchaseButton;

    document.querySelectorAll('.addOne').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            shoppingCart.methods.add(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelectorAll('.removeOne').forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            shoppingCart.methods.remove(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelector('.bClose').addEventListener('click', (e) => {
        shoppingCartContainer.classList.remove('show');
        shoppingCartContainer.classList.add('hide');
    });

    const bPurchase = document.querySelector('#bPurchase');
    if(bPurchase){
        bPurchase.addEventListener("click", (e) => {
            shoppingCart.methods.purchase();
            renderStore();
            renderShoppingCart();
        });
    }
}

function numberToCurrency(n){
    return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits:2,
        style: "currency",
        currency: "USD"
    }).format(n);
} 

const OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5489cb1fdamsh590811bbe8f6510p1276f2jsnf45e92e9e18a',
      'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
    }
  }
  
  const fetchIpInfo = ip => {
    return fetch(`https://ip-geo-location.p.rapidapi.com/ip/${ip}`, OPTIONS)
    .then (answer => answer.json())
    .catch(error => console.error(error))
  }

  const form = document.querySelector('#form')
  const input = document.querySelector('#input')
  const submit = document.querySelector('#submit')
  const results = document.querySelector('#results')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const {value} = input
    if(!value) return

    submit.setAttribute('disabled', '')
    submit.setAttribute('aria-busy', 'true')

    const ipInfo = await fetchIpInfo(value)

    if(ipInfo){
        results.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    submit.removeAttribute('disabled')
    submit.removeAttribute('aria-busy')
  })