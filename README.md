# StyleGuideMCP

A barebones MCP (Model Context Protocol) server for surfacing design standards for front-end designs.

## Overview

StyleGuideMCP provides a simple way to access design system standards through the Model Context Protocol. It exposes design tokens including colors, typography, spacing, breakpoints, border radius, and shadows as MCP resources and tools.

## Features

- **Resources**: Access complete design standards through URI-based resources
- **Tools**: Query specific design tokens programmatically
- **Standards Included**:
  - Color palette (primary, neutral, semantic)
  - Typography (font families, sizes, weights, line heights)
  - Spacing scale
  - Responsive breakpoints
  - Border radius values
  - Box shadow definitions

## Installation

```bash
npm install
npm run build
```

## Usage

### As an MCP Server

The server runs on stdio and can be integrated with any MCP client:

```bash
npm start
```

Or in development mode:

```bash
npm run dev
```

### Configuration for Claude Desktop

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "styleguidemcp": {
      "command": "node",
      "args": ["/path/to/StyleGuideMCP/dist/index.js"]
    }
  }
}
```

## Available Resources

- `design://colors` - Color palette with primary, neutral, and semantic colors
- `design://typography` - Font families, sizes, weights, and line heights
- `design://spacing` - Spacing scale for consistent layouts
- `design://breakpoints` - Responsive breakpoints
- `design://border-radius` - Border radius values
- `design://shadows` - Box shadow definitions
- `design://all` - Complete design system

## Available Tools

### get_color

Get a specific color value from the design system.

**Parameters:**
- `category`: Color category (primary, neutral, semantic)
- `name`: Color name or shade (e.g., "500", "success")

### get_typography

Get typography values.

**Parameters:**
- `type`: Typography type (fontFamilies, fontSizes, fontWeights, lineHeights)
- `name`: Specific name (e.g., "sans", "base", "bold")

### get_spacing

Get a specific spacing value.

**Parameters:**
- `size`: Spacing size (e.g., "0", "1", "2", "4", "8")

## Design Standards

The design standards are based on modern design system best practices and include:

### Colors
- Primary colors with 10 shades (50-900)
- Neutral grays with 10 shades
- Semantic colors (success, warning, error, info)

### Typography
- Three font families (sans, serif, mono)
- Nine font sizes (xs to 5xl)
- Five font weights
- Three line heights

### Spacing
- 10 spacing values following a consistent scale

### Breakpoints
- Five responsive breakpoints (sm, md, lg, xl, 2xl)

### Border Radius
- Eight radius values from none to full

### Shadows
- Five shadow depths (sm, default, md, lg, xl)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev
```

## License

MIT