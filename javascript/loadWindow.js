
window.onload = () => {
    //must load this after the window loads

    //ordenation
    const btn_title = document.getElementById('order-by-title')
    const btn_date = document.getElementById('order-by-date')
    btn_title.addEventListener('click', () => {
        current_page = 1
        console.log('order title')
        renderNews(orderByTitle(global_variables.news))
    })

    btn_date.onclick = function() {
        current_page = 1
        console.log('order date')
        renderNews(orderByDate(global_variables.news))
    }

    //search
    const search_bar = document.getElementById('input-search')
    search_bar.addEventListener('keyup', search)

    //reload page
    const title = document.querySelector('header h1.title')
    title.addEventListener('click', () => location.reload())
}