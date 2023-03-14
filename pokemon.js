$(document).ready(function() {
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon");
    xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var response = JSON.parse(this.responseText);
        var pokeList = document.getElementById("pokeList");
        response.results.forEach(function(pokemon, index) {
            console.log(pokemon.url);
            var pokemonUrl = pokemon.url;
            var xhrPokemon = new XMLHttpRequest();


            xhrPokemon.open("GET", pokemonUrl);
            xhrPokemon.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    var pokemonData = JSON.parse(this.responseText);
                    var imageUrl = pokemonData.sprites.front_default;
                    var name = pokemonData.name;
                    var abilities = pokemonData.abilities;
                    var abilityList = "";
                    abilities.forEach(function(ability, index) {
                        var abilityName = ability.ability.name;
                        abilityList += abilityName + ", ";
                    });
                abilityList = abilityList.slice(0, -2);
                var li = document.createElement("li");
                var img = document.createElement("img");
                img.src = imageUrl;
                img.alt = name;
                li.appendChild(img);
                li.appendChild(document.createTextNode(name));
                var abilityDiv = document.createElement("div");
                abilityDiv.className = "ability";
                abilityDiv.appendChild(document.createTextNode(abilityList));
                li.appendChild(abilityDiv);
                pokeList.appendChild(li);
                }
            };
    xhrPokemon.send();
    });
    }
    };
    xhr.send();

});


