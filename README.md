# shadcn-registry

A custom component registry for [shadcn/ui](https://ui.shadcn.com/), built with Next.js and Storybook. This project allows you to create, showcase, and distribute reusable React components.

**Live Demo:** https://erishen.github.io/shadcn-registry

**Storybook:** https://erishen.github.io/shadcn-registry/storybook/

## Features

- Built with Next.js 15 and React 19
- Component documentation with Storybook
- Custom component registry for shadcn/ui
- TypeScript support
- Tailwind CSS styling
- Form validation with React Hook Form and Zod
- Radix UI components integration

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
pnpm install
```

### Development

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Start Storybook (http://localhost:6006)
pnpm storybook
```

### Build

```bash
# Build Next.js project
pnpm build

# Build Storybook documentation
pnpm build-storybook

# Deploy to GitHub Pages
pnpm deploy
```

## Using Components from Registry

You can install components from this registry in other projects using shadcn/ui CLI:

### From Production (GitHub Pages)

```bash
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/[component-name].json
```

### From Local Development

First, start the development server:

```bash
pnpm dev
```

Then in another project, install components:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/[component-name].json
```

### Available Components

| Component | Name | Description |
|-----------|------|-------------|
| Hello World | `hello-world` | A simple hello world component |
| Example Form | `example-form` | A contact form with Zod validation |
| Complex Component | `complex-component` | Advanced component with hooks and utilities |
| Example with CSS | `example-with-css` | Login form with custom CSS styling |
| Demo with Button | `demo-with-button` | Button component demo |
| Demo with Header | `demo-with-header` | Header component demo |
| Demo with Page | `demo-with-page` | Full page layout demo |
| SCSS with Button | `scss-with-button` | Button component with SCSS styling |

### Example Installation

```bash
# Install the example form component
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/example-form.json

# Install the complex component
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/complex-component.json
```

After installation, the components will be added to your project's component directory and ready to use.

## Project Structure

```
shadcn-registry/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── stories/         # Storybook stories
├── public/
│   └── r/               # Component registry JSON files
├── .storybook/          # Storybook configuration
└── docs/                # Built Storybook output
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build Next.js project |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm storybook` | Start Storybook dev server |
| `pnpm build-storybook` | Build Storybook static site |
| `pnpm deploy` | Build and prepare for GitHub Pages deployment |

## Technologies

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Component Library:** shadcn/ui, Radix UI
- **Styling:** Tailwind CSS, SCSS
- **Forms:** React Hook Form, Zod
- **Documentation:** Storybook
- **Language:** TypeScript

## Deployment

This project is automatically deployed to GitHub Pages on every push to the `main` branch using GitHub Actions.

## License

MIT