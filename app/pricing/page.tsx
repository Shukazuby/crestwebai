import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Try CrestWeb AI with no commitment.",
    features: [
      "Generate single-page websites from a prompt",
      "Full HTML, CSS, and optional JavaScript",
      "Theme colors and tone control",
      "Preview and copy code in-app",
    ],
    cta: "Get started free",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For teams that need more generations.",
    features: [
      "Unlimited website generations",
      "Priority generation",
      "Custom themes and presets",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For teams managing multiple sites.",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared projects and themes",
      "Dedicated support",
    ],
    cta: "Contact sales",
    href: "/#contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-crest-text sm:text-4xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-base text-crest-text/80">
              Generate full single-page websites from a prompt. Choose the plan that fits; upgrade or downgrade anytime.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col ${
                  plan.highlighted
                    ? "ring-2 ring-crest-primary border-crest-primary"
                    : ""
                }`}
              >
                <CardHeader className="pb-4">
                  {plan.highlighted && (
                    <span className="mb-2 inline-block w-fit rounded-full bg-crest-primary/10 px-3 py-0.5 text-xs font-medium text-crest-primary">
                      Most popular
                    </span>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-crest-text">
                      {plan.price}
                    </span>
                    <span className="text-sm text-crest-text/70">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-1">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pt-0">
                  <ul className="space-y-3 text-sm text-crest-text/90">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-0.5 text-crest-primary" aria-hidden>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? "crestPrimary" : "crestOutline"}
                    size="lg"
                    className="mt-6 w-full"
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
