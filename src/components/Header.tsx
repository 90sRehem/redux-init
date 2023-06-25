import { useAppSelector } from "../store";
import { useCurrentLesson } from "../store/slices/player.slice"

export function Header() {
    const { currentLesson, currentModule } = useCurrentLesson();
    const isLoading = useAppSelector(state => state.player.isLoading);
  
    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col gap-1">    
                <div className="w-72 h-4 bg-zinc-100 rounded"></div>
                <div className="w-52 h-4 bg-zinc-100 rounded"></div>   
            </div>   
        )
    }

    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
            <span className="text-sm text-zinc-400">{currentModule?.title}</span>
        </div>
    )
}
