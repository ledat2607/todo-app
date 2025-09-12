import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Button>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
    </div>
  );
}
