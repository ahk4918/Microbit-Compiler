/// <reference types="node" />
export declare function uploadRefs(id: string, repoUrl: string): Promise<void>;
export interface GitObject {
    id: string;
    type: string;
    memsize: number;
    data: Buffer;
    tree?: TreeEntry[];
    commit?: Commit;
}
export interface Commit {
    tree: string;
    parents: string[];
    author: string;
    date: number;
    msg: string;
}
export interface TreeEntry {
    mode: string;
    name: string;
    sha: string;
}
export declare type SMap<T> = {
    [s: string]: T;
};
export declare class Cache<T> {
    cache: SMap<T>;
    size: number;
    get(key: string): T;
    set(key: string, v: T, sz: number): void;
    flush(): void;
}
export declare function splitName(fullname: string): {
    parent: string;
    name: string;
};
