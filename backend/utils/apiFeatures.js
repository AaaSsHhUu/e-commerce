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

    filter(){
        const queryCopy = {...this.queryStr};
        // Remove some fields from category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach( key => delete queryCopy[key] )

        // Filter for Price and Rating
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy); // we have to place $ as a prefix to use $gt and $lt
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        console.log(queryStr);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;