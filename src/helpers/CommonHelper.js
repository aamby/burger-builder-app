class commonHelper{
    static getUniqueNumbers = ()=>{
        const factor = Math.floor(Math.random() * 6) + 1;
        const unumber = new Date().getUTCMilliseconds();
        return (unumber * factor);  
    };

    static isItemExists = (arr, item, checkFromLast)=>{
        if(arr.length===0){
            return -1;
        }
        else{
            if(checkFromLast){
                return arr.lastIndexOf(item);
            }
            else{
                return arr.findIndex(e=>{return e===item;});
            }
        }
    };

    static getItemCount = (arr, item)=>{
        const itemArr = arr.filter(itm=>{return itm===item;});
        return itemArr.length;
    };
}

export default commonHelper;