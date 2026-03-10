import { colors } from "./palette";
import { createApp } from "vue";
import * as Generator from "./generator";
import * as Model from "./model";
import * as Swiper from "./swiper";

const ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
    /* Do things after DOM has fully loaded */

    const model = {
        data() {
            return {
                design: new Model.Design(),
                palette: colors,
                activePosition: 0,
                selectedColors: [],
                output: null
            };
        },
        computed: {
            adjustment() {
                let total = 0;

                for (let i = 0; i < this.design.mosaic.tiles.length; i++) {
                    const tile = this.design.mosaic.tiles[i];
                    if (tile.percent === "") {
                        continue;
                    }

                    total += parseFloat(tile.percent);
                }

                let result = 100 - total;

                if (result > 0) {
                    result = "+" + result;
                }

                return result + "%";
            },
            adjustmentClassObject() {
                return {
                    "text-success": this.adjustment.charAt(0) === "+",
                    "text-danger": this.adjustment.charAt(0) === "-"
                };
            }
        },
        created() {
            this.loadPlaceholderDesign();
        },
        methods: {
            pickColor(e) {
                const checkbox = e.target;
                const newColor = e.target.value;
                const oldColor = this.design.mosaic.tiles[this.activePosition].color;

                if (checkbox.checked) {
                    if (oldColor !== "") {
                        const indexOldColor = this.selectedColors.indexOf(oldColor);
                        if (indexOldColor >= 0) {
                            this.selectedColors.splice(indexOldColor, 1);
                        }
                    }
                    this.design.mosaic.tiles[this.activePosition].color = newColor;
                } else {
                    for (let i = 0; i < this.design.mosaic.tiles.length; i++) {
                        if (this.design.mosaic.tiles[i].color === newColor) {
                            this.design.mosaic.tiles[i].color = "";
                            this.design.mosaic.tiles[i].percent = "";
                            break;
                        }
                    }
                }

                this.generateOutput();
            },
            generateOutput() {
                console.log("Generating output");
                if (!isValidInput(this)) {
                    return false;
                }
                this.output = Generator.generateOutput(this.design.mosaic);
            },
            percentKeyPress(e) {
                const allowedCharacters = /[0-9]+/;
                if (!allowedCharacters.test(e.key)) {
                    e.preventDefault();
                }
            },
            dragStart(e) {
                e.dataTransfer.setData("SelectionIndex", e.target.dataset.index);
            },
            onDrop(e) {
                const index = e.dataTransfer.getData("SelectionIndex");
                const color = this.design.mosaic.tiles[index].color;
                const indexColorToDrop = this.selectedColors.indexOf(color);
                if (indexColorToDrop >= 0) {
                    this.selectedColors.splice(indexColorToDrop, 1);
                }
                this.design.mosaic.tiles[index].color = "";
                this.design.mosaic.tiles[index].percent = "";
            },
            loadPlaceholderDesign() {
                this.output = Generator.generatePlaceholderOutput(this.design.mosaic);
            },
            reset() {
                location.reload();
            }
        }
    };

    createApp(model).mount("#app");

    Swiper.init();

    function isValidInput(model) {
        if (model.adjustment === "+100%") {
            return false;
        }

        for (let i = 0; i < model.design.mosaic.tiles.length; i++) {
            if ((model.design.mosaic.tiles[i].color === "" && model.design.mosaic.tiles[i].percent > 0) ||
                (model.design.mosaic.tiles[i].percent < 1 && model.design.mosaic.tiles[i].color !== "")) {
                return false;
            }
        }

        for (let i = 0; i < model.design.mosaic.tiles.length; i++) {
            if (model.design.mosaic.tiles[i].color !== "" && model.adjustment === "0%") {
                return true;
            }
        }

        return false;
    }
});