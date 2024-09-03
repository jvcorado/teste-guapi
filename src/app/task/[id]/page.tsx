'use client';
import Input from '@/app/components/input/input';
import InputDesk from '@/app/components/inputDesk/inputDesk';
import Loader from '@/app/components/loader/loader';
import { Modal } from '@/app/components/modal/modal';
import { ModalCrud } from '@/app/components/modalCrud/modal';
import New from '@/app/components/new/new';
import { Avatar } from '@material-tailwind/react';
import { AlignVerticalSpaceAround, CalendarDays, ChevronLeft, EllipsisVertical, FileText, Flag, Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Subtask {
    id: number;
    subtarefa: string;
}

interface Task {
    id: number;
    title: string;
    tarefa: string;
    data?: string;
    prioridade?: string;
    etiqueta?: string;
    subtarefa?: Subtask[];
}

interface Section {
    id: number;
    secao: string;
    tarefas: Task[];
}

interface Projects {
    id: number;
    projects: string;
    secoes: Section[];
}

const TaskDetails = () => {
    const router = useRouter();
    const { id } = useParams();
    const [openSection, setOpenSection] = useState(false);
    const [openTaskDesk, setOpenTaskDesk] = useState<boolean | any>(null);
    const [openSectionDesk, setOpenSectionDesk] = useState(false);
    const [section, setSection] = useState('');
    const [projects, setProjects] = useState<Projects | null>(null);
    const [task, setTask] = useState('');
    const [titleTask, setTitleTask] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Section[] | any>(null);
    const divRef = useRef(null);

    useEffect(() => {
        if (id) {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                const projects: Projects[] = JSON.parse(storedProjects);
                const foundProjects = projects.find((p) => p.id === Number(id));
                setProjects(foundProjects || null);
            }
        }
    }, [id]);

    const fetchProjects = async () => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const projects: Projects[] = JSON.parse(storedProjects);
            const foundProjects = projects.find((p) => p.id === Number(id));
            setProjects(foundProjects || null);
        }
        return null;
    };

    const handleAddTask = (secao: number) => {
        setOpenTaskDesk((prev: number) => (prev === secao ? null : secao));

        if (task != '' || titleTask != '') {
            if (id && secao) {
                const storedProjects = localStorage.getItem('projects');
                if (storedProjects) {
                    let projects: Projects[] = JSON.parse(storedProjects);
                    const projectsIndex = projects.findIndex((p) => p.id === Number(id));
                    if (projectsIndex !== -1) {
                        const existingProjects = projects[projectsIndex];
                        const sectionIndex = existingProjects.secoes?.findIndex((section) => section.id === Number(secao));
                        if (sectionIndex !== -1 && existingProjects.secoes) {
                            const existingSection = existingProjects.secoes[sectionIndex ?? 0];
                            const newTarefa: Task = {
                                id: Date.now(),
                                title: titleTask,
                                tarefa: task,
                            };

                            if (!existingSection.tarefas) {
                                existingSection.tarefas = [];
                            }
                            existingSection.tarefas.push(newTarefa);
                            localStorage.setItem('projects', JSON.stringify(projects));
                            setTask('');
                            setTitleTask('');
                            fetchProjects();
                        }
                    }
                }
            }
        }
    };

    const handleAddSection = () => {
        if (id) {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                let projects: Projects[] = JSON.parse(storedProjects);
                const projectIndex = projects.findIndex((p) => p.id === Number(id));
                if (projectIndex !== -1) {
                    const existingProjects = projects[projectIndex];
                    const newSection: Section = {
                        id: Date.now(),
                        secao: section.toUpperCase(),
                        tarefas: [],
                    };

                    if (!existingProjects.secoes) {
                        existingProjects.secoes = [];
                    }

                    existingProjects.secoes.push(newSection);

                    localStorage.setItem('projects', JSON.stringify(projects));
                    setProjects(existingProjects);
                    setOpenSection(false);
                }
            }
        }
    };

    const createSection = () => {
        return (
            <>
                <Modal open={openSection} create={handleAddSection} title="Nova seção" cancel={() => setOpenSection(!openSection)}>
                    <strong className="text-[#444648] text-sm">Nome</strong>
                    <Input onChange={(e) => setSection(e.target.value)} />
                </Modal>
            </>
        );
    };

    const createSectionDesktop = () => {
        return (
            <InputDesk
                placeholder="Digite a seção..."
                cancel={() => setOpenSectionDesk(!openSectionDesk)}
                create={() => {
                    handleAddSection();
                    setOpenSectionDesk(false);
                }}
                onChange={(e) => setSection(e.target.value)}
            />
        );
    };

    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const modalTaskDesk = (title: string, subtitle?: string, children?: React.ReactNode) => {
        return (
            <Modal
                title={title}
                subtitle={subtitle}
                open={openModal}
                cancel={() => setOpenModal(false)}
                create={function (): void {
                    throw new Error('Function not implemented.');
                }}
            >
                {children}
            </Modal>
        );
    };

    const createTarefaDesktop = (secao: number) => {
        return (
            <div className="border-2 border-[#7C00BE] p-2 rounded-md">
                <div key={secao} className=" flex flex-col gap-[10px]">
                    <Input onChange={(e) => setTitleTask(e.target.value)} placeholder="Título" noBorder />
                    <Input onChange={(e) => setTask(e.target.value)} placeholder="Descrição" noBorder />
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                handleAddTask(secao);
                                setOpenTaskDesk(false);
                            }}
                            className="bg-[#7C00BE] w-20 h-8 text-white text-xs font-normal rounded"
                        >
                            Adicionar
                        </button>
                        <button
                            onClick={() => {
                                setOpenTaskDesk(!openTaskDesk);
                                setTask('');
                                setTitleTask('');
                            }}
                            className="text-[#656565] text-xs font-normal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderMobile = () => {
        return (
            <>
                <div className="flex flex-col gap-5">
                    {projects?.secoes
                        ? projects?.secoes.map((item) => (
                              <Link href={`${id}/${item.id}`} key={item.id} className=" flex items-center gap-2 py-[5px]  rounded-md justify-between">
                                  <p className="text-sm uppercase flex items-center gap-2 font-semibold ">
                                      <FileText color="#444648" size={24} /> {item.secao}
                                  </p>
                              </Link>
                          ))
                        : null}
                    <New open={() => setOpenSection(!openSection)} section />
                    {openSection && createSection()}
                </div>
            </>
        );
    };

    const renderDesktop = () => {
        return (
            <div className="gap-5 flex items-start overflow-x-auto scroll-transparent">
                {projects?.secoes
                    ? projects.secoes.map((item) => (
                          <div key={item.id} className="flex flex-col min-w-[25%] gap-5">
                              <div className="flex items-center justify-between gap-2 pt-3 min-w-[25%]">
                                  <p className="text-sm uppercase mx-auto flex items-center gap-2 font-semibold">{item.secao}</p>
                                  <EllipsisVertical size={24} color="#444648" className="" />
                              </div>
                              <div className="scroll-transparent overflow-y-auto max-h-[47vh]" ref={divRef}>
                                  {item.tarefas.map((task) => (
                                      <div onClick={() => handleTaskClick(task)} key={task.id} className="mt-2 shadow-sm cursor-pointer border rounded-md flex flex-col gap-3 p-2">
                                          <div>
                                              <p className="font-semibold">{task.title}</p>
                                              <p className="border-b">{task.tarefa}</p>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <CalendarDays size={16} color="#444648" className="border rounded flex items-center justify-center w-[24px] p-[3px] h-[24px]" />
                                              <Flag size={16} color="#444648" className="border rounded flex items-center justify-center w-[24px] p-[3px] h-[24px]" />
                                              <Tag size={16} color="#444648" className="border rounded flex items-center justify-center w-[24px] p-[3px] h-[24px]" />
                                          </div>
                                      </div>
                                  ))}
                                  {openModal &&
                                      selectedTask &&
                                      modalTaskDesk(
                                          projects.projects,
                                          selectedTask.title,
                                          <div className="flex flex-col gap-3">
                                              <div className="flex items-center">
                                                  <input type="checkbox" name="" id="" />
                                                  <h1 className="font-semibold">{selectedTask.title}</h1>
                                              </div>

                                              <p>{selectedTask.tarefa}</p>
                                              <New open={() => {}} subtarefa />
                                              <hr className="border " />
                                              <div className="flex gap-3 items-center">
                                                  <Avatar size="sm" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                                  <Input onChange={() => {}} placeholder="Comentar" />
                                              </div>
                                          </div>,
                                      )}
                              </div>

                              {openTaskDesk !== item.id && <New open={() => setOpenTaskDesk(item.id)} />}
                              {openTaskDesk === item.id && <div>{createTarefaDesktop(item.id)}</div>}
                          </div>
                      ))
                    : null}

                <div className="min-w-[25%]">
                    {!openSectionDesk && <New open={() => setOpenSectionDesk(!openSectionDesk)} section />}
                    {openSectionDesk && createSectionDesktop()}
                </div>
            </div>
        );
    };

    if (!projects)
        return (
            <>
                <Loader />
            </>
        );

    return (
        <>
            <div className="flex flex-col gap-3 lg:bg-white  lg:min-h-full lg:px-5 lg:pt-5 lg:rounded-md lg:border-2">
                <div className="border-b w-full flex pb-2 lg:pb-4 items-center ">
                    <button onClick={router.back} className="">
                        <ChevronLeft size={24} color="#444648" />
                    </button>
                    <h1 className="mx-auto uppercase  text-base font-semibold text-center ">{projects.projects}</h1>
                </div>
                <div className="lg:!min-h-[79vh] hidden md:block">{renderDesktop()}</div>
                <div className="block md:hidden">{renderMobile()}</div>
            </div>
        </>
    );
};

export default TaskDetails;
function setSelectedTask(task: any) {
    throw new Error('Function not implemented.');
}
