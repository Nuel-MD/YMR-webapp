'use client';

import { ReactNode, useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent as TiptapEditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { ComposerProvider } from './ComposerContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Video, X, Link as LinkIcon, Bold, Italic, List, ListOrdered } from 'lucide-react';

interface ComposerRootProps {
  children: ReactNode;
  onSubmit: (data: { title: string; content: string; content_text: string; mediaFiles: File[] }) => Promise<void>;
  className?: string;
  initialAction?: 'text' | 'photo' | 'video' | null;
}

function ComposerRoot({ children, onSubmit, className, initialAction }: ComposerRootProps) {
  const [title, setTitle] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What is on your mind?',
      }),
      Image.configure({
        inline: true,
      }),
      // Video extension would go here
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none max-w-none min-h-[150px]',
      },
    },
    immediatelyRender: false,
  });

  const addMedia = useCallback((files: File[]) => {
    setMediaFiles((prev) => [...prev, ...files]);
    
    // Insert into editor for preview
    if (editor) {
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
          editor.chain().focus().setImage({ src: url }).run();
        } else if (file.type.startsWith('video/')) {
          // For video, since we don't have a video extension, we'll just insert a placeholder or wait for upload
          // Ideally we would have a setVideo command.
          editor.chain().focus().insertContent(`<p>[Video: ${file.name}]</p>`).run();
        }
      });
    }
  }, [editor]);

  const removeMedia = useCallback((index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    // Removing from editor is harder without tracking IDs, simplified for now
  }, []);

  const handleSubmit = async () => {
    if (!editor) return;
    if (!title && !editor.getText() && mediaFiles.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        content: editor.getHTML(),
        content_text: editor.getText(),
        mediaFiles,
      });
      // Reset
      setTitle('');
      setMediaFiles([]);
      editor.commands.clearContent();
    } catch (error) {
      console.error('Submit failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = Boolean(title.trim() || (editor && !editor.isEmpty) || mediaFiles.length > 0);

  return (
    <ComposerProvider
      value={{
        editor,
        title,
        setTitle,
        mediaFiles,
        addMedia,
        removeMedia,
        isSubmitting,
        submit: handleSubmit,
        canSubmit,
        initialAction
      }}
    >
      <div className={cn("flex flex-col gap-4", className)}>
        {children}
      </div>
    </ComposerProvider>
  );
}

function ComposerTitle() {
    const { title, setTitle } = import("./ComposerContext").then(m => m.useComposer()) as any; // Dynamic import workaround for direct usage inside same file if circular, but here we can just separate. 
    // Actually, I'll separate these into files or just put them here properly importing from Context.
    // I can't use dynamic import like that inside a hook/component render easily.
    return null; 
}
// I will separate the components to avoid circular deps if any, or just import `useComposer` from the context file.
// Since I already created ComposerContext.tsx, I can import `useComposer`.

export { ComposerRoot };
