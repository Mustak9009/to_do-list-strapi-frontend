import {GraphQLClient} from 'graphql-request';

const API_URL = 'http://127.0.0.1:1337/graphql';

export async function dataTunnel(query:string,variable?:Object){
    const graphqlClient = new GraphQLClient(API_URL,{
        headers:{
            authorization:`Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN_PUBLIC}`
        }
    });
    try{
        const data = await graphqlClient.request(query,variable);
        return data;
    }catch(err){
        console.log(err);
        return null;
    }
}