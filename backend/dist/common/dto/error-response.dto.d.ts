export declare class ErrorDetailDto {
    field?: string;
    message: string;
}
export declare class ErrorResponseDto {
    status: number;
    message: string;
    errors: ErrorDetailDto[];
}
