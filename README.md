# ML Systems Research Visualizations

[![Built for cs249r_book](https://img.shields.io/badge/Built%20for-cs249r__book-blue)](https://github.com/harvard-edge/cs249r_book)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Interactive 3D/2D visualizations and simulations of Machine Learning Systems research concepts, designed to complement the [cs249r_book](https://github.com/yksanjo/cs249r_book) textbook.

## Credits & Attribution

This visualization project is built to complement the **Introduction to Machine Learning Systems** textbook:

- **Original Repository**: [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book)
- **Forked Repository**: [yksanjo/cs249r_book](https://github.com/yksanjo/cs249r_book)
- **Textbook Website**: [mlsysbook.ai](https://mlsysbook.ai/)
- **Author**: Prof. Vijay Janapa Reddi (Harvard University)

The visualizations are inspired by and designed to support the educational content in the Machine Learning Systems textbook, originally developed as Harvard University's CS249r course.

## Overview

This project provides six interactive visualizations that demonstrate key concepts from ML Systems research:

1. **System Architecture Explorer** - 3D interactive ML system architecture
2. **Data Pipeline Flow** - 2D interactive data pipeline simulator  
3. **Training Simulator** - Real-time training process visualization
4. **Edge Deployment Network** - 3D edge AI deployment visualization
5. **Metrics Dashboard** - Performance metrics and analytics
6. **MLOps Pipeline** - CI/CD and MLOps workflow visualizer

## Quick Start

See [visualizations/QUICKSTART.md](visualizations/QUICKSTART.md) for detailed setup instructions.

```bash
cd visualizations
npm install
npm run dev:arch  # Start System Architecture visualization
```

## Project Structure

```
ml-systems-visualizations/
├── visualizations/
│   ├── system-architecture/    # 3D ML system architecture
│   ├── data-pipeline/          # 2D data pipeline flow
│   ├── training-simulator/     # Training process simulator
│   ├── edge-deployment/        # Edge AI deployment network
│   ├── metrics-dashboard/      # Performance metrics dashboard
│   ├── mlops-pipeline/         # MLOps pipeline visualizer
│   ├── shared/                 # Shared React components
│   ├── README.md               # Detailed documentation
│   ├── QUICKSTART.md           # Quick start guide
│   └── CITATION.bib            # Research citation
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** (@react-three/fiber) - 3D graphics
- **D3.js** - 2D diagrams and data visualization
- **Recharts** - Chart components
- **Tailwind CSS** - Styling
- **Zustand** - State management

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

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Credits & Attribution

This visualization project complements the **Introduction to Machine Learning Systems** textbook:

- **Original Repository**: [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book)
- **Forked Repository**: [yksanjo/cs249r_book](https://github.com/yksanjo/cs249r_book)
- **Textbook Website**: [mlsysbook.ai](https://mlsysbook.ai/)
- **Author**: Prof. Vijay Janapa Reddi (Harvard University)

See [ATTRIBUTION.md](ATTRIBUTION.md) for detailed credits and acknowledgments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related Projects

- [cs249r_book](https://github.com/harvard-edge/cs249r_book) - Original Machine Learning Systems textbook
- [mlsysbook.ai](https://mlsysbook.ai/) - Online version of the textbook

