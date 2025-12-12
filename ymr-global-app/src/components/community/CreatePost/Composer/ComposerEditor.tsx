'use client';
import { useComposer } from './ComposerContext';
import { EditorContent } from '@tiptap/react';

export function ComposerEditor() {
  const { editor } = useComposer();
  
  if (!editor) return null;

  return (
    <div className="min-h-[150px] cursor-text text-black" onClick={() => editor.commands.focus()}>
      <EditorContent
        editor={editor}
        className="[&_.ProseMirror]:outline-none [&_.is-empty:before]:content-[attr(data-placeholder)] [&_.is-empty:before]:float-left [&_.is-empty:before]:h-0 [&_.is-empty:before]:pointer-events-none [&_.is-empty:before]:text-gray-400"
        data-placeholder="Share something..."
      />
    </div>
  );
}
