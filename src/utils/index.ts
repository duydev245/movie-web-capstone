export const setLocalStorage = <T = any>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T = any>(key: string)=>{
    const value = localStorage.getItem(key);
    if(value) return JSON.parse(value) as T;
    return null;
}