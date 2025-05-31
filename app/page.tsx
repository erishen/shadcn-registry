import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.
import { Button } from '@/registry/demo/Button/Button'
import { ButtonScss } from '@/registry/scss-components/ButtonScss/button-scss'
import Card from '@/components/Card';
import ProductCard from '@/components/ProductCard';
import LeadFormWrapper from '@/components/LeadFormWrapper';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card title="Welcome to shadcn-registry">
        <p>This is a simple card component created for demonstration purposes.</p>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Product</h2>
        <ProductCard
          name="Wireless Headphones"
          description="High-quality wireless headphones with noise cancellation."
          price={99.99}
        />
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <LeadFormWrapper />
      </div>
    </main>
  );
}
