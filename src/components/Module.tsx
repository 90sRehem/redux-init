import { ChevronDown } from 'lucide-react'
import * as Collapsible from "@radix-ui/react-collapsible";

import { Lesson } from './Lesson'
import { useAppDispatch, useAppSelector } from '../store';
import { play } from '../store/slices/player.slice';

type ModuleProps = {
    title: string;
    amoutOfLessons: number;
    moduleIndex: number;
}

export function Module({
    title,
    amoutOfLessons,
    moduleIndex
}: ModuleProps) {
    const lessons = useAppSelector(state => state.player.course?.modules[moduleIndex].lessons);
    const { currentLessonIndex, currentModuleIndex } = useAppSelector(state => {
        const { currentModuleIndex, currentLessonIndex } = state.player;
        return { currentModuleIndex, currentLessonIndex };
    });
    const dispatch = useAppDispatch();
    return (
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                    {moduleIndex + 1}
                </div>
                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xs text-zinc-400">{amoutOfLessons} aulas</span>
                </div>
                <ChevronDown className="h-4 w-4 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
            </Collapsible.Trigger>

            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">
                    {lessons && lessons.map((lesson, lessonIndex) => {
                        const isCurrent = lessonIndex === currentLessonIndex && moduleIndex === currentModuleIndex;
                        return (
                            <Lesson
                                key={lesson.id}
                                title={lesson.title}
                                duration={lesson.duration}
                                onPlay={() => dispatch(play({ moduleIndex, lessonIndex }))}
                                isCurrent={isCurrent}
                            />
                        )
                    })}
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
