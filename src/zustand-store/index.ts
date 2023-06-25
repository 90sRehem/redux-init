import { create } from 'zustand';
import { api } from '../lib';

type Play = {
    moduleIndex: number;
    lessonIndex: number;
}

type Lesson = {
    id: string;
    title: string;
    duration: string;
};

type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
};

type Course = {
    modules: Module[];
};

type PlayerState = {
    currentModuleIndex: number;
    currentLessonIndex: number;
    course: Course | null;
    isLoading: boolean;
}

type PlayerActions = {
    play: (play: Play) => void;
    next: () => void;
    loadCourses: () => Promise<void>;
}

type PlayerStore = PlayerState & PlayerActions;

export const useStore = create<PlayerStore>((set, get) => {
    return {
        currentModuleIndex: 0,
        currentLessonIndex: 0,
        course: null,
        isLoading: false,
        play: ({ lessonIndex, moduleIndex }: Play) => {
            set({
                currentModuleIndex: moduleIndex,
                currentLessonIndex: lessonIndex,
            });
        },
        next: () => {
            const nextLessonIndex = get().currentLessonIndex + 1;
            const nextLesson = get().course?.modules[get().currentModuleIndex].lessons[nextLessonIndex];
            if (nextLesson) {
                set({
                    currentLessonIndex: nextLessonIndex,
                });
            }
            else {
                const nextModuleIndex = get().currentModuleIndex + 1;
                const nextModule = get().course?.modules[nextModuleIndex];
                if (nextModule) {
                    set({
                        currentModuleIndex: nextModuleIndex,
                        currentLessonIndex: 0,
                    });
                }
            }
        },
        loadCourses: async () => {
            set({
                isLoading: true,
            });
            const response = await api.get("/courses/1");
            set({
                course: response.data,
                isLoading: false,
            });
        },
    };
});