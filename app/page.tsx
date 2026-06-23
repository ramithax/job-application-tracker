import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex minh-h-screen flex-col bg-white">

      <main className="flex-1">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mt-12 mb-6 text-6xl font-bold">
              A better way to track your job application
            </h1>
            <p className="text-muted-foreground mb-6 text-xl">
              Capture,Organize,Manage your job
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up" >
                <Button size="lg" className="h-12 mb-2 px-8 text-lg font-medium">Start for free<ArrowRight className="ml-12" /> </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free forever, No credit card required.</p>
            </div>
          </div>
        </section>

        <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div>
              <div>
                <Button>Organize Application</Button>
                <Button>Get Hired</Button>
                <Button>Manage Boards</Button>
              </div>
              <div>
                <Image />
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
