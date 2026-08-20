import { useState } from "react";

import Header from "./components/Header";
import EmptyState from "./components/EmptyState";
import AnswerBox from "./components/AnswerBox";
import ChatBox from "./components/ChatBox";

import { askSupportAgent } from "./services/chatService";

const App = () => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question) => {
    setLoading(true);
    setAnswer("");

    try {
      const data = await askSupportAgent(question);

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);

      setAnswer(
        "Something went wrong while connecting to the support agent. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">

      <Header />

      {/* Main content */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        {answer ? (
          <div className="flex min-h-full justify-center px-4 py-8 sm:px-6">
            <AnswerBox answer={answer} />
          </div>
        ) : (
          <EmptyState onSuggestionClick={handleAsk} />
        )}
      </main>

      {/* Input */}
      <ChatBox
        onAsk={handleAsk}
        loading={loading}
      />

    </div>
  );
};

export default App;