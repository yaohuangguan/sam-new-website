import { ReactNode } from "react";



export interface ModuleOption {
    name: string;
    route: string;
    icon: string;
}
export interface ModuleOptions extends Array<ModuleOption> { }

export interface INavigationProps {
    children: ReactNode; 
    moduleOptions: ModuleOptions 
}