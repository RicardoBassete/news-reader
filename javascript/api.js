let api_sources = [
    "https://jussi-reader.netlify.app/.netlify/functions/news-one",
    "https://jussi-reader.netlify.app/.netlify/functions/news-two"
]

/**
 * @description Reset global_variables
 */
function resetValues(){
    global_variables.news = []
    global_variables.categories = []
    renderCategories()
    renderNews()
}

/**
 * @description Update global_variables.categories with the new categories
 */
function updateCategories(){
    let new_categories = ['Todos']
    global_variables.news.forEach(news => {
        news.categories.forEach(category => {
            if(category) {
                new_categories.push(category)
            }
        })
    })
    //remove diplicated values
    global_variables.categories = [...new Set(new_categories)]
}

/**
 * @description Fetch every news api in the api_sources array
 */
async function getNews(){
    try {
        for(let i = 0; i < api_sources.length; i++){
            const resp = await fetch(api_sources[i])
            const respJson = await resp.json()
            const news_list = await respJson.news
            await news_list.forEach(news => {
                const parsed_news = parseNewsData(news)
                global_variables.news.push(parsed_news)
            })
            updateCategories()
        }
        const filtered_news_list = global_variables.news.filter(news => {
            if(news.categories.includes(global_variables.filter))
                return news
            }
        )
        renderCategories(global_variables.categories)
        // Slice news array for better pagination
        global_variables.news = sliceNewsList(filtered_news_list, 6)
        renderNews(global_variables.news)

    } catch {
        resetValues()
    }
    
}

getNews()