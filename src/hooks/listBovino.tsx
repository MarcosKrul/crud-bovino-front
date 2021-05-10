import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

import Bovino from "../common/Bovino";

interface LoadParams {
    search: string;
    searchByName: boolean;
}

interface ListBovino {
    page: number;
    values: Bovino[];
}

interface ContextData {
    isEmpty: boolean;
    pageCount: number;
    currentPage: number;
    listBovino: ListBovino[];
    
    reset(): void;
    remove(id: string): Promise<void>;
    setCurrentPage(page: number): void;
    load(params: LoadParams): Promise<void>;
}

const ListBovinoContext = createContext<ContextData>({} as ContextData);

export const ListBovinoProvider: React.FC = ({ children }) => {

    const offset: number = 10;
    const [pageCount, setPageCount] = useState<number>(0);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [listBovino, setListBovino] = useState<ListBovino[]>([]);

    const reset = () => { setListBovino([]); }

    const load = async (params: LoadParams) => {

        const exists = listBovino.filter((item: ListBovino) => (
            item.page === currentPage? item : null  
        ));
        if (exists.length !== 0) return;

        const url = "/bovino?" +
            `limite=${offset}&` +
            `page=${currentPage}&` +
            `${params.searchByName? "nome" : "brinco"}=${params.search.replace(' ', '-')}`;
                
        const response = await api.get(url);

        const data: ListBovino[] = [
            ...listBovino, 
            { page: currentPage, values: response.data.list }
        ];

        setListBovino(data);
        data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setPageCount(Math.ceil(response.data.count/offset));
    }

    const remove = async (id: string): Promise<void> => {

        await api.delete(`/bovino/${id}`);

        const isLastPage = listBovino.filter((item: ListBovino) =>
            item.page === pageCount-1 ? item : null
        );

        if (isLastPage[0]?.values?.length === 1) {
            setPageCount(pageCount - 1);
            setCurrentPage(currentPage -1);
            return;
        }

        const url = `/bovino?page=${currentPage}&limite=${offset}`;
        const response = await api.get(url);

        setListBovino([{ page: currentPage, values: response.data.list }]);
        setPageCount(Math.ceil(response.data.count / offset));       
    }

    return (
        <ListBovinoContext.Provider
            value={{ 
                isEmpty,
                pageCount, 
                listBovino,
                currentPage, 
                load,
                reset,
                remove,
                setCurrentPage,
            }}
        >
            {children}
        </ListBovinoContext.Provider>
    );
};

export function useList() {
    const context = useContext(ListBovinoContext);

    if (!context) {
        throw new Error('useList must be used within an ListBovinoProvider');
    }

    return context;
}