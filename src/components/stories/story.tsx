import React from 'react'
import Image from 'next/image';

interface Props {
  photoUrl: string;
  displayName: string;
}

const Story = (props: Props) => {
  return (
    <div className='flex items-center flex-col'>
      <Image
        src={props.photoUrl}
        className="rounded-full border-[1px] border-white"
        width={50}
        height={50}
        alt={""}
      />
      <p className="text-center text-sm text-gray-200">{props.displayName}</p>
    </div>
  );
}

export default Story