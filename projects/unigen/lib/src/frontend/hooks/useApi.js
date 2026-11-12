export function useApi() {
    return {
        fetchData: async () => {
            return { data: 'mock-data' };
        }
    };
}
