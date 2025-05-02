let copyBtn = document.getElementById('copy'); 

function getPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 16;
    let password = ""; 

    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length); 
        password += chars.substring(randomNumber, randomNumber + 1); 
    }

    document.getElementById('password').value = password; 
}


const generateButton = document.querySelector('button:first-child'); 
if (generateButton) {
    generateButton.addEventListener('click', getPassword);
}

document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour copier le mot de passe
    function copyPassword() {
        const passwordInput = document.querySelector('#password'); // Sélectionne l'input

        if (passwordInput) {
            passwordInput.select();
            document.execCommand('copy');
            alert('Mot de passe copié !');
        } else {
            console.error('Champ mot de passe introuvable.');
        }
    }

    // Attache la fonction au clic du bouton "Copier"
    const copyButton = document.querySelector('#Copy'); // Sélectionne le bouton
    if (copyButton) {
        copyButton.addEventListener('click', copyPassword);
    }
});