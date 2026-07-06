export const tokenMiddleware = (store: any) => (next: any) => (action: any) =>{
    // Do something
    return next(action);
};