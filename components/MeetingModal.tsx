import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react"
import { Button } from "./ui/button";
interface MeetingModalTypes {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    image?: string;
    buttonText?: string;
    buttonIcon?: string;
    handleClick?: () => void;
    children?: ReactNode;

}

const MeetingModal = ({ isOpen, onClose, handleClick, title, className, children, buttonText, buttonIcon, image }: MeetingModalTypes) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="image" height={72} width={72} />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt='button icon' height={13} width={12} />
                        )} &nbsp;
                        {buttonText || 'Schedule Meeting'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal