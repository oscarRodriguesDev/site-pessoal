

interface Props{
    url_api:string;
}

export async function getData({url_api}:Props){
 try{
    const response = await fetch(url_api)
    return response.json()
 }catch(err){
    return err
 }
}