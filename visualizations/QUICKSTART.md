# Quick Start Guide

## Prerequisites

- Node.js 18+ and npm
- Git (if cloning the repository)

## Installation

1. **Navigate to the visualizations directory:**
   ```bash
   cd visualizations
   ```

2. **Install dependencies for all workspaces:**
   ```bash
   npm install
   ```

## Running Visualizations

Each visualization can be run independently in development mode:

```bash
# System Architecture (3D)
npm run dev:arch

# Data Pipeline (2D)
npm run dev:pipeline

# Training Simulator
npm run dev:training

# Edge Deployment (3D)
npm run dev:edge

# Metrics Dashboard
npm run dev:metrics

# MLOps Pipeline
npm run dev:mlops
```

Each command will start a development server, typically at `http://localhost:5173`.

## Building for Production

Build all visualizations:

```bash
npm run build:all
```

Build a specific visualization:

```bash
npm run build:arch      # System Architecture
npm run build:pipeline  # Data Pipeline
npm run build:training  # Training Simulator
npm run build:edge      # Edge Deployment
npm run build:metrics   # Metrics Dashboard
npm run build:mlops     # MLOps Pipeline
```

Built files will be in each visualization's `dist/` directory.

## Integration with Quarto

### Option 1: Embed via iframe

In your Quarto `.qmd` file:

```markdown
```{=html}
<iframe src="path/to/visualization/dist/index.html" 
        width="100%" 
        height="600px"
        frameborder="0">
</iframe>
```
```

### Option 2: Link to standalone page

```markdown
[View Interactive Visualization](path/to/visualization/dist/index.html)
```

### Option 3: Copy to Quarto static assets

1. Build the visualization
2. Copy the `dist/` folder to your Quarto `_freeze/` or static assets directory
3. Reference in your `.qmd` file

## Troubleshooting

### Port already in use

If port 5173 is in use, Vite will automatically try the next available port.

### Module not found errors

Make sure you've run `npm install` in the root `visualizations/` directory.

### Shared components not found

The shared components are referenced via relative paths. Make sure the directory structure is maintained.

## Next Steps

- Read the main [README.md](README.md) for detailed documentation
- Explore individual visualization components
- Customize visualizations for your specific use case
- Integrate with your Quarto book chapters

