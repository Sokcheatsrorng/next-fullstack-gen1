
import BlogComponent from "@/components/BlogComponent";
import { Metadata, ResolvingMetadata } from "next";


// define type 
type Props = {
    params: Promise<{id:number}>
}


const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
// fetchData
async function fetchData(params:number){
    const res = await 
    fetch(`${BASE_URL}/${params}`);
    const dataRes = res.json();
    return dataRes;
}

// generateMetadata
export async function generateMetadata(
    {params}:Props, 
    parent: ResolvingMetadata
): Promise<Metadata>{

    const {id} = await params;

    // fetchData 
    const product = await fetchData(id);

    const previousImages = (await parent).openGraph?.images || []; 

    const trimeTitle = product?.title;

    return {
        title: trimeTitle,
        openGraph:{
            images: ['../../../public/static-photo/red-car.png', ...previousImages]
        }
    }
}


export default async function Page({
    params
}:Props){
    const post = await fetchData((await params).id);
    return (
      <BlogComponent 
      key={post.id}
      id={post.id}
      userId={post.userId}
      title={post.title}
      body={post.body}
      />
    )
}