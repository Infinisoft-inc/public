# @brainstack/diagram

This package offers a streamlined method to generate URLs for PlantUML diagrams, simplifying the embedding or sharing process of UML diagrams across various formats. Whether you're looking to produce images, PNGs, SVGs, or textual representations of your diagrams, `@brainstack/diagram` is equipped to meet your needs.

## Features

- Supports generating URLs for PlantUML diagrams in multiple formats: Image, PNG, SVG, TXT.
- User-friendly, compatible with any PlantUML code.
- Eliminates the requirement for a local PlantUML server by utilizing the PlantUML web server for diagram generation.
- Ideal for documentation, educational projects, or any application that benefits from UML diagram visualization.

## Installation

```bash
npm install @brainstack/diagram
```

## Usage

Start by importing the `DiagramModule` from the package:

```javascript
import { DiagramModule } from '@brainstack/diagram';
```

You can then generate URLs for your PlantUML diagrams as follows:

```javascript
// Example PlantUML code
const umlCode = `
Alice -> Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob --> Alice: I am good thanks!
`;

// Optionally, configure the base URL if you want to use a custom PlantUML server
DiagramModule.setConfig({
  baseUrl: 'https://custom-plantuml-server.com',
});

// Generate and log URL for an image
console.log(DiagramModule.generate_img(umlCode));

// Generate and log URL for a PNG
console.log(DiagramModule.generate_png(umlCode));

// Generate and log URL for an SVG
console.log(DiagramModule.generate_svg(umlCode));

// Generate and log URL for a textual representation
console.log(DiagramModule.generate_txt(umlCode));
```

### Configuration

The `setConfig` method allows you to customize the configuration, such as changing the base URL of the PlantUML server.

```javascript
// Change the base URL of the PlantUML server
DiagramModule.setConfig({ baseUrl: 'https://custom-plantuml-server.com' });
```

This is particularly useful if you prefer to use a specific version of the PlantUML server or require a server within your network for privacy reasons.

## Documentation

For a more comprehensive guide on utilizing `@brainstack/diagram`, please consult the package documentation.

## Contributing

We welcome contributions to `@brainstack/diagram`! For contribution guidelines, please refer to our [contributing guidelines](CONTRIBUTING.md).

## License

`@brainstack/diagram` is licensed under the [MIT License](LICENSE).

## Author

Martin Ouimet - [mart@ibrain.one](mailto:mart@ibrain.one)

---

© 2024 Martin Ouimet. All rights reserved.
