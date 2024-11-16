import { useState } from 'react';
import { Zap, Bot, HeadsetIcon, Calendar, Workflow } from 'lucide-react';
import { ResultCard } from '../components/ResultCard';
import { Modal } from '../components/Modal';
import { CalendlyWidget } from '../components/CalendlyWidget';

const sections = [
  {
    id: 'customer-service',
    title: 'Customer Service AI Agent',
    icon: <Bot className="w-6 h-6" />,
    inputLabel: 'Current monthly customer service budget ($)',
    inputPlaceholder: 'Enter your current budget',
    source: 'AI Chatbot Analysis',
    sourceUrl: 'https://www.singlegrain.com/blog/ms/klarna-ai/',
    statistics: [
      {
        text: 'Klarna achieved remarkable results with their AI implementation, reducing support ticket resolution time from 11 minutes to 2 minutes and generating $40 million in annual profit improvements',
        source: 'Single Grain',
        url: 'https://www.singlegrain.com/blog/ms/klarna-ai/'
      },
      {
        text: 'Businesses typically save around 30% on their customer support costs by implementing chatbots',
        source: 'Adam Connell',
        url: 'https://adamconnell.me/chatbot-statistics/'
      },
      {
        text: 'Companies can reduce their cost per support ticket from $40 to $8, representing an 80% reduction, while AI systems can autonomously handle 93% of customer support questions',
        source: 'AI for Business',
        url: 'https://ai-for.business/ai-case-study-saving-80-on-customer-support-costs-with-generative-ai/'
      }
    ]
  },
  {
    id: 'virtual-receptionist',
    title: 'AI Virtual Receptionist',
    icon: <HeadsetIcon className="w-6 h-6" />,
    inputLabel: 'Monthly call volume',
    inputPlaceholder: 'Enter number of calls per month',
    source: 'Virtual Receptionist Analysis',
    sourceUrl: 'https://dialzara.com/blog/how-much-does-an-ai-virtual-receptionist-cost/',
    statistics: [
      {
        text: 'AI virtual receptionists can handle up to 100 calls simultaneously for a single phone number, dramatically reducing customer wait times and eliminating missed calls',
        source: 'Dial Zara',
        url: 'https://dialzara.com/blog/what-is-an-ai-virtual-receptionist-and-how-can-it-benefit-your-business/'
      },
      {
        text: 'One business documented savings of $20,000 in lost revenue within just 30 days by implementing an AI phone agent, primarily by eliminating missed calls and lost leads',
        source: 'Reddit',
        url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
      },
      {
        text: 'Companies can save up to $250,000 over five years compared to employing full-time reception staff, while gaining benefits like 24/7 availability and multilingual support',
        source: 'Dial Zara',
        url: 'https://dialzara.com/blog/how-much-does-an-ai-virtual-receptionist-cost/'
      }
    ]
  },
  {
    id: 'appointment-setter',
    title: 'AI Appointment Setter',
    icon: <Calendar className="w-6 h-6" />,
    inputLabel: 'Monthly leads received',
    inputPlaceholder: 'Enter number of leads per month',
    secondaryInputLabel: 'Average deal value ($)',
    secondaryInputPlaceholder: 'Enter average deal value',
    source: 'Speed-to-Lead Analysis',
    sourceUrl: 'https://www.callpage.io/blog/posts/speed-to-lead',
    statistics: [
      {
        text: 'Companies that contact leads within 5 minutes are 21 times more likely to qualify them compared to waiting 30 minutes',
        source: 'CallPage',
        url: 'https://www.callpage.io/blog/posts/speed-to-lead'
      },
      {
        text: 'A Harvard study shows that reaching out to leads within 10 seconds can increase conversion rates by up to 381%',
        source: 'Setter',
        url: 'https://www.trysetter.com/ai-appointment-setter'
      },
      {
        text: 'One HVAC company experienced a 20% increase in bookings and conversions in just the first week of implementing AI calling',
        source: 'Reddit',
        url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
      }
    ]
  },
  {
    id: 'one-click-onboarding',
    title: 'One-Click Onboarding',
    icon: <Zap className="w-6 h-6" />,
    inputLabel: 'Monthly new client volume',
    inputPlaceholder: 'Enter number of new clients per month',
    secondaryInputLabel: 'Monthly onboarding staff salary ($)',
    secondaryInputPlaceholder: 'Enter onboarding staff salary',
    source: 'Automated Onboarding Analysis',
    sourceUrl: 'https://qflowbpm.com/process-onboarding/',
    statistics: [
      {
        text: 'Companies report reducing onboarding time from 5+ days to just 10 minutes through automation, representing a 90% reduction in processing time',
        source: 'QFlow BPM',
        url: 'https://qflowbpm.com/process-onboarding/'
      },
      {
        text: 'Organizations with automated onboarding processes experience up to 60% year-over-year revenue growth and show 82% improvement in new hire retention',
        source: 'Enboarder',
        url: 'https://enboarder.com/blog/employee-engagement-onboarding-stats/'
      },
      {
        text: 'Poor onboarding leads to significant costs, with companies losing up to 20% of an employee\'s salary when they leave within the first 6-12 months',
        source: 'Enboarder',
        url: 'https://enboarder.com/blog/employee-engagement-onboarding-stats/'
      }
    ]
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    icon: <Workflow className="w-6 h-6" />,
    inputLabel: 'Monthly manual processing hours',
    inputPlaceholder: 'Enter hours spent on manual tasks',
    source: 'Workflow Automation Analysis',
    sourceUrl: 'https://beslick.com/what-is-ai-workflow-automation/',
    statistics: [
      {
        text: 'Organizations implementing AI workflow automation report significant efficiency gains by reducing manual processing time by 70% and minimizing error rates by 90%',
        source: 'Beslick',
        url: 'https://beslick.com/what-is-ai-workflow-automation/'
      },
      {
        text: 'AI-powered workflow automation can scale operations without additional human resources, handling complex tasks that traditional automation systems struggle with',
        source: 'PulpStream',
        url: 'https://www.pulpstream.com/resources/blog/ai-workflow-automation'
      },
      {
        text: 'Businesses report improved decision-making capabilities and enhanced customer experience through faster response times and personalized service delivery',
        source: 'LeewayHertz',
        url: 'https://www.leewayhertz.com/ai-for-workflow-automation/'
      }
    ]
  }
];

export function AssessmentResults() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [secondaryValues, setSecondaryValues] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateValue = (sectionId: string, value: string, secondaryValue?: string): number => {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;

    switch (sectionId) {
      case 'customer-service':
        return Math.round(num * 0.7); // 70% savings
      
      case 'virtual-receptionist':
        const missedCalls = Math.round(num * 0.25); // 25% typically missed
        const leadValue = 100; // $100 average value per lead
        return missedCalls * leadValue;
      
      case 'appointment-setter':
        const dealValue = parseFloat(secondaryValue || '0');
        if (isNaN(dealValue)) return 0;
        const currentConversions = Math.round(num * 0.04); // 4% conversion rate
        const improvedConversions = Math.round(num * 0.21); // 21% conversion rate
        return (improvedConversions - currentConversions) * dealValue;
      
      case 'one-click-onboarding':
        const salary = parseFloat(secondaryValue || '0');
        if (isNaN(salary)) return 0;
        const hourlyRate = salary / 160; // Monthly salary to hourly rate
        const oldOnboardingTimeHours = 20; // Standard onboarding time per client
        const onboardingTimeReduction = 0.90; // 90% reduction
        const newOnboardingTimeHours = oldOnboardingTimeHours * (1 - onboardingTimeReduction);
        const currentMonthlyCost = num * oldOnboardingTimeHours * hourlyRate;
        const newMonthlyCost = num * newOnboardingTimeHours * hourlyRate;
        return Math.round((currentMonthlyCost - newMonthlyCost) * 12); // Annual savings
      
      case 'workflow-automation':
        const hourlyLabor = 50; // Average hourly labor cost
        const errorCost = 200; // Cost per error
        const errorRate = 0.15; // 15% error rate
        const currentLaborCost = num * hourlyLabor;
        const currentErrorCost = (num * errorRate) * errorCost;
        const totalCurrentCost = currentLaborCost + currentErrorCost;
        const aiHours = num * 0.3; // 70% reduction
        const aiLaborCost = aiHours * hourlyLabor;
        const aiErrorCost = (aiHours * (errorRate * 0.1)) * errorCost; // 90% error reduction
        const totalAiCost = aiLaborCost + aiErrorCost;
        return Math.round((totalCurrentCost - totalAiCost) * 12); // Annual savings
      
      default:
        return 0;
    }
  };

  const totalSavings = Object.entries(values).reduce((total, [sectionId, value]) => {
    return total + calculateValue(sectionId, value, secondaryValues[sectionId]);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                JustChatIt
              </span>
            </div>
            <a
              href="https://www.justchatit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {sections.map((section) => (
            <ResultCard
              key={section.id}
              section={section}
              value={values[section.id] || ''}
              secondaryValue={secondaryValues[section.id] || ''}
              onChange={(value) => setValues((prev) => ({ ...prev, [section.id]: value }))}
              onSecondaryChange={(value) => setSecondaryValues((prev) => ({ ...prev, [section.id]: value }))}
              calculatedValue={calculateValue(section.id, values[section.id] || '0', secondaryValues[section.id])}
            />
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Total Potential Annual Savings</h2>
          <p className="text-5xl font-bold">${totalSavings.toLocaleString()}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Book a FREE AI Audit
          </button>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Your Free AI Audit"
      >
        <CalendlyWidget url="https://calendly.com/pateljilly1/30min" />
      </Modal>
    </div>
  );
}