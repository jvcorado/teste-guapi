"use client";
import Input from "@/app/components/input/input";
import Loader from "@/app/components/loader/loader";
import { Modal } from "@/app/components/modal/modal";
import { ModalCrud } from "@/app/components/modalCrud/modal";
import New from "@/app/components/new/new";
import {
  AlignVerticalSpaceAround,
  ChevronLeft,
  EllipsisVertical,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Section {
  id: number;
  secao: string;
}

interface Project {
  id: number;
  project: string;
  secoes?: Section[];
}

const TaskDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [openSection, setOpenSection] = useState(false);
  const [openSectionDesk, setOpenSectionDesk] = useState(false);
  const [section, setSection] = useState("");
  const [projects, setProjects] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const projects: Project[] = JSON.parse(storedProjects);
        const foundProjects = projects.find((p) => p.id === Number(id));
        setProjects(foundProjects || null);
      }
    }
  }, [id]);

  /*   const handleDelete = () => {
    if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        let tasks: Task[] = JSON.parse(storedTasks);
        tasks = tasks.filter((task) => task.id !== Number(id));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        router.push("/");
      }
    }
  }; */

  const handleAddSection = () => {
    if (id) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        let projects: Project[] = JSON.parse(storedProjects);
        const projectIndex = projects.findIndex((p) => p.id === Number(id));
        if (projectIndex !== -1) {
          const existingProjects = projects[projectIndex];
          const newSection: Section = {
            id: Date.now(),
            secao: section.toUpperCase(),
          };

          if (!existingProjects.secoes) {
            existingProjects.secoes = [];
          }

          existingProjects.secoes.push(newSection);

          localStorage.setItem("projects", JSON.stringify(projects));
          setProjects(existingProjects);
          setOpenSection(false);
        }
      }
    }
  };

  const createSection = () => {
    return (
      <>
        <Modal
          open={openSection}
          create={handleAddSection}
          title="Nova seção"
          cancel={() => setOpenSection(!openSection)}
        >
          <strong className="text-[#444648] text-sm">Nome</strong>
          <Input onChange={(e) => setSection(e.target.value)} />
        </Modal>
      </>
    );
  };

  const createSectionDesktop = () => {
    return (
      <div className="bg-amber-500 flex flex-col">
        <input type="text" placeholder="Text" />
        <button onClick={() => setOpenSectionDesk(!openSectionDesk)}>
          Cancelar
        </button>
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
      <div className="flex flex-col gap-3 lg:bg-white lg:min-h-full lg:p-5 lg:rounded-md">
        <div className="border-b w-full flex pb-2 items-center ">
          <button onClick={router.back} className="">
            <ChevronLeft size={24} color="#444648" />
          </button>
          <h1 className="mx-auto uppercase  text-base font-semibold text-center ">
            {projects.project}
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          {projects.secoes
            ? projects.secoes.map((item) => (
                /*   <div
                  key={item.id}
                  className="flex items-center justify-between "
                > */
                <Link
                  href={`${id}/${item.id}`}
                  key={item.id}
                  className=" flex items-center gap-2 py-[5px]  rounded-md justify-between"
                >
                  <p className="text-sm uppercase flex items-center gap-2 font-semibold ">
                    <FileText color="#444648" size={24} /> {item.secao}
                  </p>
                </Link>

                /*   <ModalCrud
                    cancel={() => setOpen(open)}
                    deletar={() => {}}
                    open={open}
                    update={() => {}}
                  /> */
                /*  </div> */
              ))
            : null}
        </div>

        <div className="block md:hidden">
          <New open={() => setOpenSection(!openSection)} section />
        </div>
        <div className="md:block  hidden bg-red-400 lg:w-[25%]">
          {!openSectionDesk && (
            <New open={() => setOpenSectionDesk(!openSectionDesk)} section />
          )}

          {openSectionDesk && createSectionDesktop()}
        </div>
      </div>

      {openSection && createSection()}
    </>
  );
};

export default TaskDetails;
