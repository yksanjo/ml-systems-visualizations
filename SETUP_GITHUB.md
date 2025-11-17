# Setting Up GitHub Repository

## Step 1: Create Repository on GitHub

1. Go to [GitHub](https://github.com/new)
2. Repository name: `ml-systems-visualizations` (or your preferred name)
3. Description: "Interactive 3D/2D visualizations for ML Systems research - complements cs249r_book"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Connect Local Repository

After creating the repository on GitHub, run these commands:

```bash
cd ml-systems-visualizations

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ml-systems-visualizations.git

# Rename branch to main (if needed)
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ML Systems Research Visualizations

- Add 6 interactive visualizations (3D/2D)
- System Architecture Explorer
- Data Pipeline Flow Simulator
- Training Process Simulator
- Edge AI Deployment Network
- Performance Metrics Dashboard
- MLOps Pipeline Visualizer
- Shared React components
- Documentation and attribution

Credits: Built to complement cs249r_book by Prof. Vijay Janapa Reddi"

# Push to GitHub
git push -u origin main
```

## Step 3: Add Repository Topics

On GitHub, go to your repository settings and add these topics:
- `machine-learning`
- `ml-systems`
- `visualization`
- `react`
- `threejs`
- `d3js`
- `education`
- `interactive-learning`
- `cs249r`

## Step 4: Update Repository Description

Suggested description:
```
Interactive 3D/2D visualizations for Machine Learning Systems research. 
Complements the cs249r_book textbook by Prof. Vijay Janapa Reddi (Harvard).
Built with React, Three.js, and D3.js.
```

## Step 5: Enable GitHub Pages (Optional)

If you want to host the visualizations:

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `docs` folder
4. Save

## Attribution Badge

Consider adding this to your README (it will appear automatically if you link to the original repo):

```markdown
[![Built for cs249r_book](https://img.shields.io/badge/Built%20for-cs249r__book-blue)](https://github.com/harvard-edge/cs249r_book)
```

## License Note

The LICENSE file includes attribution to the original work. Make sure to:
- Credit Prof. Vijay Janapa Reddi
- Link to the original cs249r_book repository
- Link to your forked repository
- Include the research citation

