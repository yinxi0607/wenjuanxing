import axios, {ResDataType} from "./ajax.ts";


// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    const data = (await axios.get(url)) as ResDataType;
    // const proxyUrl = url.replace("/api", ""); // 将请求路径中的 "/api" 替换为空字符串
    // const data = (await axios.get(proxyUrl)) as ResDataType;
    return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
    const url = `/api/question`;
    const data = (await axios.post(url)) as ResDataType;
    return data
}