import { Bot } from "lucide-react";

const AnswerBox = ({ answer }) => {
    if (!answer) {
        return null;
    }

    return (
        <div className="w-full max-w-3xl">
            <div className="flex gap-3">

                {/* AI Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm">
                    <Bot className="h-4 w-4 text-white" />
                </div>

                {/* Answer */}
                <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                        FlowDesk AI
                    </p>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                        {answer}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AnswerBox;