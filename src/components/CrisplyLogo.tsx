
import React from 'react';
import { ComponentProps } from 'react'; 
import { CircleUser } from 'lucide-react';

type CrisplyLogoProps = {
  size?: ComponentProps<typeof CircleUser>['size'];
};

const CrisplyLogo: React.FC<CrisplyLogoProps> = ({ size = 24 }) => {
  return (
    <div className="flex items-center">
      <span className="bg-blue-600 text-white p-1 rounded-md mr-2 flex items-center justify-center">
        <CircleUser size={size} />
      </span>
      <span className="font-bold">Crisply</span>
    </div>
  );
};

export default CrisplyLogo;
