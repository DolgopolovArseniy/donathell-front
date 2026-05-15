import { LoaderCircle } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      id="loading-overlay"
    >
      <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        <LoaderCircle
          className="animate-spin text-donathell-main"
          size={80}
        />
        <p className="text-donathell-secondary font-medium text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
