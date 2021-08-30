
export const highlighText = (originStr:string, query:string) => {
    const indexStart = originStr.toLowerCase().indexOf(query.toLowerCase());
    if(indexStart === -1) return originStr;

    const beforeStr = originStr.substring(0 , indexStart);
    const middleStr = originStr.substring(beforeStr.length, beforeStr.length +  query.length);
    const afterStr = originStr.substring(beforeStr.length + query.length);

    return beforeStr + "<mark>" + query +"</mark>" + afterStr;
}