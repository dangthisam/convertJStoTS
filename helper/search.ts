

interface objectSearch{
    keyword:string,
    regex?:RegExp
}

export const search =(query: Record<string,any> ):objectSearch=>{
    let objectSearch:objectSearch={
        keyword:""
    }

    if (query.keyword) {
      objectSearch.keyword=query.keyword;

      // tìm kiếm không phân biệt hoa thường và chỉ cần có từ trong trang là được 
      //REGEX 
      const regex = new RegExp(objectSearch.keyword, "i");
     objectSearch.regex=regex;
  }
 return  objectSearch;
}

export default search;