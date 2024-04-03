class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i", // i -> case-insensitive 
            }
        } : {};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    features(){
        const queryCopy = {...this.queryStr};
        // Remove some fields from category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach( key => delete queryCopy[key] )
        this.query = this.query.find(queryCopy);
        return this;
    }
}

module.exports = ApiFeatures;