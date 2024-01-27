'use client';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import axios from 'axios';
import { File, Loader2, Pencil, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Attachment, Course } from '@prisma/client';
import { cn } from '@/lib/utils';

import FileUpload from '@/components/file-upload';

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing((pre) => !pre);
  };
  const onDelete = async (attachmentId: string) => {
    try {
      setDeletingId(attachmentId);
      await axios.delete(`/api/courses/${courseId}/attachment/${attachmentId}`);
      toast.success('Attachment deleted');
      setDeletingId('');

      toggleEdit();
      router.refresh();
    } catch (error) {
      setDeletingId('');

      toast.error('Something went wrong!');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values);
      toast.success('Attachement created');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className='mt-6 bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course image
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancle</>}
          {!isEditing && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an attachment
            </>
          )}
        </Button>
      </div>

      {initialData.attachments?.length === 0 && (
        <p className='text-sm mt-2 text-slate-500 italic'>No attachments yet</p>
      )}

      {!isEditing && initialData.attachments?.length > 0 && (
        <>
          {initialData.attachments?.map((attachment) => (
            <div
              key={attachment.id}
              className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'
            >
              <File className='h-4 w-4 mr-2 flex-shrink-0' />
              <p className='text-xs line-clamp-1'>{attachment.name}</p>
              {deletingId === attachment.id && (
                <div>
                  <Loader2 className='h-4 w-4 animate-spin' />
                </div>
              )}
              {deletingId !== attachment.id && (
                <button
                  onClick={() => onDelete(attachment.id)}
                  className='ml-auto hover:opacity-75 transition'
                >
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>
          ))}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint='courseAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            16:9 aspect ratio recommend
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
