document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carousel-produits');
    const items = Array.from(track.children);
    const nextButton = document.getElementById('carousel-next');
    const prevButton = document.getElementById('carousel-prev');

    if (!track || items.length === 0 || !nextButton || !prevButton) {
        console.error("Éléments du carrousel non trouvés.");
        return;
    }

    // Calcul de la largeur d'un item
    const itemWidth = items[0].getBoundingClientRect().width;

    let currentIndex = 0;

    // Fonction pour déplacer le carrousel
    const moveToSlide = (targetIndex) => {
        // Gérer les limites
        if (targetIndex < 0) {
            targetIndex = 0;
        }
        if (targetIndex >= items.length) {
            // Optionnel: revenir au début pour un carrousel infini
            // targetIndex = 0; 
            targetIndex = items.length - 1; // Bloquer à la fin
        }
        
        track.style.transform = 'translateX(-' + itemWidth * targetIndex + 'px)';
        currentIndex = targetIndex;
    };

    // Bouton Suivant
    nextButton.addEventListener('click', e => {
        moveToSlide(currentIndex + 1);
    });

    // Bouton Précédent
    prevButton.addEventListener('click', e => {
        moveToSlide(currentIndex - 1);
    });
});