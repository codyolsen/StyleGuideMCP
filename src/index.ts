#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { designStandards } from "./design-standards.js";

/**
 * StyleGuideMCP - A barebones MCP server for surfacing design standards
 */

const server = new Server(
  {
    name: "styleguidemcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * Handler for listing available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "design://colors",
        name: "Color Palette",
        description: "Primary, neutral, and semantic color definitions",
        mimeType: "application/json",
      },
      {
        uri: "design://typography",
        name: "Typography",
        description: "Font families, sizes, weights, and line heights",
        mimeType: "application/json",
      },
      {
        uri: "design://spacing",
        name: "Spacing Scale",
        description: "Consistent spacing values for layouts",
        mimeType: "application/json",
      },
      {
        uri: "design://breakpoints",
        name: "Responsive Breakpoints",
        description: "Viewport breakpoints for responsive design",
        mimeType: "application/json",
      },
      {
        uri: "design://border-radius",
        name: "Border Radius",
        description: "Border radius values for rounded corners",
        mimeType: "application/json",
      },
      {
        uri: "design://shadows",
        name: "Box Shadows",
        description: "Shadow definitions for depth and elevation",
        mimeType: "application/json",
      },
      {
        uri: "design://all",
        name: "Complete Design System",
        description: "All design standards in one resource",
        mimeType: "application/json",
      },
    ],
  };
});

/**
 * Handler for reading a specific resource
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri.toString();

  let content: unknown;
  let description: string;

  switch (uri) {
    case "design://colors":
      content = designStandards.colors;
      description = "Color palette including primary, neutral, and semantic colors";
      break;
    case "design://typography":
      content = designStandards.typography;
      description = "Typography settings including font families, sizes, weights, and line heights";
      break;
    case "design://spacing":
      content = designStandards.spacing;
      description = "Spacing scale for consistent layouts";
      break;
    case "design://breakpoints":
      content = designStandards.breakpoints;
      description = "Responsive breakpoints for different screen sizes";
      break;
    case "design://border-radius":
      content = designStandards.borderRadius;
      description = "Border radius values for rounded corners";
      break;
    case "design://shadows":
      content = designStandards.shadows;
      description = "Box shadow definitions for depth and elevation";
      break;
    case "design://all":
      content = designStandards;
      description = "Complete design system with all standards";
      break;
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }

  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
});

/**
 * Handler for listing available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_color",
        description: "Get a specific color value from the design system",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Color category: primary, neutral, or semantic",
              enum: ["primary", "neutral", "semantic"],
            },
            name: {
              type: "string",
              description: "Color name or shade (e.g., '500', 'success')",
            },
          },
          required: ["category", "name"],
        },
      },
      {
        name: "get_typography",
        description: "Get typography values (font family, size, weight, or line height)",
        inputSchema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              description: "Typography type",
              enum: ["fontFamilies", "fontSizes", "fontWeights", "lineHeights"],
            },
            name: {
              type: "string",
              description: "Specific name (e.g., 'sans', 'base', 'bold', 'normal')",
            },
          },
          required: ["type", "name"],
        },
      },
      {
        name: "get_spacing",
        description: "Get a specific spacing value",
        inputSchema: {
          type: "object",
          properties: {
            size: {
              type: "string",
              description: "Spacing size (e.g., '0', '1', '2', '4', '8')",
            },
          },
          required: ["size"],
        },
      },
    ],
  };
});

/**
 * Handler for calling tools
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error("No arguments provided");
  }

  switch (name) {
    case "get_color": {
      const { category, name: colorName } = args as { category: keyof typeof designStandards.colors; name: string };
      const color = designStandards.colors[category]?.[colorName];
      if (!color) {
        throw new Error(`Color not found: ${category}.${colorName}`);
      }
      return {
        content: [
          {
            type: "text",
            text: `${category}.${colorName}: ${color}`,
          },
        ],
      };
    }

    case "get_typography": {
      const { type, name: typeName } = args as { type: keyof typeof designStandards.typography; name: string };
      const value = designStandards.typography[type]?.[typeName];
      if (value === undefined) {
        throw new Error(`Typography value not found: ${type}.${typeName}`);
      }
      return {
        content: [
          {
            type: "text",
            text: `${type}.${typeName}: ${value}`,
          },
        ],
      };
    }

    case "get_spacing": {
      const { size } = args as { size: string };
      const spacing = designStandards.spacing[size];
      if (!spacing) {
        throw new Error(`Spacing not found: ${size}`);
      }
      return {
        content: [
          {
            type: "text",
            text: `spacing.${size}: ${spacing}`,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("StyleGuideMCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
