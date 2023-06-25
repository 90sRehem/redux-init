import { Loader, MessageCircle } from "lucide-react";
import { Header, Module, Video } from "../components";
import { useAppDispatch, useAppSelector } from "../store";
import { loadCourses, useCurrentLesson } from "../store/slices/player.slice";
import { useEffect } from "react";

export function Player() {
    const modules = useAppSelector(state => state.player.course?.modules);
    const isLoading = useAppSelector(state => state.player.isLoading);
    const { currentLesson } = useCurrentLesson();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentLesson) {
            document.title = `Assistindo ${currentLesson.title}`;
        }

        return () => {
            document.title = 'Rehem - Player';
        }
    }, [currentLesson]);

    useEffect(() => {
        dispatch(loadCourses());

    }, [dispatch]);

    return (
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Header />
                    <button className="flex items-center gap-2 rounded bg-violet-500 py-2 px-3 text-sm font-medium text-white hover:bg-violet-400">
                        <MessageCircle className="h-4 w-4" />
                        Deixar feedback
                    </button>
                </div>
                <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
                    <div className="flex-1">
                        <Video />
                    </div>
                    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader className="h-6 w-6 text-zinc-400 animate-spin" />
                            </div>
                        ) : modules && modules.map((module, moduleIndex) => {
                            return (
                                <Module
                                    key={module.id}
                                    title={module.title}
                                    amoutOfLessons={module.lessons.length}
                                    moduleIndex={moduleIndex}
                                />
                            )
                        })}
                    </aside>
                </main>
            </div>
        </div>
    )
}
