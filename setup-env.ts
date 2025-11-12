export const getAppBaseUrl = ()=>{
    if(process.env.NODE_ENV === 'development'){
        return 'http://localhost:3000'
    }else if(process.env.NODE_ENV === 'production'){
        return 'https://docuchat.com'
    }
}