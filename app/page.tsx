import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { ComponentPreview } from "@/components/ComponentPreview";

const tailwindComponents = [
  {
    name: "hello-world",
    title: "Hello World",
    description: "A simple hello world component",
  },
  {
    name: "example-form",
    title: "Example Form",
    description: "A contact form with Zod validation",
  },
  {
    name: "complex-component",
    title: "Complex Component",
    description: "Advanced component with hooks and utilities",
  },
  {
    name: "example-with-css",
    title: "Example with CSS",
    description: "Login form with custom CSS styling",
  },
  {
    name: "demo-with-button",
    title: "Demo with Button",
    description: "Button component demo",
  },
  {
    name: "demo-with-header",
    title: "Demo with Header",
    description: "Header component demo",
  },
  {
    name: "demo-with-page",
    title: "Demo with Page",
    description: "Full page layout demo",
  },
];

const scssComponents = [
  {
    name: "scss-with-button",
    title: "SCSS with Button",
    description: "Button component with SCSS styling",
  },
];

const styledComponentsComponents = [
  {
    name: "styled-button",
    title: "Styled Button",
    description: "Button component with styled-components",
  },
];

interface ComponentCardProps {
  name: string;
  title: string;
  description: string;
}

function ComponentCard({ name, title, description }: ComponentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-slate-600">{description}</p>
        
        {/* Preview - only show if available */}
        {["example-form", "complex-component", "example-with-css", "demo-with-page", "styled-button"].includes(name) && (
          <div className="flex-1 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center min-h-[120px]">
            <ComponentPreview name={name} />
          </div>
        )}
        
        {/* Component Name */}
        <div className="pt-2">
          <code className="text-xs bg-slate-100 px-2 py-1 rounded block break-all">
            {name}
          </code>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Shadcn Registry</h1>
          <p className="text-xl text-slate-600 mb-8">
            A custom component registry for shadcn/ui. Browse, install, and use reusable React components with multiple styling approaches.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="#components">Browse Components</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#installation">Installation Guide</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div id="installation" className="container mx-auto px-4 py-12 bg-slate-900 text-white rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-2">Install from this registry:</p>
            <div className="bg-slate-800 p-4 rounded font-mono text-sm overflow-x-auto">
              pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/[component-name].json
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Or for local development:</p>
            <div className="bg-slate-800 p-4 rounded font-mono text-sm overflow-x-auto">
              pnpm dlx shadcn@latest add http://localhost:3000/r/[component-name].json
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-4">
            Replace <code className="bg-slate-800 px-2 py-1 rounded">[component-name]</code> with the component name from the list below.
          </p>
        </div>
      </div>

      {/* Components Grid */}
      <div id="components" className="container mx-auto px-4 py-12">
        {/* Tailwind CSS Components */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Tailwind CSS Components</h2>
            <p className="text-slate-600">Components styled with Tailwind CSS utility classes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tailwindComponents.map((component) => (
              <ComponentCard key={component.name} {...component} />
            ))}
          </div>
        </div>

        {/* SCSS Components */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">SCSS Components</h2>
            <p className="text-slate-600">Components styled with SCSS modules and stylesheets</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scssComponents.map((component) => (
              <ComponentCard key={component.name} {...component} />
            ))}
          </div>
        </div>

        {/* Styled Components */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Styled Components</h2>
            <p className="text-slate-600">Components built with styled-components library</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styledComponentsComponents.map((component) => (
              <ComponentCard key={component.name} {...component} />
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="container mx-auto px-4 py-12 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">View Component Stories</h3>
              <p className="text-sm text-slate-600 mb-3">
                Check out the Storybook documentation to see component examples and usage patterns.
              </p>
              <Button variant="outline" asChild>
                <a href="./storybook/" target="_blank" rel="noopener noreferrer">
                  Open Storybook →
                </a>
              </Button>
            </div>
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Learn More</h3>
              <p className="text-sm text-slate-600">
                For more information about shadcn/ui and how to use this registry, visit the{" "}
                <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  shadcn/ui documentation
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}