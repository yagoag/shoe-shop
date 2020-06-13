const products = [
  {
    id: 1,
    name: 'ASICS X Mita GEL-Kayano Trainer',
    originalPrice: 99.9,
    price: 74.9,
    image: {
      src: 'https://images.unsplash.com/photo-1560072810-1cffb09faf0f',
      alt: 'blue sneakers over a fishing net',
    },
  },
  {
    id: 2,
    name: 'New Balance X-90',
    originalPrice: 119.9,
    price: 59.9,
    image: {
      src: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
      alt: 'light pink sneakers on a black background',
    },
  },
  {
    id: 3,
    name: 'Nike Air Force 1 x Carhatt WIP',
    price: 119.9,
    image: {
      src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      alt: 'brown sneakers on an orange background',
    },
  },
  {
    id: 4,
    name: "Asics Wmns Gel-Kinsei OG 'White'",
    originalPrice: 149.9,
    price: 129.9,
    image: {
      src: 'https://images.unsplash.com/photo-1575456456278-936c89ccdb7b',
      alt: 'white and blue skeakers on a concrete floor',
    },
  },
  {
    id: 5,
    name: 'PUMA x Karl Lagerfeld',
    originalPrice: 104.9,
    price: 94.9,
    image: {
      src: 'https://images.unsplash.com/photo-1571736772567-3aa763ff559a',
      alt: 'white and pink skeakers on a concrete floor',
    },
  },
  {
    id: 6,
    name: 'Asics Gel Lyte V x Ronnie Fieg "Mint Leaf"',
    originalPrice: 79.9,
    price: 59.9,
    image: {
      src: 'https://images.unsplash.com/photo-1584539696499-bff0b4768e4e',
      alt: 'person holding a turquoise sneaker over a white background',
    },
  },
];

const shoeSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15];

const isPortalAvailable = () => {
  if (!('HTMLPortalElement' in window)) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'no-portal-error';
    errorMessage.innerHTML =
      '<h2>Portals are not available on your browser yet!</h2>' +
      '<p>This website uses HTML portals, which are only available on Chrome (and other Chromium-based browsers such as Opera) under an experimental tag.</p>' +
      '<p>To enable it, navigate to <b><code>chrome://flags</code></b>, search for <b>Enable Portals</b> and set it to <b>Enabled</b>. You will have to restart your browser for this change to take effect.</p>';

    const content = document.querySelector('main > .content');
    content.innerHTML = '';
    content.appendChild(errorMessage);

    return false;
  }

  return true;
};

const createPortal = (src, className) => {
  const portal = document.createElement('portal');
  portal.src = src;
  portal.className = className;
  portal.addEventListener('animationend', () => {
    portal.activate();
  });
  document.querySelector('body').appendChild(portal);
};

const addItemToCart = (id) => {
  localStorage.setItem(id, (parseInt(localStorage.getItem(id)) || 0) + 1);
};

const createSizeDropdown = () => {
  const size = document.createElement('div');
  size.className = 'shoe-size';
  size.textContent = 'Size: ';
  const sizeSelect = document.createElement('select');
  shoeSizes.forEach((shoeSize) => {
    const sizeOption = document.createElement('option');
    sizeOption.textContent = shoeSize;
    sizeOption.value = shoeSize;
    sizeSelect.appendChild(sizeOption);
  });
  size.appendChild(sizeSelect);

  return size;
};

const loadProductList = async () => {
  if (isPortalAvailable()) {
    const content = document.querySelector('main > .content');
    content.innerHTML = '';

    products.forEach((product) => {
      const itemCard = document.createElement('button');
      itemCard.className = 'item-card';
      itemCard.onclick = () =>
        createPortal(`./product/?id=${product.id}`, 'product-portal');

      const image = document.createElement('img');
      image.src = `${product.image.src}?fit=crop&w=600&h=400`;
      image.alt = product.image.alt;
      itemCard.appendChild(image);

      const itemName = document.createElement('div');
      itemName.className = 'item-name';
      itemName.textContent = product.name;
      itemCard.appendChild(itemName);

      if (product.originalPrice) {
        const originalPrice = document.createElement('div');
        originalPrice.className = 'original-price';
        originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
        itemCard.appendChild(originalPrice);
      }

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = `$${product.price.toFixed(2)}`;
      itemCard.appendChild(price);

      content.appendChild(itemCard);
    });
  }
};

const loadProductInfo = async () => {
  if (isPortalAvailable()) {
    const content = document.querySelector('main > .content');
    content.innerHTML = '';

    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const product = products.find((prod) => prod.id === id);

    const image = document.createElement('img');
    image.src = image.src = `${product.image.src}?fit=crop&w=600&h=400`;
    image.alt = product.image.alt;
    content.appendChild(image);

    const info = document.createElement('div');
    const itemName = document.createElement('div');
    itemName.className = 'item-name';
    itemName.textContent = product.name;
    info.appendChild(itemName);

    if (product.originalPrice) {
      const originalPrice = document.createElement('div');
      originalPrice.className = 'original-price';
      originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
      info.appendChild(originalPrice);
    }

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;
    info.appendChild(price);

    info.appendChild(createSizeDropdown());

    const addToCart = document.createElement('button');
    addToCart.textContent = 'Add to cart';
    addToCart.onclick = () => addItemToCart(id);
    info.appendChild(addToCart);

    content.appendChild(info);

    // TODO: change page title

    // <img
    //       src="https://images.unsplash.com/photo-1560072810-1cffb09faf0f?fit=crop&w=600&h=400"
    //       alt="blue sneakers over a fishing net"
    //     />
    //     <div>
    //       <div class="item-name">ASICS X Mita GEL-Kayano Trainer</div>
    //       <div class="original-price">$ 99.90</div>
    //       <div class="price">$ 74.90</div>
    //       <button>Add to cart</button>
    //     </div>
  }
};
