import { ArrowUp, LoaderCircle } from "lucide-react";
import { useState } from "react";

const ChatBox = ({ onAsk, loading }) => {
    const [question, setQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || loading) {
            return;
        }

        setQuestion("");

        await onAsk(trimmedQuestion);
    };

    return (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100"
            >
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about FlowDesk..."
                    rows={1}
                    disabled={loading}
                    className="min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />

                <button
                    type="submit"
                    disabled={!question.trim() || loading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {loading ? (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                        <ArrowUp className="h-5 w-5" />
                    )}
                </button>
            </form>

            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-slate-400">
                AI responses are generated from the FlowDesk knowledge base.
            </p>
        </div>
    );
};

export default ChatBox;