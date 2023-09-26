
class Pokemon {
    number;
    name;
    moves;
    type;
    types = [];
    photo;
}
class PokemonMove {
    constructor(name, type, power, accuracy, description) {
        this.name = name;
        this.type = type;
        this.power = power;
        this.accuracy = accuracy;
        this.description = description;
    }
}
