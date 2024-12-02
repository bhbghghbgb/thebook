export interface ApiResponse<T> {
    data?: T;
    message?: string;
    isError?: boolean;
    // Todo: sửa lại theo detal của c#
    detail?: {
        status: number;
        message: string;
        metadata: object;
    };
}