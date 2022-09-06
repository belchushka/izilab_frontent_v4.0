import {$host} from "@box/app/http";

export async function sendSupportRequest(name: string, phone: string, analysis_list: string, file: File | null): Promise<boolean>{
    try{
        const data = await $host.post("user/request_support", {
            name: name,
            phone: phone,
            message: analysis_list,
            ...(file && {file: file})
        }, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        return true
    }catch (e) {
        return false
    }
}