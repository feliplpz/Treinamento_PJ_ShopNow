document.addEventListener('DOMContentLoaded', function() {
    const userEmailSpan = document.getElementById('userEmail');
    const userEmail = localStorage.getItem('userEmail');
    const notification = document.getElementById('notification');
    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }
    userEmailSpan.textContent = `Bem-vindo, ${userEmail}`;

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
            name: 'Null Pointer',
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
                        onerror="this.parentNode.innerHTML = '${imagePlaceholder}
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
                showNotification(`"${productName}" adicionado ao carrinho!`, 'success');
            });
        });
        
        console.log('Produtos renderizados:', products.length);
    }
    renderProducts();
});