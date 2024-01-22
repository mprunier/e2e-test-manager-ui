import { useMemo, useState } from "react";

interface IStorageItem {
    clear(): void;

    getItem(key: string): string | null;

    setItem(key: string, value: string): void;
}

export class Storage {
    private readonly storageType: IStorageItem;

    public constructor(storageType: IStorageItem) {
        this.storageType = storageType;
    }

    public clear = () => {
        this.storageType.clear();
    };

    public load = <T>(key: string): T => {
        try {
            let serializesState = this.storageType.getItem(key);

            if (!serializesState) {
                serializesState = JSON.stringify({});
            }

            return JSON.parse(serializesState);
        } catch (err) {
            return JSON.parse("");
        }
    };

    public save = <T>(key: string, state: T) => {
        try {
            const serializesState = JSON.stringify(state);
            this.storageType.setItem(key, serializesState);
        } catch (err) {
            return;
        }
    };
}

interface IStorage<T> {
    data: T;

    saveInStorage(value: T): void;

    clearStorage(): void;
}

export const useStorage = <T>(key: string): IStorage<T> => {
    const storage = useMemo(() => new Storage(localStorage), []);
    const [data, setData] = useState<T>(storage.load(key));

    const saveInStorage = (value: T) => {
        storage.save(key, value);
        setData(value);
    };

    const clearStorage = () => {
        storage.clear();
    };

    return { data, clearStorage, saveInStorage };
};
