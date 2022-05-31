// Limit for pagination
const limit = 6
let current_page = 1

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
 * @description Render categories list on screen
 * @param {Array<String>} categories 
 */
function renderCategories(categories){
    const list = document.querySelector('.category-list')
    categories.forEach(category => {
        const last_item = categories.indexOf(category) == (categories.length - 1)
        const li_category = `<li>${category}</li>`
        const li_separator = last_item ? '' : '<li separator>|</li>'
        const has_category = list.innerHTML.includes(li_category)
        if (!has_category){
            list.innerHTML = list.innerHTML + li_category + li_separator
        }
    })
    //convert from NodeListOf to Array and remove unwanted values
    const li = [...document.querySelectorAll('.category-list li')].filter(item => {
        if(item.innerHTML != '|'){
            return item
        }
    })
    li.forEach(item => {
        item.onclick = () => {
            current_page = 1
            global_variables.filter = item.innerHTML
            let temp_array = concatNewsList(global_variables.news)
            const filter = news_list => {
                const filtered_news_list = [...news_list].filter(news => {
                    if(news.categories.includes(global_variables.filter))
                        return news
                    }
                )
                return filtered_news_list
            }
            const filtered_array = filter(temp_array)
            const filtered_news_list = sliceNewsList(filtered_array, 6)
            renderNews(filtered_news_list)
        }
    })
}


/**
 * @description Render news on screen
 * @param {Array<News>} news_list List of news
 * @param {Number} offset Offset for pagination
 */
function renderNews(news_list){
    const main_content = document.getElementById('main-content')
    main_content.innerHTML = ''
    for(let i = 0; i < limit; i++){
        if(news_list[current_page - 1][i]){
            const news = news_list[current_page - 1][i]
            main_content.innerHTML = main_content.innerHTML + newsTemplate(news)  
        }
    }
    const length = concatNewsList(news_list).length
    renderPagination(length)
    const content_categories = [...document.querySelectorAll('.news-container .news-categories span')]
    content_categories.forEach(item => {
        item.onclick = () => {
            current_page = 1
            global_variables.filter = item.innerHTML
            let temp_array = concatNewsList(global_variables.news)
            const filter = news_list => {
                const filtered_news_list = [...news_list].filter(news => {
                    if(news.categories.includes(global_variables.filter))
                        return news
                    }
                )
                return filtered_news_list
            }
            const filtered_array = filter(temp_array)
            const filtered_news_list = sliceNewsList(filtered_array, 6)
            renderNews(filtered_news_list)
        }
    })
}

/**
 * @description Renders pagination on screen
 * @param {Number} length
 */
function renderPagination(length){
    const pagination = document.getElementById('pagination')
    pagination.innerHTML = ''
    const total = () => {
        let [result, remainder ] = (length / limit).toString().split('.')
        if(remainder){
            result++
        }
        return parseInt(result)
    } 
    const total_pags = total()
    for(let i = 1; i < total_pags + 1; i++){
        pagination.innerHTML = pagination.innerHTML + paginationTemplate(i)
    }
    const pag_items = document.querySelectorAll('.pag-item')
    pag_items.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
            const target_page = parseInt(event.target.innerHTML)
            current_page = target_page
            renderNews(global_variables.news)
        })
    })
}