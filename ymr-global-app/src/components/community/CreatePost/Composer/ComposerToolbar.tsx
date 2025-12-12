'use client';
import { useComposer } from './ComposerContext';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, Video } from 'lucide-react';
import { useRef, useEffect } from 'react';

export function ComposerToolbar() {
  const { editor, addMedia, initialAction } = useComposer();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Only trigger once when mounted with an action
    if (initialAction && !hasTriggeredRef.current) {
        // Small timeout to ensure DOM is ready and modal transition is done
        const timer = setTimeout(() => {
            if (initialAction === 'photo') {
                photoInputRef.current?.click();
            } else if (initialAction === 'video') {
                videoInputRef.current?.click();
            }
        }, 100);
        hasTriggeredRef.current = true;
        return () => clearTimeout(timer);
    }
  }, [initialAction]);

  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
        addMedia(Array.from(e.target.files));
        // Reset input
        e.target.value = '';
    }
  };

  return (
    <div className="flex items-center gap-1">
        <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
        >
            <Bold className="size-4" />
        </Button>
        <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
        >
            <Italic className="size-4" />
        </Button>
        
        <input 
            type="file" 
            ref={photoInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
        />
        <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500 hover:text-black hover:bg-green-50"
            onClick={() => photoInputRef.current?.click()}
        >
            <ImageIcon className="size-4" />
        </Button>

        <input 
            type="file" 
            ref={videoInputRef} 
            className="hidden" 
            accept="video/*" 
            multiple 
            onChange={handleFileChange} 
        />
        <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500 hover:text-black hover:bg-green-50"
            onClick={() => videoInputRef.current?.click()}
        >
            <Video className="size-4" />
        </Button>
    </div>
  );
}
