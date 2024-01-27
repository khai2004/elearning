import { IconBadge } from '@/components/icon-badge';
import { LucideIcon, icons } from 'lucide-react';

interface InfoCardProps {
  numberOfItems: number;
  variant?: 'default' | 'success';
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div
      className='border rounded-md flex items-center gap-x-2 p-3
    '
    >
      <IconBadge variant={variant} icon={Icon} />

      <div>
        <p className='font-medium'></p>
        <p>
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  );
};
