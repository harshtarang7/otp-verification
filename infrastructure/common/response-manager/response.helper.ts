export interface ApiResponse<T>{
    status:boolean;
    message?:string;
    data?:T;
}

export function SuccessResponse<T>(
    data:T,
    message:string = "Successfully"
):ApiResponse<T>
{
  return{
    status: true,
    message,
    data,
  }
}

export function errorResponse<T>(
    error: unknown,
    message: string = "An error occurred",
    // data?:T
  ): ApiResponse<T> {
    return {
      status: false,
      message,
      data: undefined,
    };
  }