import { DecentHeading } from "./DecentHeading";
export const Appbar = ({name}) => {
    return <div className="shadow h-14 flex justify-between">
        <DecentHeading label = {"Paytm App"}/> 
    <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
            Hello 
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-normal mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {name[0].toUpperCase()}
            </div>
        </div>
    </div>
    </div>
}