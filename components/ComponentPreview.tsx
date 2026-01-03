'use client';

import { Button } from "@/registry/new-york/ui/button";
import { StyledButton } from "./StyledButton";

interface ComponentPreviewProps {
  name: string;
}

export function ComponentPreview({ name }: ComponentPreviewProps) {
  switch (name) {
    case "example-form":
      return (
        <div className="space-y-4 w-full max-w-sm">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea placeholder="Your message..." className="w-full px-3 py-2 border rounded-md mt-1" rows={3} />
          </div>
          <Button>Send</Button>
        </div>
      );
    
    case "complex-component":
      return (
        <div className="p-4 border rounded-lg bg-slate-50 w-full">
          <h3 className="font-semibold mb-2">Complex Component</h3>
          <p className="text-sm text-slate-600">Advanced component with hooks and utilities</p>
        </div>
      );
    
    case "example-with-css":
      return (
        <div className="p-4 border rounded-lg w-full">
          <h3 className="font-semibold mb-2">Login Form</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Username" className="w-full px-3 py-2 border rounded-md" />
            <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md" />
            <Button className="w-full">Login</Button>
          </div>
        </div>
      );
    
    case "demo-with-page":
      return (
        <div className="border rounded-lg p-4 space-y-4 w-full">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">Page Layout</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-100 rounded">Content 1</div>
            <div className="p-3 bg-slate-100 rounded">Content 2</div>
          </div>
        </div>
      );
    
    case "styled-button":
      return (
        <div className="flex gap-2">
          <StyledButton>Styled Button</StyledButton>
          <StyledButton disabled>Disabled</StyledButton>
        </div>
      );
    
    default:
      return null;
  }
}
