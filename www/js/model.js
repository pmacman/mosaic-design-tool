export class Tile {
    constructor(color = "",
        percent = "") {
        this.color = color;
        this.percent = percent;
    }
}

export class Mosaic {
    constructor(pattern = "1x1",
        grout = "black",
        tiles = [
            new Tile(),
            new Tile(),
            new Tile(),
            new Tile(),
            new Tile()
        ]) {
        this.pattern = pattern;
        this.grout = grout;
        this.tiles = tiles;
    }
}

export class Design {
    constructor(id = "",
        name = "",
        notes = "",
        created = "",
        modified = "",
        mosaic = new Mosaic()) {
        this.id = id;
        this.name = name;
        this.notes = notes;
        this.created = created;
        this.modified = modified;
        this.mosaic = mosaic;
    }
}

export class OutputTile {
    constructor(color,
        width,
        height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
}

export class OutputRow {
    constructor(tiles) {
        this.tiles = tiles;
    }
}

export class Output {
    constructor(grout = "",
        rows = []) {
        this.grout = grout;
        this.rows = rows;
    }
}