function findValueByKey(searchKey, data) {
    let defaultValue = null
    if(data){
        const obj = data.find(item => item.key == searchKey)
        if(obj){
            defaultValue = obj.key
        }
    }
  return defaultValue
}

function mapArrayinKeyValue(data){
    const object = {}
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        object[item.key] = item.key 
    }
    return object;
}

export  {
    findValueByKey,
    mapArrayinKeyValue,
}