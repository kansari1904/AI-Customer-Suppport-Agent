import { Bot, Circle } from "lucide-react";

const Header = () => {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">

                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/20">
                        <Bot className="h-5 w-5 text-white" />
                    </div>

                    {/* Name */}
                    <div>
                        <h1 className="text-sm font-semibold text-slate-900">
                            FlowDesk
                        </h1>

                        <div className="flex items-center gap-1.5">
                            <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />

                            <span className="text-xs text-slate-500">
                                AI Customer Support
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:block">
                    AI Support Agent
                </div>

            </div>
        </header>
    );
};

export default Header;