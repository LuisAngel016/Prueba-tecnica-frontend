import { projectContainer } from "@/projects/IoC/project.container";
import { graphicsContainer } from "@/graphics/IoC/graphics.container";
import { analysisContainer } from "@/analysis/IoC/analysis.container";

const dependencies = {
  ...projectContainer,
  ...graphicsContainer,
  ...analysisContainer,
};

type DependencyMap = typeof dependencies;
type DependencyKey = keyof DependencyMap;

export const container = {
  resolve<K extends DependencyKey>(name: K): DependencyMap[K] {
    const dep = dependencies[name];
    if (!dep) throw new Error(`Dependency ${String(name)} not found`);
    return dep;
  },
};
