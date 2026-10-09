import { ExternalLink, Lock, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: Lock,
    title: "Secure Checkout",
    desc: "ALl transactions are demo only",
  },
  {
    icon: ShieldCheck,
    title: "Verified Tickets",
    desc: "Secure booking powered by Evently",
  },
  {
    icon: ExternalLink,
    title: "Have Questions?",
    desc: "Check out the project details to learn how Evently works.",
  },
];

const TrustCards = () => {
  return (
    <div className="w-full max-w-4xl border-t border-neutral-200 pt-8 sm:pt-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {cards.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col items-center text-center"
          >
            <Icon size={22} className="text-[#6365f1]" />
            <h3 className="font-semibold text-sm text-[#1D1F23] mt-4">
              {title}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mt-2">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustCards;
