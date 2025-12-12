'use client';

import { Editor } from '@tiptap/react';
import { createContext, useContext, ReactNode } from 'react';

interface ComposerContextType {
  editor: Editor | null;
  title: string;
  setTitle: (title: string) => void;
  mediaFiles: File[];
  addMedia: (files: File[]) => void;
  removeMedia: (index: number) => void;
  isSubmitting: boolean;
  submit: () => void;
  canSubmit: boolean;
  initialAction?: 'text' | 'photo' | 'video' | null;
}

const ComposerContext = createContext<ComposerContextType | undefined>(undefined);

export function useComposer() {
  const context = useContext(ComposerContext);
  if (!context) {
    throw new Error('useComposer must be used within a ComposerProvider');
  }
  return context;
}

interface ComposerProviderProps {
  children: ReactNode;
  value: ComposerContextType;
}

export function ComposerProvider({ children, value }: ComposerProviderProps) {
  return (
    <ComposerContext.Provider value={value}>
      {children}
    </ComposerContext.Provider>
  );
}
