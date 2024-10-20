import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayout = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  // state for the Layout management

  const router = useRouter();
  const [layout, setLayout] = useState<CallLayout>('speaker-left');
  // sidebar to show all the participants
  const [showParticipant, setshowParticipant] = useState(false);
  // Check wheather room is personal or not
  const searchParams = useSearchParams();
  const isPersonalRoom = searchParams.get('personal');

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState != CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout
          participantsBarPosition='left' />
      default:
        return <SpeakerLayout
          participantsBarPosition='right' />

    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] ml-2', {
          'hidden': showParticipant,
        })}>
          <CallParticipantsList onClose={() => setshowParticipant(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls onLeave={() => router.push('/')} />
        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20}
                className='text-white'
              />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 text-white bg-dark-1'>
            {['Grid', 'Speaker-left', 'Speaker-right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayout)
                  }}>
                  {item}
                </DropdownMenuItem>
              </div>
            ))}

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setshowParticipant((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>

    </section>
  )
}

export default MeetingRoom
