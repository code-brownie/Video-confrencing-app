import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
  // usestate for maintaing the mic and camera state
  const [isMicCamOn, setIsMicCamOn] = useState(false);

  // Get the call feature from the stream
  const call = useCall();

  // check if the call is valid  or not
  if (!call) {
    throw new Error('Use call must be used within streamCall component')
  }

  // Hooks for call and microphone access
  useEffect(() => {
    if (isMicCamOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamOn, call?.camera, call?.microphone]);

  // Method for rendering the Camera settings and the device setting for the video call
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input
            type='checkbox'
            checked={isMicCamOn}
            onChange={(e) => setIsMicCamOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button className='rounded-md px-4 py-2.5 bg-green-500' onClick={() => {
        call.join()
        setIsSetupComplete(true);
      }}>Join Meeting</Button>

    </div>
  )
}

export default MeetingSetup
