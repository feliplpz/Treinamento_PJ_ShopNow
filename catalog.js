document.addEventListener('DOMContentLoaded', function() {
    // Mostra o email do usuário logado
    const userEmailSpan = document.getElementById('userEmail');
    const userEmail = localStorage.getItem('userEmail');
    const notification = document.getElementById('notification');
    
    // Verifica se o usuário está logado
    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }
    
    // Mostra o email do usuário
    userEmailSpan.textContent = `Bem-vindo, ${userEmail}`;
    
    // Inicializa o carrinho de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCounter();
    
    // Função para mostrar notificações
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Produtos fictícios para o catálogo com imagens modernas
    const products = [
        {
            id: 1,
            name: 'Smartphone Ultra Pro Max',
            image: './images/smartphone.jpg',
            description: 'O smartphone mais avançado do mercado com 512GB, câmera de 200MP e tela dobrável. Os engenheiros ficaram loucos!',
            price: 'R$ 2.499,00',
            priceValue: 2499.00,
            isNew: true
        },
        {
            id: 2,
            name: 'Notebook Quantum X',
            image: './images/notebook.jpg',
            description: 'Tão fino que você pode usá-lo como marcador de livro. Processador tão rápido que termina suas frases antes de você!',
            price: 'R$ 4.299,00',
            priceValue: 4299.00,
            isNew: true
        },
        {
            id: 3,
            name: 'Fone de Ouvido Telepático',
            image: './images/headphone.jpg',
            description: 'Cancelamento de ruído tão bom que você vai começar a ouvir seus próprios pensamentos. Use com moderação!',
            price: 'R$ 349,90',
            priceValue: 349.90,
            isNew: false
        },
        {
            id: 4,
            name: 'Smart TV 8K Curva 65"',
            image: './images/tv.jpg',
            description: 'Resolução tão alta que você vai ver detalhes que nem os atores sabiam que estavam lá. Sua conta de streaming agradece!',
            price: 'R$ 3.199,00',
            priceValue: 3199.00,
            isNew: true
        },
        {
            id: 5,
            name: 'Cafeteira Inteligente',
            image: './images/coffee.jpg',
            description: 'Sabe quando você precisa de café antes mesmo de você saber. Psicóloga dos eletrônicos, entende sua necessidade de cafeína!',
            price: 'R$ 279,90',
            priceValue: 279.90,
            isNew: false
        },
        {
            id: 6,
            name: 'Kit de Panelas Indestrutiveis',
            image: './images/cookware.jpg',
            description: 'Feitas com o mesmo material dos aviões. Agora suas tentativas culinárias desastrosas só destruirão a comida, não a panela!',
            price: 'R$ 499,90',
            priceValue: 499.90,
            isNew: false
        }
    ];
    
    // Função para renderizar os produtos na página
    function renderProducts() {
        const productsGrid = document.querySelector('.products-grid');
        
        if (!productsGrid) {
            console.error('Elemento .products-grid não encontrado');
            return;
        }
        
        productsGrid.innerHTML = ''; // Limpa o grid antes de adicionar os produtos
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const imagePlaceholder = `
                <div class="image-placeholder">
                    <span>Imagem não disponível</span>
                </div>
            `;
            
            const newLabel = product.isNew ? '<span class="new-label">NOVO</span>' : '';
            
            productCard.innerHTML = `
                <div class="product-image-container">
                    ${newLabel}
                    <img src="${product.image}" alt="${product.name}" class="product-image" 
                        onerror="this.parentNode.innerHTML = '${imagePlaceholder}'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span>${product.price}</span>
                        <button class="add-to-cart" data-product-id="${product.id}">Comprar</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Adicionar event listeners aos botões de compra
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                addToCart(productId);
            });
        });
        
        console.log('Produtos renderizados:', products.length);
    }
    
    // Função para adicionar um produto ao carrinho
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            showNotification('Produto não encontrado!', 'error');
            return;
        }
        
        // Verifica se o produto já está no carrinho
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        
        if (existingProductIndex >= 0) {
            // Se já estiver, aumenta a quantidade
            cart[existingProductIndex].quantity += 1;
        } else {
            // Se não estiver, adiciona o produto com quantidade 1
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                priceValue: product.priceValue,
                image: product.image,
                quantity: 1
            });
        }
        
        // Atualiza o contador do carrinho e salva no localStorage
        updateCartCounter();
        saveCart();
        showNotification(`"${product.name}" adicionado ao carrinho!`, 'success');
    }
    
    // Função para atualizar o contador de itens no carrinho
    function updateCartCounter() {
        const cartCounter = document.getElementById('cartCounter');
        if (cartCounter) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCounter.textContent = totalItems;
            
            // Mostra o contador apenas se houver itens
            if (totalItems > 0) {
                cartCounter.style.display = 'flex';
            } else {
                cartCounter.style.display = 'none';
            }
        }
    }
    
    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Função para renderizar o carrinho
    function renderCart() {
        const cartContainer = document.getElementById('cartContainer');
        
        if (!cartContainer) {
            console.error('Elemento #cartContainer não encontrado');
            return;
        }
        
        // Limpa o conteúdo atual
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            return;
        }
        
        // Cria a tabela de itens do carrinho
        const cartTable = document.createElement('table');
        cartTable.className = 'cart-table';
        
        // Cabeçalho da tabela
        cartTable.innerHTML = `
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Subtotal</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="cartItems"></tbody>
        `;
        
        cartContainer.appendChild(cartTable);
        
        const cartItems = document.getElementById('cartItems');
        let total = 0;
        
        // Adiciona cada item do carrinho
        cart.forEach(item => {
            const subtotal = item.priceValue * item.quantity;
            total += subtotal;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="cart-product">
                        <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </td>
                <td>${item.price}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td>
                    <button class="remove-item" data-id="${item.id}">Remover</button>
                </td>
            `;
            
            cartItems.appendChild(tr);
        });
        
        // Adiciona o total
        const totalRow = document.createElement('tr');
        totalRow.className = 'cart-total';
        totalRow.innerHTML = `
            <td colspan="3" class="total-label">Total:</td>
            <td colspan="2" class="total-value">R$ ${total.toFixed(2).replace('.', ',')}</td>
        `;
        
        cartItems.appendChild(totalRow);
        
        // Adiciona o botão de finalizar compra
        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'checkout-btn';
        checkoutBtn.textContent = 'Finalizar Compra';
        checkoutBtn.addEventListener('click', () => {
            // Aqui você implementaria a lógica de checkout
            showNotification('Compra finalizada com sucesso!', 'success');
            cart = [];
            saveCart();
            updateCartCounter();
            renderCart();
        });
        
        cartContainer.appendChild(checkoutBtn);
        
        // Adiciona os event listeners para os botões de quantidade e remover
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                changeQuantity(id, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                changeQuantity(id, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removeFromCart(id);
            });
        });
    }
    
    // Função para alterar a quantidade de um item no carrinho
    function changeQuantity(productId, change) {
        const index = cart.findIndex(item => item.id === productId);
        
        if (index === -1) return;
        
        cart[index].quantity += change;
        
        // Se a quantidade for menor ou igual a 0, remove o item
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        saveCart();
        updateCartCounter();
        renderCart();
    }
    
    // Função para remover um item do carrinho
    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);
        
        if (index === -1) return;
        
        const removedItem = cart[index];
        cart.splice(index, 1);
        
        saveCart();
        updateCartCounter();
        renderCart();
        
        showNotification(`"${removedItem.name}" removido do carrinho!`, 'success');
    }
    
    // Função para mostrar/esconder o carrinho
    function toggleCart() {
        const cartPanel = document.getElementById('cartPanel');
        cartPanel.classList.toggle('show');
        
        if (cartPanel.classList.contains('show')) {
            renderCart();
        }
    }
    
    // Adiciona o evento de clique no ícone do carrinho
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    
    // Adiciona o evento de clique no botão de fechar o carrinho
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    
    // Renderiza os produtos
    renderProducts();
});