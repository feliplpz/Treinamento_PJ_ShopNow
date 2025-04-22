document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const notification = document.getElementById('notification');

    // Função para mostrar notificações
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Validação em tempo real para o email
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        const validDomains = ['gmail.com', 'polijunior.com.br', 'usp.br', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        
        if (email.includes('@')) {
            const emailParts = email.split('@');
            if (emailParts.length === 2 && emailParts[0].length > 0) {
                const domain = emailParts[1].toLowerCase();
                if (validDomains.some(validDomain => domain.includes(validDomain))) {
                    emailInput.style.borderColor = '#2ecc71';  // Verde para válido
                } else {
                    emailInput.style.borderColor = '#e74c3c';  // Vermelho para inválido
                }
            }
        }
    });

    // Validação em tempo real para a senha
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        
        // Requisitos de senha
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (minLength && hasUpperCase && hasLowerCase && hasNumber) {
            passwordInput.style.borderColor = '#2ecc71';  // Verde para válido
        } else {
            passwordInput.style.borderColor = '#e74c3c';  // Vermelho para inválido
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validação dos campos
        if (email === '' || password === '') {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }
        
        // Validação de formato de email
        const validDomains = ['gmail.com', 'polijunior.com.br', 'usp.br', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        const emailParts = email.split('@');
        
        if (emailParts.length !== 2 || !validDomains.some(domain => emailParts[1].toLowerCase().includes(domain))) {
            errorMessage.textContent = 'Por favor, use um email válido (gmail, polijunior, usp, etc).';
            return;
        }
        
        // Validação de senha
        if (password.length < 8) {
            errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
            return;
        }
        
        if (password.length > 20) {
            errorMessage.textContent = 'A senha deve ter no máximo 20 caracteres.';
            return;
        }

        
        // Se chegou aqui, passou na validação
        console.log(`Email: ${email}`);
        console.log(`Senha: ${password}`);
        
        // Armazena o email no localStorage para usar na página de catálogo
        localStorage.setItem('userEmail', email);
        
        // Mostrar notificação de sucesso
        showNotification('Login realizado com sucesso! Redirecionando...', 'success');
        
        // Redireciona para a página de catálogo após um breve delay para mostrar a notificação
        setTimeout(() => {
            window.location.href = 'catalog.html';
        }, 1500);
    });
});