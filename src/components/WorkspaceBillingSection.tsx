
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Check, Package, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  current: boolean;
}

const WorkspaceBillingSection: React.FC = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<string>('pro');
  const [plans] = useState<Plan[]>([
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Basic features for small teams',
      features: [
        { text: '5 Team Members', included: true },
        { text: '3 Projects', included: true },
        { text: 'Basic Analytics', included: true },
        { text: 'Email Support', included: true },
        { text: 'Advanced Security', included: false },
        { text: 'Custom Domain', included: false },
      ],
      current: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$15',
      description: 'Advanced features for growing teams',
      features: [
        { text: 'Unlimited Team Members', included: true },
        { text: '20 Projects', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Custom Domain', included: false },
      ],
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49',
      description: 'Premium features for large organizations',
      features: [
        { text: 'Unlimited Team Members', included: true },
        { text: 'Unlimited Projects', included: true },
        { text: 'Custom Analytics', included: true },
        { text: 'Dedicated Support', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'Custom Domain', included: true },
      ],
      current: false,
    },
  ]);

  const handleChangePlan = (planId: string) => {
    setCurrentPlan(planId);
    toast({
      title: "Plan changed",
      description: `Your subscription has been updated to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
    });
  };

  const handleManagePayment = () => {
    toast({
      title: "Payment management",
      description: "Redirecting to payment management page...",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {plans.find(p => p.id === currentPlan)?.name} Plan
              </h3>
              <p className="text-sm text-gray-500">
                {plans.find(p => p.id === currentPlan)?.description}
              </p>
            </div>
            <div className="text-2xl font-bold">
              {plans.find(p => p.id === currentPlan)?.price}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleManagePayment}>
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Payment
          </Button>
          <Button variant="outline">
            View Invoice History
          </Button>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`${plan.id === currentPlan ? 'border-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-2xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check 
                      className={`mr-2 h-4 w-4 mt-0.5 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} 
                    />
                    <span className={feature.included ? '' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === currentPlan ? (
                <Button className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleChangePlan(plan.id)}
                >
                  Change Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceBillingSection;
