import { MessageDto } from '@/types';
import React from 'react'

type Props = {
    message: MessageDto;
    currentUserId: string;
}
export default function MessageBox({message, currentUserId}: Props) {

    const isCurrentUserSender = message.senderId === currentUserId;

  return (
    <div className='grid grid-rows-1'>
        <div className={`${isCurrentUserSender ? "" : ""}`}>

        </div>
    </div>
  )
}
