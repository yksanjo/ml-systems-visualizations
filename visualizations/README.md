# ML Systems Research Visualizations

Interactive 3D/2D visualizations and simulations of Machine Learning Systems research concepts for the cs249r_book textbook.

## Overview

This directory contains standalone React-based visualizations that can be embedded in Quarto book chapters or accessed independently. Each visualization demonstrates key concepts from ML Systems research.

## Visualizations

1. **System Architecture Explorer** - 3D interactive ML system architecture
2. **Data Pipeline Flow** - 2D interactive data pipeline simulator
3. **Training Simulator** - Real-time training process visualization
4. **Edge Deployment Network** - 3D edge AI deployment visualization
5. **Metrics Dashboard** - Performance metrics and analytics
6. **MLOps Pipeline** - CI/CD and MLOps workflow visualizer

## Quick Start

### Development

```bash
# Install dependencies for all workspaces
npm install

# Run a specific visualization in dev mode
npm run dev:arch        # System Architecture
npm run dev:pipeline    # Data Pipeline
npm run dev:training    # Training Simulator
npm run dev:edge        # Edge Deployment
npm run dev:metrics     # Metrics Dashboard
npm run dev:mlops       # MLOps Pipeline
```

### Production Build

```bash
# Build all visualizations
npm run build:all

# Build specific visualization
npm run build:arch
```

## Integration with Quarto

Each visualization builds to static HTML/JS/CSS files that can be:
- Embedded via iframe in Quarto `.qmd` files
- Linked directly from book chapters
- Served from static assets directory

## Citation

```bibtex
@inproceedings{reddi2024mlsysbook,
  title        = {MLSysBook.AI: Principles and Practices of Machine Learning Systems Engineering},
  author       = {Reddi, Vijay Janapa},
  booktitle    = {2024 International Conference on Hardware/Software Codesign and System Synthesis (CODES+ISSS)},
  pages        = {41--42},
  year         = {2024},
  organization = {IEEE},
  url          = {https://mlsysbook.org}
}
```

## Technology Stack

- React 18 + Vite
- Three.js (@react-three/fiber) for 3D visualizations
- D3.js for 2D diagrams
- Recharts/Chart.js for charts
- Tailwind CSS for styling
- Zustand for state management

