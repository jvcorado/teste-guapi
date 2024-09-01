"use client";
import Input from "@/app/components/input/input";
import { Modal } from "@/app/components/modal/modal";
import New from "@/app/components/new/new";
import { ChevronLeft, EllipsisVertical, FileText } from "lucide-react";
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

const SubTarefasDetails = () => {
  const router = useRouter();
  const { id, secao, tarefa } = useParams();
  const [openSubtarefa, setOpenSubTask] = useState(false);
  const [tasks, setTasks] = useState("");
  const [text, setText] = useState("");
  const [task, setTask] = useState<Task | null>(null);
  const [filteredTarefa, setFilteredTarefa] = useState<Task | null>(null);

  useEffect(() => {
    if (id && secao && tarefa) {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const projects: Projects[] = JSON.parse(storedProjects);
        const foundProjects = projects.find((p) => p.id === Number(id));

        if (foundProjects) {
          const foundSection = foundProjects.secoes?.find(
            (section) => section.id === Number(secao)
          );

          if (foundSection) {
            const foundTask = foundSection.tarefas?.find(
              (t) => t.id === Number(tarefa)
            );

            if (foundTask) {
              setFilteredTarefa(foundTask);
              setTasks(foundTask.tarefa);
            }
          }
        } else {
          setTask(null);
          setFilteredTarefa(null);
          setTasks("");
        }
      }
    }
  }, [id, secao, tarefa]);

  const handleDelete = () => {
    if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        let tasks: Task[] = JSON.parse(storedTasks);
        tasks = tasks.filter((task) => task.id !== Number(id));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        router.push("/");
      }
    }
  };

  const handleAddSubTarefa = () => {
    if (id && secao && tarefa) {
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

            if (!existingSection.tarefas) {
              existingSection.tarefas = [];
            }

            const taskIndexSection = existingSection.tarefas.findIndex(
              (t) => t.id === Number(tarefa)
            );

            if (taskIndexSection !== -1) {
              if (!existingSection.tarefas[taskIndexSection].subtarefa) {
                existingSection.tarefas[taskIndexSection].subtarefa = [];
              }

              existingSection.tarefas[taskIndexSection].subtarefa.push({
                id: Date.now(), // Or another unique identifier
                subtarefa: text,
              });

              localStorage.setItem("projects", JSON.stringify(projects));
              setFilteredTarefa(existingSection.tarefas[taskIndexSection]);
              setOpenSubTask(false);
              setText("");
            } else {
              console.error("Tarefa não encontrada na seção especificada.");
            }
          } else {
            console.error("Seção não encontrada.");
          }
        } else {
          console.error("Task não encontrada.");
        }
      }
    }
  };

  const createSubTarefa = () => (
    <Modal
      open={openSubtarefa}
      create={handleAddSubTarefa}
      title="Nova Subtarefa"
      cancel={() => setOpenSubTask(!openSubtarefa)}
    >
      <strong className="text-[#444648] text-sm">Nome da Subtarefa</strong>
      <Input onChange={(e) => setText(e.target.value)} />
    </Modal>
  );

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="border-b w-full flex pb-2 items-center">
          <button onClick={router.back} className="">
            <ChevronLeft size={24} color="#444648" />
          </button>
          <h1 className="mx-auto text-base font-semibold uppercase text-center">
            {tasks}
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {filteredTarefa?.subtarefa?.map((item) => (
            <div
              key={item.id}
              className="  flex items-center gap-2 py-[5px]  rounded-md justify-between"
            >
              <p className="text-sm flex items-center gap-2 uppercase font-semibold ">
                <FileText size={24} />
                {item.subtarefa}
              </p>
              <EllipsisVertical size={24} color="#444648" />
            </div>
          ))}
        </div>

        <New open={() => setOpenSubTask(!openSubtarefa)} subtarefa />
      </div>
      {openSubtarefa && createSubTarefa()}
    </>
  );
};

export default SubTarefasDetails;
