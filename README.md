# Hybelior World Map

This project hosts an interactive world map of Hybelior. It uses [OpenSeadragon](https://openseadragon.github.io/) to display the tiled image of the map and overlays various geographic data read from CSV files.

## Folder structure

- `index.html` – main HTML page to load in a browser.
- `Data/` – CSV files describing continents, countries, regions and other places. They are parsed in `index.html` to display labels and tooltips.
- `HybeliorFull/` – Deep Zoom tiles (`*.dzi` and image tiles) used by OpenSeadragon.
- `Font/` – custom fonts used by the interface.
- `images/` – icons for the viewer controls.
- `openseadragon-bin-5.0.0/` – local distribution of OpenSeadragon JavaScript library.

## Running locally

Simply open `index.html` in a modern web browser. The page loads the map tiles from the `HybeliorFull` folder and reads the data from the CSV files in `Data`. No additional build step is required.

## Dependencies

The only JavaScript dependency bundled in the repository is OpenSeadragon, which provides zooming and panning functionality. All geographic labels are defined in the CSV files under `Data`.
