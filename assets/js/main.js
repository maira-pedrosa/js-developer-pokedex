const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 251
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    const movesList = pokemon.moves.map((move) => move.name).join(', ');

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="abilities-box"> <!-- Adicione a classe .abilities-box -->
                <strong>Abilities:</strong>
                <ul>
                    ${pokemon.moves.map((move) => `<li>${move.name}</li>`).join('')}
                </ul>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(async (pokemon) => {
            const moves = await pokeApi.getMoves();
            pokemon.moves = moves;
            const pokemonHtml = convertPokemonToLi(pokemon);
            pokemonList.innerHTML += pokemonHtml;
        })
    })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
})

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach((pokemon) => {
            pokeApi.getmoves(pokemon).then((moves) => {
                pokemon.moves = moves
                const pokemonHtml = convertPokemonToLi(pokemon);
                pokemonList.innerHTML += pokemonHtml;
            })
        })
    })
}