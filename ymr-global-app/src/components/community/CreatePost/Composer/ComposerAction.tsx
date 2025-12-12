'use client';
import { useComposer } from './ComposerContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ComposerSubmitButton() {
  const { isSubmitting, submit, canSubmit } = useComposer();

  return (
    <Button
      onClick={submit}
      disabled={!canSubmit || isSubmitting}
      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
    >
      {isSubmitting && <Loader2 className="animate-spin mr-2 size-4" />}
      Post
    </Button>
  );
}
