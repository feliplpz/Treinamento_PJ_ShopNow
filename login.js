document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const notification = document.getElementById('notification');

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        const validDomains = ['gmail.com', 'polijunior.com.br', 'usp.br', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        
        if (email.includes('@')) {
            const emailParts = email.split('@');
            if (emailParts.length === 2 && emailParts[0].length > 0) {
                const domain = emailParts[1].toLowerCase();
                if (validDomains.some(validDomain => domain.includes(validDomain))) {
                    emailInput.style.borderColor = '#2ecc71';  
                } else {
                    emailInput.style.borderColor = '#e74c3c'; 
                }
            }
        }
    });

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const minLength = password.length >= 8;
        
        if (minLength) {
            passwordInput.style.borderColor = '#2ecc71'; 
        } else {
            passwordInput.style.borderColor = '#e74c3c';  
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (email === '' || password === '') {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }
        
        const validDomains = ['gmail.com', 'polijunior.com.br', 'usp.br', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        const emailParts = email.split('@');
        
        if (emailParts.length !== 2 || !validDomains.some(domain => emailParts[1].toLowerCase().includes(domain))) {
            errorMessage.textContent = 'Por favor, use um email válido (gmail, polijunior, usp, etc).';
            return;
        }
        
        if (password.length < 8) {
            errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
            return;
        }
        
        console.log(`Email: ${email}`);
        console.log(`Senha: ${password}`);
        
        if (!localStorage.getItem('cartItems')) {
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
        
        localStorage.setItem('userEmail', email);
        showNotification('Login realizado com sucesso! Redirecionando...', 'success');
        
        setTimeout(() => {
            window.location.href = 'catalog.html';
        }, 1500);
    });
});