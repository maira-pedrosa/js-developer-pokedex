
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.move = pokeDetail.move

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getmoves = (moves) => {
    return fetch(moves.url)
    .then((response) => response.json())
    .then(convertPokeApitomoves)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getMoves = async (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/move?offset=$%7Boffset%7D&limit=$%7Blimit%7D`;

    const response = await fetch(url);
    const jsonBody = await response.json();
    const moves = jsonBody.results;

    const moveDetails = await Promise.all(
        moves.map(move => pokeApi.getMoveDetails(move.url))
    )

    return moveDetails
}


pokeApi.getMoveDetails = async (moveUrl) => {
    try {
        const response = await fetch(moveUrl);
        const moveDetail = await response.json();
        
        const name = moveDetail.name;
        const type = moveDetail.type.name;
        const power = moveDetail.power;
        const accuracy = moveDetail.accuracy;
        const description = moveDetail.effect_entries[0].short_effect;

        return new PokemonMove(name, type, power, accuracy, description)
    } catch (error) {
        console.error('Erro ao buscar os detalhes do movimento:', error)
        throw error
    }
}

pokeApi.getPokemons().then((pokemonsDetails) => {
    pokemonsDetails.forEach(async (pokemon) => {
        const moves = await pokeApi.getMoves(); // Corrigido de getmoves para getMoves
        pokemon.moves = moves;
        const pokemonHtml = convertPokemonToLi(pokemon);
        pokemonList.innerHTML += pokemonHtml;
    })
})
