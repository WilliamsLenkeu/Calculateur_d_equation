document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.my-button');
    const animation = document.querySelector('.animation');

    button.addEventListener('click', function() {
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const c = parseFloat(document.getElementById('c').value);

        const discriminant = b * b - 4 * a * c;

        if (discriminant > 0) {
            // Résultats réels
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

            // Animation du T-Rex
            animation.innerHTML = "Animation du T-Rex pour les résultats réels";
            animation.style.animationDuration = Math.abs(x1 * x2) + "s";
        } else if (discriminant === 0) {
            // Résultat double
            const x = -b / (2 * a);

            // Animation du T-Rex
            animation.innerHTML = "Animation du T-Rex pour le résultat double";
            animation.style.animationDuration = Math.abs(x) + "s";
        } else {
            // Résultats imaginaires
            const realPart = -b / (2 * a);
            const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);

            // Animation du Pterodactyle
            animation.innerHTML = "Animation du Pterodactyle pour les résultats imaginaires";
            animation.style.animationDuration = Math.abs(realPart * imaginaryPart) + "s";
        }

        // Récupérer les coordonnées de l'utilisateur
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Appel à l'API OpenWeather
                const apiKey = 'YOUR_OPENWEATHER_API_KEY';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const weatherDescription = data.weather[0].description;
                        const isRaining = weatherDescription.includes('rain');

                        // Gérer le thème en fonction de l'heure
                        const date = new Date();
                        const hours = date.getHours();

                        if (hours >= 19 || hours < 6) {
                            // Nuit
                            document.body.style.backgroundColor = "black";
                            document.body.style.color = "white";
                        } else {
                            // Jour
                            document.body.style.backgroundColor = "white";
                            document.body.style.color = "black";
                        }

                        // Gérer les conditions météorologiques
                        if (isRaining) {
                            // Afficher l'animation de pluie
                            animation.innerHTML += "<br>Animation de pluie";
                        }
                    })
                    .catch(error => console.log('Error fetching weather data:', error));
            }, function(error) {
                console.error("Erreur de géolocalisation :", error);
            });
        } else {
            console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    });
});
