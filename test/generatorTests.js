import { assert } from "chai";
import { describe, it } from "mocha";
import * as Generator from "../www/js/generator";
import * as Model from "../www/js/model";
import * as Pattern from "../www/js/pattern";

describe("Generator", function() {
    describe("#generateOutput()", function() {
        const tests = [
            { args: Pattern.getPatternByName("1x1") },
            { args: Pattern.getPatternByName("2x1") },
            { args: Pattern.getPatternByName("2x2") }
        ];

        tests.forEach(function(test) {
            it("should generate output for pattern " + test.args.name, function() {
                // Arrange
                const tiles = [
                    new Model.Tile("blue", "50"),
                    new Model.Tile("red", "50")
                ];

                const mosaic = new Model.Mosaic(test.args.name, "black", tiles);

                // Act
                const result = Generator.generateOutput(mosaic);

                // Assert
                for (let i = 0; i < result.rows.length; i++) {
                    assert.lengthOf(result.rows[i].tiles, test.args.totalTilesPerRow);
                }
            });
        });
    });
});