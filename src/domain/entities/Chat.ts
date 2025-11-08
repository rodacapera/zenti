/**
 * Chat Entity
 * Entidades para el sistema de chat
 */

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  mediaUrl?: string;
  aiFeedback?: AIFeedback;
  isProfane: boolean;
  createdAt: Date;
  readAt?: Date;
}

export enum MessageType {
  TEXT = "text",
  AUDIO = "audio",
  VIDEO = "video",
  IMAGE = "image",
}

export interface AIFeedback {
  originalText: string;
  suggestedText: string;
  profanityDetected: boolean;
  suggestions: string[];
  confidence: number;
}

export interface Chat {
  id: string;
  parentId: string;
  childId: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationStats {
  childId: string;
  totalMessages: number;
  profaneMessages: number;
  aiAssistances: number;
  period: {
    start: Date;
    end: Date;
  };
}

