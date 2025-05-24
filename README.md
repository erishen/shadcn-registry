# registry-template

You can use the `shadcn` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any React project.

> [!IMPORTANT]  
> This template uses Tailwind v4. For Tailwind v3, see [registry-template](https://github.com/shadcn-ui/registry-template).

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

## Command

- pnpm dev
- pnpm registry:build
- pnpm storybook
- pnpm build-storybook

## Install by public/r/[name].json on other projects

- pnpm dlx shadcn@latest add http://localhost:3000/r/hello-world.json
- pnpm dlx shadcn@latest add http://localhost:3000/r/complex-component.json
- pnpm dlx shadcn@latest add http://localhost:3000/r/example-form.json
- pnpm dlx shadcn@latest add http://localhost:3000/r/example-with-css.json