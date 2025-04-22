document.addEventListener('DOMContentLoaded', function() {
    const userEmailSpan = document.getElementById('userEmail');
    const userEmail = localStorage.getItem('userEmail');
    const notification = document.getElementById('notification');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }
    userEmailSpan.textContent = `Bem-vindo, ${userEmail}`;

    function updateCartCount() {
        const userInfo = document.querySelector('.user-info');
        let cartCount = userInfo.querySelector('.cart-count');
        
        if (!cartCount) {
            cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            userInfo.insertBefore(cartCount, document.querySelector('.logout-btn'));
        }

        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
        });
        
        if (totalItems > 0) {
            cartCount.textContent = `🛒 ${totalItems}`;
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    const products = [
        {
            name: 'Smartphone Ultra Pro Max',
            image: './images/smartphone.jpg',
            description: 'O smartphone mais avançado do mercado com 512GB, câmera de 200MP e tela dobrável. Os engenheiros ficaram loucos!',
            price: 'R$ 2.499,00',
            isNew: true
        },
        {
            name: 'Notebook Quantum X',
            image: './images/notebook.jpg',
            description: 'Tão fino que você pode usá-lo como marcador de livro. Processador tão rápido que termina suas frases antes de você!',
            price: 'R$ 4.299,00',
            isNew: true
        },
        {
            name: 'Headphone Bluetooth Gamer',
            image: './images/headphone.jpg',
            description: 'Cancelamento de ruído tão bom que você vai começar a ouvir seus próprios pensamentos. Use com moderação!',
            price: 'R$ 349,90',
            isNew: false
        },
        {
            name: 'Smart TV 8K Curva 65',
            image: './images/tv.jpg',
            description: 'Resolução tão alta que você vai ver detalhes que nem os atores sabiam que estavam lá. Sua conta de streaming agradece!',
            price: 'R$ 3.199,00',
            isNew: true
        },
        {
            name: 'Smart Coffee Maker',
            image: './images/coffee.jpg',
            description: 'Sabe quando você precisa de café antes mesmo de você saber. Psicóloga dos eletrônicos, entende sua necessidade de cafeína!',
            price: 'R$ 279,90',
            isNew: false
        },
        {
            name: 'Cookware Titanium',
            image: './images/cookware.jpg',
            description: 'Feitas com o mesmo material dos aviões. Agora suas tentativas culinárias desastrosas só destruirão a comida, não a panela!',
            price: 'R$ 499,90',
            isNew: false
        },
        {
            name: 'NullPointer Hair',
            image: './images/nullpointer.jpg',
            description: 'Alisa todos os fios para aqule penteado para deixar qualquer careca confiante, saia sem medo.',
            price: 'R$ 259,99',
            isNew: true
        }
    ];
    
    function renderProducts() {
        const productsGrid = document.querySelector('.products-grid');
        
        if (!productsGrid) {
            console.error('Elemento .products-grid não encontrado');
            return;
        }
        productsGrid.innerHTML = ''; 
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const imagePlaceholder = 
                '<div class="image-placeholder">' +
                '<span>Imagem não disponível</span>' +
                '</div>';
            
            const newLabel = product.isNew ? '<span class="new-label">NOVO</span>' : '';
            
            productCard.innerHTML = `
                <div class="product-image-container">
                    ${newLabel}
                    <img src="${product.image}" alt="${product.name}" class="product-image" 
                        onerror="this.parentNode.innerHTML = '${imagePlaceholder}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span>${product.price}</span>
                        <button class="add-to-cart" data-product="${product.name}">Comprar</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                const product = products.find(p => p.name === productName);
                
                if (product) {
                    const existingItemIndex = cartItems.findIndex(item => item.name === productName);
            
                    if (existingItemIndex !== -1) {
                        cartItems[existingItemIndex].quantity += 1;
                        showNotification(`Quantidade de "${productName}" aumentada para ${cartItems[existingItemIndex].quantity}!`, 'success');
                    } else {

                        cartItems.push({
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                        });
                        showNotification(`"${productName}" adicionado ao carrinho!`, 'success');
                    }
                    
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCount();
                }
            });
        });
        
        console.log('Produtos renderizados:', products.length);
    }
    
    renderProducts();
    updateCartCount();
    
    const userInfo = document.querySelector('.user-info');
    const viewCartBtn = document.createElement('a');
    viewCartBtn.textContent = 'Ver Carrinho';
    viewCartBtn.href = '#';
    viewCartBtn.className = 'view-cart-btn';
    userInfo.insertBefore(viewCartBtn, document.querySelector('.logout-btn'));
    
    viewCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            showNotification('Seu carrinho está vazio!', 'error');
            return;
        }
        

        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        
        let total = 0;
        cartItems.forEach(item => {
            const priceValue = parseFloat(item.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
            total += priceValue * item.quantity;
        });
        
        const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        modal.innerHTML = `
            <div class="cart-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Seu Carrinho</h2>
                <div class="cart-items">
                    ${cartItems.map(item => `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}" 
                                    onerror="this.src='./images/placeholder.jpg'">
                            </div>
                            <div class="cart-item-info">
                                <p>${item.name}</p>
                                <p class="cart-item-price">${item.price}</p>
                                <div class="quantity-controls">
                                    <button class="quantity-btn minus" data-name="${item.name}">-</button>
                                    <span class="item-quantity">${item.quantity}</span>
                                    <button class="quantity-btn plus" data-name="${item.name}">+</button>
                                </div>
                            </div>
                          <button class="remove-item" data-name="${item.name}" title="Remover do carrinho">
                                     🗑️ Remover
                          </button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total">
                    <p>Total: <span>${formattedTotal}</span></p>
                    <button class="checkout-btn">Finalizar Compra</button>
                    <button class="clear-cart-btn">Limpar Carrinho</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        

        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        

        modal.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                const itemIndex = cartItems.findIndex(item => item.name === itemName);
                
                if (itemIndex !== -1) {
                    cartItems.splice(itemIndex, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCount();
                    

                    document.body.removeChild(modal);
                    if (cartItems.length > 0) {
                        viewCartBtn.click();
                    } else {
                        showNotification('Carrinho vazio!', 'success');
                    }
                }
            });
        });
    
        modal.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                const itemIndex = cartItems.findIndex(item => item.name === itemName);
                const isPlus = this.classList.contains('plus');
                
                if (itemIndex !== -1) {
                    if (isPlus) {

                        cartItems[itemIndex].quantity += 1;
                    } else {
                        cartItems[itemIndex].quantity -= 1;

                        if (cartItems[itemIndex].quantity <= 0) {
                            cartItems.splice(itemIndex, 1);
                        }
                    }
                    
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCount();
                    

                    document.body.removeChild(modal);
                    if (cartItems.length > 0) {
                        viewCartBtn.click();
                    } else {
                        showNotification('Carrinho vazio!', 'success');
                    }
                }
            });
        });
        

        modal.querySelector('.clear-cart-btn').addEventListener('click', function() {
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            document.body.removeChild(modal);
            showNotification('Carrinho esvaziado com sucesso!', 'success');
        });
        

        modal.querySelector('.checkout-btn').addEventListener('click', function() {
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            document.body.removeChild(modal);
            showNotification('Compra finalizada com sucesso! Obrigado por comprar na Shop Now!', 'success');
        });
    });
});