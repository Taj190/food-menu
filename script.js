async function getMenu() {
  try {
    // Make a fetch request to get the JSON data
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    const menuData = await response.json();
    displayAvailableDishes(menuData);
  } catch (error) {
    console.error('Error fetching menu:', error.message);
  }
}

function displayAvailableDishes(results) {
  resultContainer.innerHTML = '';

  if (results.length === 0) {
    resultContainer.innerHTML = '<p>No matching dishes found.</p>';
    return;
  }

  results.forEach(dish => {
    const dishDetail = document.createElement('div');
    dishDetail.classList.add('dish-detail');
    dishDetail.innerHTML = `
    <div class="main-container-dishes">
      <img src="${dish.imgSrc}" alt="${dish.name} " width="100px" height="100px" class="dish-item">
      <div class="name">
      <div>
        <div class="dish-name">${dish.name}</div> 
        <div class="price">${dish.price}</div>
        </div>
        <div> <input type="checkbox" class="dish-checkbox" data-dish-id="${dish.id}"></div>
      </div>
      <div>
    `;
    resultContainer.appendChild(dishDetail);
    document.getElementById('click').style.display= 'none'
  });
}
let menu = document.getElementById('getMenu');
menu.addEventListener('click',getMenu)
// Your existing code for getMenu, displayAvailableDishes, etc.

function createPlaceOrderButton() {
  const order = document.createElement('div')
  order.class= 'btn';
  const placeOrderButton = document.createElement('button');
  placeOrderButton.textContent = 'Place Order';
  placeOrderButton.id = 'placeOrderButton'; 
  order.appendChild(placeOrderButton);
  const quickLinksDiv = document.querySelector('.quick-links');
  quickLinksDiv.appendChild(order);
  
  placeOrderButton.addEventListener('click', () => {
    
    TakeOrder()
    .then(order => {
      
      alert(`Order placed with burgers: ${order.burgers.join(', ')}`);
      return orderPrep(order);
    })
      .then(orderStatus => {
        alert(`Order status: ${orderStatus.order_status ? 'Ready for payment' : 'Preparation failed'}`);
        return payOrder(orderStatus);
      })
      .then(paymentStatus => {
        if (paymentStatus.paid) {
          alert('Payment successful. Please wait for your receipt.');
          return prepareDelivery();
        } else {
          alert('Payment failed. Please try again.');
        }
      })
      .then(deliveryStatus => {
        alert(`Delivery status: ${deliveryStatus ? 'Order on the way' : 'Delivery failed'}`);
        return deliverOrder();
      })
      .then(confirmStatus => {
        alert(`Delivery confirmed: ${confirmStatus ? 'Order delivered' : 'Confirmation failed'}`);
        return confirmDelivery();
      })
      .then(thankyouFnc)
      .catch(error => console.error(error));
  });

 
}

function prepareDelivery() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true); 
    }, 2000);
  });
}

function deliverOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true); 
    }, 1500);
  });
}

function confirmDelivery() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true); 
    }, 1000);
  });
}

function TakeOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const selectedBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomBurgerId = Math.floor(Math.random() * 5) + 1;
        selectedBurgers.push(randomBurgerId);
      }

      const order = {
        burgers: selectedBurgers
      };

      resolve(order);
    }, 2500);
  });
}

function orderPrep(order) {
  return new Promise(resolve => {
    setTimeout(() => {
      const prepStatus = {
        order_status: true,
        paid: false
      };

      resolve(prepStatus);
    }, 1500);
  });
}

function payOrder(orderStatus) {
  return new Promise(resolve => {
    setTimeout(() => {
      const paymentStatus = {
        order_status: true,
        paid: true
      };

      resolve(paymentStatus);
    }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
  document.getElementById('click').style.display= 'block'
  document.getElementById('resultContainer').style.display= 'none'
}

createPlaceOrderButton();
