import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from ".";

const course = {
    id: '1',
    modules: [
        {
            id: '1',
            title: 'Iniciando com React',
            lessons: [
                {
                    id: 'Jai8w6K_GnY',
                    title: 'CSS Modules',
                    duration: '13:45'
                },  
                {   
                    id: 'w-DW4DhDfcw',
                    title: 'Estilização do Post',   
                    duration: '10:05'
                },
            ],
        },
        {
            id: '2',
            title: 'Estrutura da aplicação',
            lessons: [
                {   
                    id: 'gE48FQXRZ_o',
                    title: 'Componente: Comment',
                    duration: '13:45'
                },
                {
                    id: 'Ng_Vk4tBl0g',
                    title: 'Responsividade',
                    duration: '10:05'
                },  
            ],
        },
    ],
};

const initialState = useStore.getState();

describe("Player Slice", () => {
    beforeEach(() => {
        useStore.setState(initialState);
    });
    it("should be able to play", () => {
        const { play } = useStore.getState();
        play({ lessonIndex: 2, moduleIndex: 1 });
        const { currentModuleIndex, currentLessonIndex } = useStore.getState();
        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(2);
    });

    it("should be able to play next", () => {
        useStore.setState({ course });
       
        const { next } = useStore.getState();
       
        useStore.setState({ currentModuleIndex: 0 });
       
        next();

        const { currentModuleIndex, currentLessonIndex } = useStore.getState();
        expect(currentModuleIndex).toEqual(0);
        expect(currentLessonIndex).toEqual(1);
    });

    it("should be able to play jump to next module automatically", () => {
        useStore.setState({ course });
       
        const { next } = useStore.getState();
       
        useStore.setState({ currentModuleIndex: 0, currentLessonIndex: 1 });
       
        next();

        const { currentModuleIndex, currentLessonIndex } = useStore.getState();
        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(0);
    });

    it("should not update state if current lesson is the last one", () => {
        useStore.setState({ course });
       
        const { next } = useStore.getState();
       
        useStore.setState({ currentModuleIndex: 1, currentLessonIndex: 1 });
       
        next();

        const { currentModuleIndex, currentLessonIndex } = useStore.getState();
        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(1);
    });
})
