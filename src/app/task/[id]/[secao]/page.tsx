"use client";
import Input from "@/app/components/input/input";
import { Modal } from "@/app/components/modal/modal";
import New from "@/app/components/new/new";
import { ChevronLeft, EllipsisVertical, FileText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Subtask {
  id: number;
  subtarefa: string;
}

interface Task {
  id: number;
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

const SectionDetails = () => {
  const router = useRouter();
  const { id, secao } = useParams();
  const [openTask, setOpenTask] = useState(false);
  const [text, setText] = useState("");
  const [projects, setProjects] = useState<Projects | null>(null);
  const [filteredSection, setFilteredSection] = useState<Section | null>(null);
  const [sections, setSections] = useState<string | null>("");

  useEffect(() => {
    if (id && secao) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const projects: Projects[] = JSON.parse(storedProjects);
        const foundProjects = projects.find((p) => p.id === Number(id));

        if (foundProjects) {
          const foundSection = foundProjects.secoes?.find(
            (section) => section.id === Number(secao)
          );

          if (foundSection) {
            setProjects({
              ...foundProjects,
              secoes: [foundSection],
            });
            setFilteredSection(foundSection);
            const sections = foundSection.secao;
            setSections(sections);
          } else {
            setProjects(null);
            setFilteredSection(null);
            setSections(null);
          }
        } else {
          setProjects(null);
          setFilteredSection(null);
          setSections(null);
        }
      }
    }
  }, [id, secao]);

  const handleAddTask = () => {
    if (id && secao) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        let projects: Projects[] = JSON.parse(storedProjects);
        const projectsIndex = projects.findIndex((p) => p.id === Number(id));
        if (projectsIndex !== -1) {
          const existingProjects = projects[projectsIndex];
          const sectionIndex = existingProjects.secoes?.findIndex(
            (section) => section.id === Number(secao)
          );
          if (sectionIndex !== -1 && existingProjects.secoes) {
            const existingSection = existingProjects.secoes[sectionIndex ?? 0];
            const newTarefa: Task = {
              id: Date.now(),
              tarefa: text,
            };

            if (!existingSection.tarefas) {
              existingSection.tarefas = [];
            }

            existingSection.tarefas.push(newTarefa);

            localStorage.setItem("projects", JSON.stringify(projects));
            setFilteredSection(existingSection);
            setOpenTask(false);
          }
        }
      }
    }
  };

  const createTask = () => (
    <Modal
      open={openTask}
      create={handleAddTask}
      title="Nova tarefa"
      cancel={() => setOpenTask(!openTask)}
    >
      <strong className="text-[#444648] text-sm">Nome da Tarefa</strong>
      <Input onChange={(e) => setText(e.target.value)} />
    </Modal>
  );

  if (!sections)
    return (
      <p className="w-full min-h-[calc(100vh_-_120px)]  flex items-center justify-center text-base font-semibold">
        Carregando...
      </p>
    );

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="border-b w-full flex pb-2 items-center">
          <button onClick={router.back} className="">
            <ChevronLeft size={24} color="#444648" />
          </button>
          <h1 className="mx-auto text-base font-semibold uppercase text-center">
            {sections}
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          {filteredSection?.tarefas?.map((item) => (
            <Link
              href={`/task/${id}/${secao}/${item.id}`}
              key={item.id}
              className="  flex items-center gap-2 py-[5px]  rounded-md justify-between"
            >
              <p className="text-sm flex items-center gap-2 uppercase font-semibold ">
                <FileText size={24} />
                {item.tarefa}
              </p>
              <EllipsisVertical size={24} color="#444648" />
            </Link>
          ))}
        </div>

        <New open={() => setOpenTask(!openTask)} />
      </div>
      {openTask && createTask()}
    </>
  );
};

export default SectionDetails;
