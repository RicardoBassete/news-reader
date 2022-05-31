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
 * @description Template for rendering news
 * @param {News} news_list List of news
 */
 function newsTemplate({...news}) {
    const categories_list = news.categories.map(category => `<span>${category}</span>`)
    let categories_template = ''
    categories_list.forEach(category => {
        categories_template = categories_template + category
    })
    return `
    <div class="news-container">
        <span class="title" onclick="window.open('${news.url}')">${news.title}</span>
        <img src="${news.image}" 
            alt="News Image" onerror="this.src='./assets/image-placeholder.jpg'"
            onclick="window.open('${news.url}')"
        >
        <span class="date">${news.date_published}</span>
        <div class="excerpt">${news.excerpt}</div>
        <div class="news-categories">Categorias:${categories_template}</div>
    </div>
    `
}

/**
 * @description Template for rendering pagination
 * @param {Number} count 
 */
function paginationTemplate(count){
    const active = current_page == count ? 'active' : ''
    return `<a class="pag-item ${active}">${count}</a>`
}

