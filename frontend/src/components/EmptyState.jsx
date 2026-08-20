import { Bot, CreditCard, KeyRound, Settings } from "lucide-react";

const suggestions = [
    {
        icon: KeyRound,
        text: "How do I reset my password?",
    },
    {
        icon: CreditCard,
        text: "How can I upgrade my plan?",
    },
    {
        icon: Settings,
        text: "How do I change my settings?",
    },
];

const EmptyState = ({ onSuggestionClick }) => {
    return (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">

            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20">
                <Bot className="h-8 w-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                How can I help you?
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Ask me anything about FlowDesk. I can help with your
                account, billing, features, and troubleshooting.
            </p>

            {/* Suggestions */}
            <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
                {suggestions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.text}
                            onClick={() => onSuggestionClick(item.text)}
                            className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                        >
                            <Icon className="mb-3 h-5 w-5 text-emerald-500" />

                            <p className="text-sm font-medium leading-5 text-slate-700">
                                {item.text}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EmptyState;