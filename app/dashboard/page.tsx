"use client";

import AddNewButton from "@/features/dashboard/components/add-new-btn";
import AddRepo from "@/features/dashboard/components/add-repo";
import ProjectTable from "@/features/dashboard/components/project-table";
import { getAllPlaygroundForUser , deleteProjectById ,editProjectById , duplicateProjectById} from "@/features/playground/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <Image src="/empty.png" alt="No projects" width={250} height={250} className="mb-4" />
    <h2 className="text-xl font-semibold text-gray-500">No projects found</h2>
    <p className="text-gray-400">Create a new project to get started!</p>
  </div>
);

const DashboardMainPage = () => {
  const [playgrounds, setPlaygrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      const data = await getAllPlaygroundForUser();
      setPlaygrounds(data || []);
      setLoading(false);
    };
    fetchPlaygrounds();
  }, []);
  if (loading) {
    return (
      <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {!playgrounds || playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
           <ProjectTable
             projects={playgrounds || []}
             onDeleteProject={deleteProjectById}
             onUpdateProject={editProjectById}
             onDuplicateProject={async (id: string) => { await duplicateProjectById(id); }}
           />
        )}
      </div>
    </div>
  );
  };

export default DashboardMainPage;
