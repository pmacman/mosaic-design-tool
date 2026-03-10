export function getPatternByName(name) {
    for (let i = 0; i < patterns.length; i++) {
        if (patterns[i].name === name) {
            return patterns[i];
        }
    }
}

const patterns = [
    {
        name: "1x1",
        tileWidth: 30,
        tileHeight: 30,
        totalTiles: 300,
        totalTilesPerRow: 40
    },
    {
        name: "2x1",
        tileWidth: 75,
        tileHeight: 25,
        totalTiles: 150,
        totalTilesPerRow: 14
    },
    {
        name: "2x2",
        tileWidth: 60,
        tileHeight: 60,
        totalTiles: 75,
        totalTilesPerRow: 18
    }
];