'use client';

import { Drawer, Button } from '@material-tailwind/react';
import { Avatar } from '@material-tailwind/react';
import { ChevronDownIcon, FileText, FolderOpen, MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Search from '../search/search';

import { Collapse, Typography, IconButton, ListItem, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import Link from 'next/link';

interface Section {
    id: number;
    secao: string;
}

interface Projects {
    id: number;
    projects: string;
    secoes: Section[];
}
export function Menus() {
    const [open, setOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [project, setProjects] = useState<Projects[]>([]);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    useEffect(() => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const projects: Projects[] = JSON.parse(storedProjects);
            setProjects(projects);
        }
    }, [open, isMobileMenuOpen]);

    const filteredProjects = project.filter((p) => p?.projects?.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <button onClick={openDrawer}>
                <MenuIcon />
            </button>
            <Drawer open={open} onClose={closeDrawer} className="p-4 flex flex-col gap-3">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                        <Typography variant="small">Nome do Usuário</Typography>
                    </div>

                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </IconButton>
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
                                    className={`hidden h-3 w-3 transition-transform lg:block !self-end${isMenuOpen ? 'rotate-180' : ''}`}
                                />
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    color={`${isMobileMenuOpen ? '#7C00BE' : 'black'}`}
                                    className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180 ' : ''}`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className="hidden max-w-screen-xl bg-yellow-600 rounded-xl lg:block">
                        {filteredProjects.map((item) => (
                            <p key={item.id} className="text-gray-900">
                                {item.projects}
                            </p>
                        ))}
                    </MenuList>
                </Menu>
                <div className="block lg:hidden">
                    <Collapse open={isMobileMenuOpen} className="flex gap-2 flex-col">
                        {' '}
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
                    </Collapse>
                </div>
            </Drawer>
        </>
    );
}
