/**
 * 
 * @typedef {object} News
 * @property {String} title New's Title
 * @property {String} excerpt New's excerpt
 * @property {String} image New's image url
 * @property {String} url New's url
 * @property {String} date_published New's publish date
 * @property {Array<String>} categories New's categories
 */



/**
 * 
 * @param {Array<Array<News>>} news_list 
 * @param {String} category 
 */
function filderByCategory(sliced_news_list, category='Todos'){
    const news_list = concatNewsList(sliced_news_list)
    let filtered_news_list = []
    news_list.forEach(news => {
        const has_category = news.categories.includes(category)
        if(has_category){
            filtered_news_list.push(news)
        }
    })
    return filtered_news_list
}