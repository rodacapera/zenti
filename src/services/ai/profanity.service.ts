/**
 * AI Profanity Service
 * Servicio para detectar y sugerir reemplazos de palabras ofensivas
 */

import { AIFeedback } from "../../domain/entities/Chat";
import { ENV } from "../../core/config/env";
import axios from "axios";

export class ProfanityService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = ENV.AI_API_KEY;
    this.apiUrl = ENV.AI_API_URL;
  }

  /**
   * Analiza un texto y detecta palabras ofensivas
   */
  async analyzeText(text: string): Promise<AIFeedback> {
    try {
      // Lista básica de palabras ofensivas (en producción, usar un servicio de IA)
      const profanityWords = [
        "malas palabras aquí", // Reemplazar con lista real
      ];

      const lowerText = text.toLowerCase();
      const hasProfanity = profanityWords.some((word) =>
        lowerText.includes(word.toLowerCase())
      );

      if (!hasProfanity) {
        return {
          originalText: text,
          suggestedText: text,
          profanityDetected: false,
          suggestions: [],
          confidence: 1.0,
        };
      }

      // Si hay API de IA configurada, usarla
      if (this.apiKey) {
        return await this.getAISuggestions(text);
      }

      // Fallback: sugerencias básicas
      return {
        originalText: text,
        suggestedText: this.basicProfanityFilter(text),
        profanityDetected: true,
        suggestions: ["Por favor, usa un lenguaje respetuoso"],
        confidence: 0.7,
      };
    } catch (error) {
      console.error("Error analizando texto:", error);
      return {
        originalText: text,
        suggestedText: text,
        profanityDetected: false,
        suggestions: [],
        confidence: 0.5,
      };
    }
  }

  /**
   * Obtiene sugerencias de IA usando OpenAI o similar
   */
  private async getAISuggestions(text: string): Promise<AIFeedback> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente que ayuda a los niños a comunicarse de manera respetuosa. Detecta palabras ofensivas y sugiere alternativas amigables.",
            },
            {
              role: "user",
              content: `Analiza este mensaje y si tiene palabras ofensivas, sugiere una versión mejorada: "${text}"`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0]?.message?.content || text;
      const hasProfanity = aiResponse !== text;

      return {
        originalText: text,
        suggestedText: hasProfanity ? aiResponse : text,
        profanityDetected: hasProfanity,
        suggestions: hasProfanity ? [aiResponse] : [],
        confidence: 0.9,
      };
    } catch (error) {
      console.error("Error con API de IA:", error);
      const filteredText = this.basicProfanityFilter(text);
      return {
        originalText: text,
        suggestedText: filteredText,
        profanityDetected: filteredText !== text,
        suggestions: ["Por favor, usa un lenguaje respetuoso"],
        confidence: 0.7,
      };
    }
  }

  /**
   * Filtro básico de palabras ofensivas (fallback)
   */
  private basicProfanityFilter(text: string): string {
    // Implementación básica - reemplazar con lógica real
    return text.replace(/\b\w*[#$%&*]\w*\b/gi, "***");
  }
}

export const profanityService = new ProfanityService();
