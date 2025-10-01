# Usage Examples

## Getting Started

After building the project, you can run the MCP server:

```bash
npm run build
npm start
```

## Available Resources

### 1. Get All Colors

**Resource URI:** `design://colors`

Returns all color definitions including primary, neutral, and semantic colors.

Example response:
```json
{
  "primary": {
    "50": "#f0f9ff",
    "500": "#0ea5e9",
    "900": "#0c4a6e"
  },
  "semantic": {
    "success": "#10b981",
    "error": "#ef4444"
  }
}
```

### 2. Get Typography

**Resource URI:** `design://typography`

Returns font families, sizes, weights, and line heights.

### 3. Get Spacing

**Resource URI:** `design://spacing`

Returns the spacing scale used throughout the design system.

### 4. Get Breakpoints

**Resource URI:** `design://breakpoints`

Returns responsive breakpoint values.

### 5. Get All Standards

**Resource URI:** `design://all`

Returns the complete design system in one response.

## Using Tools

### Get a Specific Color

**Tool:** `get_color`

**Parameters:**
- `category`: "primary", "neutral", or "semantic"
- `name`: The color shade (e.g., "500") or name (e.g., "success")

**Example:**
```json
{
  "name": "get_color",
  "arguments": {
    "category": "primary",
    "name": "500"
  }
}
```

**Response:**
```
primary.500: #0ea5e9
```

### Get Typography Value

**Tool:** `get_typography`

**Parameters:**
- `type`: "fontFamilies", "fontSizes", "fontWeights", or "lineHeights"
- `name`: The specific name (e.g., "sans", "base", "bold")

**Example:**
```json
{
  "name": "get_typography",
  "arguments": {
    "type": "fontSizes",
    "name": "xl"
  }
}
```

**Response:**
```
fontSizes.xl: 1.25rem
```

### Get Spacing Value

**Tool:** `get_spacing`

**Parameters:**
- `size`: The spacing size (e.g., "4", "8", "16")

**Example:**
```json
{
  "name": "get_spacing",
  "arguments": {
    "size": "4"
  }
}
```

**Response:**
```
spacing.4: 1rem
```

## Integration with Claude Desktop

1. Build the project:
   ```bash
   npm run build
   ```

2. Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
   ```json
   {
     "mcpServers": {
       "styleguidemcp": {
         "command": "node",
         "args": ["/absolute/path/to/StyleGuideMCP/dist/index.js"]
       }
     }
   }
   ```

3. Restart Claude Desktop

4. You can now ask Claude questions about your design system, such as:
   - "What is the primary color with shade 500?"
   - "Show me all available font sizes"
   - "What are the responsive breakpoints?"
   - "Give me the spacing scale"

## Customizing Design Standards

To customize the design standards for your project, edit `src/design-standards.ts` and rebuild:

```bash
npm run build
```

The design standards are defined as a TypeScript object, making them easy to modify and type-safe.
