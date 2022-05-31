/**
 * 
 * @typedef {object} Category
 * @property {String} name 
 * @property {String} slug 
 */
/**
 * 
 * @typedef {object} UnparsedNews
 * @property {String} title New's Title
 * @property {String} excerpt New's excerpt
 * @property {String} image New's image url
 * @property {String} url New's url
 * @property {String} date_published New's publish date
 * @property {Array<Category>} categories New's categories
 */
/**
 * 
 * @typedef {object} News
 * @property {String} title New's Title
 * @property {String} excerpt New's excerpt
 * @property {String} image New's image url
 * @property {String} url New's url
 * @property {String} date_published New's publish date
 * @property {Array<Category>} categories New's categories
 */
/**
 * @description Parses the date
 * @param {String} date 
*/
 const parseDate = unparsed_date => {
    const date = unparsed_date.split('T')[0]
    const [year, month, day] = date.split('-')
    const new_date = `${day}-${month}-${year}`
    return new_date
}

/**
 * @description Check if the news has at least one category or not
 * @param {News} news
 */
 const hasCategory = news => {
    return news.categories.length > 0
}

/**
 * @description Parses the news data
 * @param {UnparsedNews} news 
 */
function parseNewsData(news){
    const default_category = 'Todos'
    const parsed_categories = [default_category, ...news.categories.map(categories => categories.name)]
    const parsedNewsData = {
        title: news.title,
        excerpt: news.excerpt,
        image: news.image,
        url: news.url,
        date_published: parseDate(news.date_published),
        categories: hasCategory(news) ? [...parsed_categories] : [default_category]
    }
    return {...parsedNewsData}
}

/**
 * @description Slices the news_list in a array of arrays of the given size
 * @param {Array<News>} news_list 
 * @param {Number} size
 */
function sliceNewsList(news_list, size){
    let temp_array = []
    for (let i = 0; i < news_list.length; i+= size) {
        const chunk = news_list.slice(i, i + size);
        temp_array.push(chunk)
    }
    return temp_array
}

/**
 * @description Concat all the news and return it in one array
 * @param {Array<Array<News>>} sliced_news_list
 * @returns {Array<News>}
 */
function concatNewsList(sliced_news_list){
    let temp_array = []
    sliced_news_list.forEach(news_list => {
        news_list.forEach(news => temp_array.push(news))
    })
    return temp_array
}