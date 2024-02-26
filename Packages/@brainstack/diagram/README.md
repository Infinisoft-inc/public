# @brainstack/diagram

This package provides a convenient way to generate URLs for PlantUML diagrams, making it easy to embed or share UML diagrams in various formats. Whether you need to generate images, PNGs, SVGs, or textual representations of your diagrams, `@brainstack/diagram` has you covered.

## Features

- Generate URLs for PlantUML diagrams in multiple formats (Image, PNG, SVG, TXT).
- Easy to use with any PlantUML code.
- No need for a local PlantUML server; uses the PlantUML web server for diagram generation.
- Suitable for documentation, educational purposes, or any project needing UML diagram visualization.

## Installation

```bash
npm install @brainstack/diagram
```

## Usage

First, import the `DiagramModule` from the package:

```javascript
import DiagramModule from '@brainstack/diagram';
```

Then, use the functions provided to generate URLs for your PlantUML diagrams:

```javascript
// Example PlantUML code
const umlCode = `
Alice -> Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob --> Alice: I am good thanks!
`;

// Generate and log URL for an image
console.log(DiagramModule.generate_img(umlCode));

// Generate and log URL for a PNG
console.log(DiagramModule.generate_png(umlCode));

// Generate and log URL for an SVG
console.log(DiagramModule.generate_svg(umlCode));

// Generate and log URL for a textual representation
console.log(DiagramModule.generate_txt(umlCode));
```

## Documentation

For more detailed information on using `@brainstack/diagram`, please refer to the package documentation.

## Contributing

Contributions to `@brainstack/diagram` are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

`@brainstack/diagram` is available under the [MIT License](LICENSE).

## Author

Martin Ouimet - [mart@ibrain.one](mailto:mart@ibrain.one)

---

© 2024 Martin Ouimet. All rights reserved.
