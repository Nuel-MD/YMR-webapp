'use client';
import { useComposer } from './ComposerContext';

export function ComposerTitle() {
  const { title, setTitle } = useComposer();
  return (
    <input
      type="text"
      placeholder="Post Title (optional)"
      className="w-full bg-transparent text-xl font-medium placeholder:text-gray-400 text-black border-none focus:outline-none focus:ring-0 px-0 pb-2"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      maxLength={120}
    />
  );
}
