/**
 * Content Entity
 * Entidades para YouTube y Audiolibros
 */

export interface YouTubeChannel {
  id: string;
  childId: string;
  channelId: string;
  channelName: string;
  thumbnailUrl?: string;
  description?: string;
  addedBy: string; // parentId
  addedAt: Date;
  isActive: boolean;
}

export interface Audiobook {
  id: string;
  childId: string;
  librivoxId: string;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
  audioUrl: string;
  duration?: number; // en segundos
  addedBy: string; // parentId
  addedAt: Date;
  isActive: boolean;
  progress?: {
    currentTime: number;
    lastPlayedAt: Date;
  };
}


