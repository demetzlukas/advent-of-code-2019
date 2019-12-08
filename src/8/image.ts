const pixelWidth = 3;

export class Image {
    pixels: string[][];

    constructor(public width: number, public height: number) {
        this.pixels = [];
    }

    parseFromString(file: string): string[][] {
        let layer: string[] = [];
        while (file.length > 0) {
            layer.push(file.slice(0, this.width));
            file = file.substring(this.width);
            if (layer.length == this.height) {
                this.pixels.push(layer);
                layer = [];
            }
        }

        return this.pixels;
    }
}
