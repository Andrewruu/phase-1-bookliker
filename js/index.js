document.addEventListener("DOMContentLoaded", function() {
    getBooks()

});

function renderBooks(books){
    const bookList = document.querySelector('#list')
    const li = document.createElement('li')
    const btn = document.createElement('button')
    const ul = document.createElement('ul')
    if (books.users.findIndex(obj => obj.id === 1) < 0){
        btn.innerHTML = 'Like'
    }else{
        btn.innerHTML = 'Unlike'
    }
    
    btn.addEventListener('click', function ()
    {       
        if (books.users.findIndex(obj => obj.id === 1) < 0){
            books.users.push({
                "id": 1,
                "username": "pouros"
            }) 
            const li = document.createElement('li')
            
            li.innerHTML = `${books.users[books.users.findIndex(obj => obj.id === 1)].username}`
            ul.appendChild(li)
            
            btn.innerHTML = 'Unlike'
        }
        else{
            let removeIndex = books.users.findIndex(obj => obj.id === 1)
            ul.removeChild(ul.children[removeIndex])
            books.users.splice(removeIndex, 1)
            btn.innerHTML = 'Like'

        }
        updateLikes(books)
            

    })

    li.innerHTML =`${books.title}`
    li.addEventListener('click', () =>{
        const bookSum = document.querySelector('#show-panel')
        const div = document.createElement('div')
        ul.innerHTML =''
        bookSum.innerHTML = ''
        div.innerHTML =`
        <img src='${books.img_url}'></img>
        <h1>${books.title}</h1>
        <h2>${books.subtitle}</h2>
        <h3>${books.author}</h3>
        <p>${books.description}</p>
        `
        for (user in books.users)
        {
            const li = document.createElement('li')
            
            li.innerHTML = `${books.users[user].username}`
            ul.appendChild(li)
        }
        

        div.appendChild(ul)
        div.appendChild(btn)
        bookSum.appendChild(div)
    })
    bookList.appendChild(li)
}

function updateLikes(bookObj){
    console.log(bookObj)
    console.log(bookObj.users)
    fetch (`http://localhost:3000/books/${bookObj.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(bookObj)

    })
    .then (res => res.json())

}

function getBooks(){
    fetch('http://localhost:3000/books')
    .then (res => res.json())
    .then (data => data.forEach(books => renderBooks(books)))
}

