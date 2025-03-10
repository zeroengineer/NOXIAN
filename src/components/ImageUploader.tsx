
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsLoading(true);
      await onUpload(file);
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-up">
      <div
        {...getRootProps()}
        className={cn(
          "dropzone border-white/10 bg-secondary/50 backdrop-blur-sm",
          isDragActive && "border-primary bg-secondary/80",
          "cursor-pointer hover:bg-secondary/80 transition-all duration-300"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-primary" />
          <div className="text-center">
            <p className="text-lg font-medium text-white">Drag & drop an image here</p>
            <p className="text-sm text-muted-foreground">or click to select a file</p>
          </div>
        </div>
      </div>

      {preview && (
        <Card className="p-4 result-card bg-secondary/50 backdrop-blur-sm border-white/10">
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-background/50">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain hover:opacity-90 transition-opacity"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Image Preview
                </span>
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUploader;
