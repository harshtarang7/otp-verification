export interface ApiResponse<T>{
    status:boolean;
    message?:string;
    data?:T;
    error?: any;
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

export function ErrorResponse<T>(
    error: any= null,
    message: string = "An error occurred",
    // data?:T

  ): ApiResponse<T> {
    return {
      status: false,
      message,
      data: undefined,
      error
    };
  }