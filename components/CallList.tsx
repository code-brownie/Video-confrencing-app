//@ts-nocheck

'use client'

import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "@/hooks/use-toast";

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
    const { endedCalls, callRecordings, upcomingCalls, isLoading } = useGetCalls();

    const [recordings, setRecording] = useState<CallRecording[]>([]);
    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case 'ended': return endedCalls
            case 'recording': return recordings;
            case 'upcoming': return upcomingCalls;
            default: return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended': return 'No Previous calls'
            case 'recording': return 'No Recording';
            case 'upcoming': return 'No Upcoming Calls';
            default: return '';
        }
    }

    // Logic to fetch the recordings for the meeting

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []);

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings)

                setRecording(recordings);
            } catch (error) {
                toast({ title: 'Try again Later!' })
            }
        };
        if (type === 'recording') fetchRecordings();
    }, [type, callRecordings]);

    const call = getCalls();
    const callMessage = getNoCallsMessage();

    if (isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {
                call && call.length > 0 ? call.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
                        }
                        title={(meeting as Call).state?.custom?.description?.substring(0, 26) || meeting.filename?.substring(0, 20) || 'Personal Meeting'}

                        date={meeting.state?.startsAt?.toLocaleString() || meeting.starts_time?.toLocaleString()}

                        isPreviousMeeting={type === 'ended'}
                        buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recording' ? 'Play' : 'start'}
                        handleClick={type === 'recording' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                        link={type === 'recording' ? meeting.url : `${process.env.NEXT_PUBLIC_URL}/meeting/${meeting.id}`}
                    />
                )) : (
                    <h1>{callMessage}</h1>
                )
            }

        </div>
    )
}

export default CallList