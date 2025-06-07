import { useState } from 'react';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FinancialContext {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  topCategories: string[];
}

interface UseFinancialAssistant {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useFinancialAssistant(financialContext: FinancialContext): UseFinancialAssistant {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sender: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      // Monta o prompt com contexto financeiro
      const prompt = `Contexto financeiro: Saldo: R$${financialContext.balance}, Renda mensal: R$${financialContext.monthlyIncome}, Gastos mensais: R$${financialContext.monthlyExpenses}, Categorias principais: ${financialContext.topCategories.join(", ")}.\nUsuário: ${content}`;
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        sender: 'assistant',
        content: data.result || 'Desculpe, não consegui responder no momento.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          sender: 'assistant',
          content: 'Erro ao se comunicar com o assistente.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return { messages, isLoading, sendMessage, clearMessages };
}
