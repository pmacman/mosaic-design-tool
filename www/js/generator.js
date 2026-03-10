import * as Model from "./model";
import * as Pattern from "./pattern";

export function generateOutput(mosaic) {
    const pattern = Pattern.getPatternByName(mosaic.pattern);
    const blend = generateBlend(pattern.totalTiles, mosaic.tiles);
    let tiles = [];
    const rows = [];
    let colCount = 1;

    for (let i = 0; i < blend.length; i++) {
        tiles.push(new Model.OutputTile(blend[i], pattern.tileWidth, pattern.tileHeight));

        if (colCount < pattern.totalTilesPerRow) {
            colCount++;
        } else {
            rows.push(new Model.OutputRow(tiles));
            tiles = [];
            colCount = 1;
        }
    }

    return new Model.Output(mosaic.grout, rows);
}

export function generatePlaceholderOutput(mosaic) {
    const pattern = Pattern.getPatternByName(mosaic.pattern);
    let tiles = [];
    const rows = [];
    let colCount = 1;

    for (let i = 0; i < 300; i++) {
        tiles.push(new Model.OutputTile("#cccccc", pattern.tileWidth, pattern.tileHeight));

        if (colCount < pattern.totalTilesPerRow) {
            colCount++;
        } else {
            rows.push(new Model.OutputRow(tiles));
            tiles = [];
            colCount = 1;
        }
    }

    return new Model.Output(mosaic.grout, rows);
}

function generateBlend(numberOfTilesToDraw, tiles) {
    if (numberOfTilesToDraw < 1 || tiles.length === 0) {
        return [];
    }

    const arr = [];

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];

        if (tile.percent < 1 || tile.color === "") {
            continue;
        }

        const numberToDraw = (tile.percent / 100) * numberOfTilesToDraw;

        for (let j = 0; j < numberToDraw; j++) {
            arr.push(tile.color);
        }
    }

    return shuffleArray(arr);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}