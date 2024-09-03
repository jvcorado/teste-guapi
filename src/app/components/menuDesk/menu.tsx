'use client';

import { Drawer, Button } from '@material-tailwind/react';
import { Avatar } from '@material-tailwind/react';
import { ChevronDownIcon, FileText, FolderOpen, MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Search from '../search/search';

import { Collapse, Typography, ListItem, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import New from '../new/new';
import { Modal } from '../modal/modal';
import Input from '../input/input';
import { useRouter } from 'next/navigation';

interface Projects {
    id: number;
    projects: string;
}

export function MenusDesk() {
    const [open, setOpen] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [project, setProject] = useState<Projects[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Projects[]>([]);
    const [openProjectDesk, setOpenProjectDesk] = useState(false);
    const [text, setText] = useState('');
    const router = useRouter();

    useEffect(() => {
        const filteredProject = project.filter((project) => project?.projects?.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProjects(filteredProject);

        // Atualiza o estado teste para true quando a busca for feita
        if (searchText) {
            setIsMobileMenuOpen(true);
        }
    }, [searchText, project]);

    useEffect(() => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const projects: Projects[] = JSON.parse(storedProjects);
            setProject(projects);
        }
    }, [open, isMobileMenuOpen]);

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
            <Modal open={openProjectDesk} create={() => addProjectDesk()} cancel={() => setOpenProjectDesk(!openProjectDesk)}>
                <strong className="text-[#444648] text-sm">Nome</strong>
                <Input onChange={() => setText(searchText)} />
            </Modal>
        );
    };

    console.log(searchText);

    return (
        <>
            <div className="p-4 flex flex-col gap-3 ">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                        <Typography variant="small">Nome do Usuário</Typography>
                    </div>
                </div>
                <Search onSearch={setSearchText} />
                <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="bottom">
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-medium">
                            <ListItem
                                className={`${isMobileMenuOpen ? '!bg-[#ECD9F5]' : '!bg-transparent'}   flex items-center  justify-between gap-2 py-2  pr-4 font-medium text-sm`}
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                            >
                                <div className={`${isMobileMenuOpen ? 'text-[#7C00BE]' : ''} flex gap-2  items-center`}>
                                    <FolderOpen size={24} /> Meus projetos
                                </div>

                                <ChevronDownIcon
                                    color={`${isMobileMenuOpen ? '#7C00BE' : 'black'}`}
                                    strokeWidth={2.5}
                                    className={`hidden h-3 w-3 transition-transform  !self-end${isMenuOpen ? 'rotate-180' : ''}`}
                                />
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    color={`${isMobileMenuOpen ? '#7C00BE' : 'black'}`}
                                    className={`block h-3 w-3 transition-transform  ${isMobileMenuOpen ? 'rotate-180 ' : ''}`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                </Menu>
                <div className="block">
                    <Collapse open={isMobileMenuOpen} className="flex gap-2 flex-col">
                        {filteredProjects.length === 0 ? (
                            <>
                                <div className="flex  md:hidden w-full">
                                    <New open={() => setOpenProject(!openProject)} section />
                                </div>
                                <div className="md:flex hidden w-full">
                                    <New open={() => setOpenProjectDesk(!openProjectDesk)} section />
                                </div>
                            </>
                        ) : (
                            <>
                                {filteredProjects.map((item) => (
                                    <Link
                                        onClick={() => {
                                            setOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        href={`/task/${item.id}`}
                                        key={item.id}
                                        className="!bg-[#ECD9F5] text-[#7C00BE] flex items-center gap-2 border-s-2 border-s-[#7C00BE] px-[10px] py-[5px] rounded-md"
                                    >
                                        <FileText size={24} /> {item.projects}
                                    </Link>
                                ))}
                            </>
                        )}
                    </Collapse>
                </div>
                <div className="block md:hidden">{openProject && createProject()}</div>
                <div className="md:block hidden">{openProjectDesk && createProjectDesk()}</div>
            </div>
        </>
    );
}
