import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="w-full flex flex-1 justify-center "><Skeleton className="w-[400px] h-[400px] flex justify-center items-center p-10"><span>Please wait 40-50 seconds. The backend is hosted on a free service, so it may take 40-50 seconds.</span></Skeleton></div>
}