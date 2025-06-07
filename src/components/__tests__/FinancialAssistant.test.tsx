import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FinancialAssistant } from '../../src/components/FinancialAssistant';
import { useFinancialAssistant } from '../../src/hooks/useFinancialAssistant';

// Mock do hook useFinancialAssistant
jest.mock('../../hooks/useFinancialAssistant');

const mockFinancialContext = {
  balance: 5000,
  monthlyIncome: 3000,
  monthlyExpenses: 2000,
  topCategories: ['Alimentação', 'Transporte', 'Moradia'],
};

describe('FinancialAssistant', () => {
  beforeEach(() => {
    // Mock das funções do hook
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });
  });

  it('renderiza corretamente', () => {
    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    expect(screen.getByText('Assistente Financeiro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
  });

  it('envia mensagem quando o botão é clicado', async () => {
    const mockSendMessage = jest.fn();
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: mockSendMessage,
      clearMessages: jest.fn(),
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Olá, assistente!' } });
    fireEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('Olá, assistente!');
  });

  it('envia mensagem quando Enter é pressionado', async () => {
    const mockSendMessage = jest.fn();
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: mockSendMessage,
      clearMessages: jest.fn(),
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    const input = screen.getByPlaceholderText('Digite sua mensagem...');

    fireEvent.change(input, { target: { value: 'Olá, assistente!' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockSendMessage).toHaveBeenCalledWith('Olá, assistente!');
  });

  it('não envia mensagem vazia', () => {
    const mockSendMessage = jest.fn();
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: mockSendMessage,
      clearMessages: jest.fn(),
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(sendButton);

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('exibe mensagens corretamente', () => {
    const mockMessages = [
      {
        id: '1',
        content: 'Olá, como posso ajudar?',
        sender: 'assistant',
        timestamp: new Date(),
      },
      {
        id: '2',
        content: 'Preciso de ajuda com meu orçamento',
        sender: 'user',
        timestamp: new Date(),
      },
    ];

    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    expect(screen.getByText('Olá, como posso ajudar?')).toBeInTheDocument();
    expect(screen.getByText('Preciso de ajuda com meu orçamento')).toBeInTheDocument();
  });

  it('exibe indicador de carregamento', () => {
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: true,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('limpa mensagens quando o botão de limpar é clicado', () => {
    const mockClearMessages = jest.fn();
    (useFinancialAssistant as jest.Mock).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: mockClearMessages,
    });

    render(<FinancialAssistant financialContext={mockFinancialContext} />);

    const clearButton = screen.getByRole('button', { name: /limpar/i });
    fireEvent.click(clearButton);

    expect(mockClearMessages).toHaveBeenCalled();
  });
});
