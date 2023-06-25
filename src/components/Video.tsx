import ReactPlayer from "react-player";
import { next, useCurrentLesson } from "../store/slices/player.slice";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export function Video() {
    const { currentLesson } = useCurrentLesson();
    const isLoading = useAppSelector(state => state.player.isLoading);
    const dispatch = useAppDispatch();
    return (
        <div className="w-full bg-zinc-950 aspect-video">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    {/* <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-violet-500"></div> */}
                    <Loader className="h-6 w-6 text-zinc-400 animate-spin" />
                </div>
            ) : (
                <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
                    onEnded={() => dispatch(next())}
                    playing
                />
            )}
        </div>
    )
}
