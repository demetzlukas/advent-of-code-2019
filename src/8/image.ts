export class Image {
    static BLACK = '0';
    static WHITE = '1';
    static TRANSPARENT = '2';
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

    render() {
        let renderedPixels: string[] = [];
        for (let row = 0; row < this.height; row++) {
            let pixelRow = '';
            let pixel = '';
            for (let column = 0; column < this.width; column++) {
                for (let layer = this.pixels.length - 1; layer > -1; layer--) {
                    if (this.pixels[layer][row][column] == Image.TRANSPARENT)
                        continue;
                    pixel = this.pixels[layer][row][column];
                }
                pixelRow += pixel;
            }
            renderedPixels.push(pixelRow);
        }
        renderedPixels.forEach(row =>
            console.log(
                row
                    .split(Image.WHITE)
                    .join('+')
                    .split(Image.BLACK)
                    .join(' ')
            )
        );
    }
}
