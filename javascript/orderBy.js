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
 * @param {Array<News>} news_list 
 * 
 */
function orderByTitle(news_list){
    const ordered_list = concatNewsList([...news_list]).sort((a, b) => a.title < b.title ? -1 : 1)
    return sliceNewsList(ordered_list, 6)
}

/**
 * 
 * @param {Array<News>} news_list 
 */
 function orderByDate(news_list){
    const reverseDate = date => {
        const [day, month, year] = date.split('-')
        return `${year}-${month}-${day}`
    }
    const ordered_list = concatNewsList([...news_list]).sort((a, b) => {
        const getDate = item => {
            const rev_date = reverseDate(item.date_published)
            return new Date(rev_date)
        }
        return getDate(b) - getDate(a)
    })
    return sliceNewsList(ordered_list, 6)
}