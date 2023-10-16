const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailsContainer = document.getElementById('details');

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <img class="image" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            <div class="detail">
            <span class="name">${pokemon.name}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type-item">${type}</li>`).join('')}
                </ol>
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

async function getPokemonDetails(pokemon, image) {
    const details = await pokeApi.getPokemonDetailsComplete(pokemon);
    console.log(details);
    const name = document.getElementById('details-name');
    const img = document.getElementById('details-image');
    const number = document.getElementById('details-number');
    const typesDetails = document.getElementById('details-types');
    const hp = document.getElementById('hp-value');
    const attack = document.getElementById('attack-value');
    const defense = document.getElementById('defense-value');
    const spAttack = document.getElementById('spAttack-value');
    const spDefense = document.getElementById('spDefense-value');
    const speed = document.getElementById('speed-value');
    const detailsContainer = document.getElementById('details-container');
    
    detailsContainer.classList.add(details.types[0].type.name);
    
    loadPokemonDetails(details, name, img, image, number, typesDetails, hp, attack, defense, spAttack, spDefense, speed);  
}

    function loadPokemonDetails(details, name, img, image, number, typesDetails, hp, attack, defense, spAttack, spDefense, speed) {
        console.log(details);
        console.log(image);
        name.innerText = details.name;
        img.src = image.src;
        img.alt = details.name;
        number.innerText = '#' + details.id;
        typesDetails.innerHTML = `${details.types.map((type) => `<li class="type-item">${type.type.name}</li>`).join('')}`;
        hp.innerText = details.stats[0].base_stat;
        attack.innerText = details.stats[1].base_stat;
        defense.innerText = details.stats[2].base_stat;
        spAttack.innerText = details.stats[3].base_stat;
        spDefense.innerText = details.stats[4].base_stat;
        speed.innerText = details.stats[5].base_stat;
    }

 function buttonPokemon() {
    const buttons = document.getElementsByClassName('pokemon');
    console.log(buttons);
    for (let index = 0; index < buttons.length; index++) {  
      buttons[index].addEventListener('click', () => { 
      getPokemonDetails(index+1, buttons[index].children[1]); 
      });
    }
  }

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

window.onload = () => {
    setTimeout(() => {
        buttonPokemon();
    }, "1000");
}