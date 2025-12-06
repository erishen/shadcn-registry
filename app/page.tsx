import ProductCard from "@/components/ProductCard";
import { Card } from "@/registry/new-york/ui/card";
import LeadFormWrapper from "@/components/LeadFormWrapper";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Shadcn Registry</h1>
      
      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ProductCard 
          name="Product 1" 
          description="This is the first product" 
          price={19.99} 
        />
        <ProductCard 
          name="Product 2" 
          description="This is the second product" 
          price={29.99} 
        />
        <ProductCard 
          name="Product 3" 
          description="This is the third product" 
          price={39.99} 
        />
      </div>
      
      {/* Form Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <LeadFormWrapper />
      </div>
      
      {/* Card Component Example */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Card Component</h2>
        <Card className="p-6 max-w-md">
          <h3 className="text-xl font-medium mb-2">Card Title</h3>
          <p className="text-gray-600">
            This is an example of a card component from the registry.
          </p>
        </Card>
      </div>
    </div>
  );
}