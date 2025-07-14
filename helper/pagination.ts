
interface objectPagination{
    currentPage:number;
    limitPage:number;
    skip?:number;
    totalPage?:number;
}

 export const objectPagination = (objectPagination :objectPagination , query:Record<string,any> , countRecords:number) :objectPagination=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
       }

       if(query.limit){
        objectPagination.limitPage=parseInt(query.limit);
       }
       objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitPage;

       
            const totalPage = (countRecords/objectPagination.limitPage);
            objectPagination.totalPage=Math.ceil(totalPage);
            return objectPagination;

}
 export default objectPagination;

