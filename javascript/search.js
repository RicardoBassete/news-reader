/**
 * @description Render categories list on screen
 * @param {KeyboardEvent} event 
 */
async function search(event){
    if(event.key === 'Enter'){
        current_page = 1
        let news_list = concatNewsList(global_variables.news)
        const value = document.getElementById('input-search').value
        const filtered_list = news_list.filter(news => news.title.toLowerCase().includes(value.toLowerCase()))
        renderNews(sliceNewsList(filtered_list, 6))
    }
}