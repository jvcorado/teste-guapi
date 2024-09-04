'use client';

import { useEffect, useState, useRef } from 'react';
import New from './components/new/new';
import Search from './components/search/search';
import { Modal } from './components/modal/modal';
import Input from './components/input/input';
import FirstCreate from '../../public/firstCreate.svg';
import NotItem from '../../public/notItem.svg';
import Image from 'next/image';
import Link from 'next/link';
import { EllipsisVertical, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Projects {
    id: number;
    projects: string;
}

export default function Home() {
    const [openProject, setOpenProject] = useState(false);
    const [openProjectDesk, setOpenProjectDesk] = useState(false);
    const [text, setText] = useState('');
    const [project, setProject] = useState<Projects[]>([]);
    const [editData, setEditData] = useState<Projects[]>([]);
    const [searchText, setSearchText] = useState('');

    const router = useRouter();

    useEffect(() => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            setProject(JSON.parse(storedProjects));
        }
    }, []);

    const fetchProjects = async () => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const projects: Projects[] = JSON.parse(storedProjects);
            setProject(projects);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                let projects: Projects[] = JSON.parse(storedProjects);
                projects = projects.filter((p) => p.id !== Number(id));
                localStorage.setItem('projects', JSON.stringify(projects));
                router.push('/');
                fetchProjects();
            }
        }
    };
    /* 
    const handleEdit = (id: number) => {
        // Abre o modal para edição
        setOpenProjectDesk(true);

        // Obtém os projetos armazenados no localStorage
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            let projects: Projects[] = JSON.parse(storedProjects);
            const projectIndex = projects.findIndex((p) => p.id === id);

            if (projectIndex !== -1) {
                // Preenche o estado com os dados do projeto selecionado
                setEditData([projects[projectIndex]]);
                setText(projects[projectIndex].projects); // Preenche o formulário com o valor atual do projeto

                // Escuta a mudança de `text` para salvar a alteração
                const handleSave = () => {
                    // Atualiza o projeto com o novo valor de `text`
                    projects[projectIndex] = { ...projects[projectIndex], projects: text };

                    // Salva os projetos atualizados no localStorage
                    localStorage.setItem('projects', JSON.stringify(projects));

                    // Recarrega os projetos
                    fetchProjects();

                    // Fecha o modal
                    setOpenProjectDesk(false);

                    // Remove o evento de escuta
                    window.removeEventListener('beforeunload', handleSave);
                };

                // Adiciona um evento para salvar as alterações quando o usuário tentar sair ou salvar
                window.addEventListener('beforeunload', handleSave);
            }
        }
    }; */

    const addProject = () => {
        if (text.trim() === '') return;

        const newProject: Projects = {
            id: Date.now(),
            projects: text.toUpperCase(),
        };

        const newProjects = [...project, newProject];
        setProject(newProjects);
        localStorage.setItem('projects', JSON.stringify(newProjects));
        setText('');
        setOpenProject(false);
    };

    const createProject = () => {
        return (
            <Modal open={openProject} create={() => addProject()} cancel={() => setOpenProject(!openProject)}>
                <strong className="text-[#444648] text-sm">Nome</strong>
                <Input onChange={(e) => setText(e.target.value)} />
            </Modal>
        );
    };

    const addProjectDesk = () => {
        if (text.trim() === '') return;

        const newProject: Projects = {
            id: Date.now(),
            projects: text.toUpperCase(),
        };

        const newProjects = [...project, newProject];
        setProject(newProjects);
        localStorage.setItem('projects', JSON.stringify(newProjects));
        setText('');
        router.push(`task/${newProject.id}`); // Use o ID do novo projeto aqui
        setOpenProjectDesk(false);
    };

    const createProjectDesk = () => {
        return (
            <Modal
                open={openProjectDesk}
                create={() => addProjectDesk()}
                cancel={() => {
                    setOpenProjectDesk(!openProjectDesk), setText('');
                }}
            >
                <strong className="text-[#444648] text-sm">Nome</strong>
                <Input value={editData ? text : ''} onChange={(e) => setText(e.target.value)} />
            </Modal>
        );
    };

    const filteredProject = project.filter((project) => project?.projects?.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <main className="flex flex-col gap-3 h-full overflow-y-hidden ">
                <div className="flex gap-2 md:hidden  w-full justify-between">
                    <Search onSearch={setSearchText} />
                    <New open={() => setOpenProject(!openProject)} sm />
                </div>
                <div className="md:flex gap-2 hidden w-full justify-between">
                    <Search onSearch={setSearchText} />
                    <New open={() => setOpenProjectDesk(!openProjectDesk)} sm />
                </div>

                {filteredProject.length === 0 ? (
                    <div className="flex flex-col justify-between h-[70vh]  gap-3">
                        <Image src={FirstCreate} alt="No tasks image" width={250} height={250} className="self-end pr-4" priority />
                        <Image src={NotItem} alt="No tasks image" width={300} height={300} className="self-center pt-10" priority />
                    </div>
                ) : (
                    filteredProject.map((item) => (
                        <>
                            <div className="flex items-center justify-between">
                                <Link
                                    className=" text-[#444648]  flex items-center font-semibold justify-between gap-2  py-[5px]  rounded-md"
                                    href={`/task/${item.id}`}
                                    key={item.id}
                                >
                                    <div className="flex gap-2 items-center">
                                        <FolderOpen size={24} color="#444648" />
                                        <p> {item.projects}</p>
                                    </div>
                                </Link>
                                <EllipsisVertical size={24} color="#444648" className="cursor-pointer" onClick={() => handleDelete(item.id)} />
                                {/*    <EllipsisVertical size={24} color="#444648" className="cursor-pointer" onClick={() => handleEdit(item.id)} /> */}
                            </div>
                        </>
                    ))
                )}
            </main>
            <div className="block md:hidden">{openProject && createProject()}</div>
            <div className="md:block hidden">{openProjectDesk && createProjectDesk()}</div>
        </>
    );
}
