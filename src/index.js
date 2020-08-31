let baseUrl = "http://localhost:3000/quotes/"

let withLikesUrl = "http://localhost:3000/quotes?_embed=likes"

let ul = document.getElementById('quote-list')

fetchQuotes()

function fetchQuotes(){
fetch(withLikesUrl)
.then(res => res.json())
.then(quoteArray => showQuotes(quoteArray))
}

function showQuotes(a){
    a.forEach(quote => createQuoteCard(quote))
}

function createQuoteCard(quote){
    const li = document.createElement('li')
    li.className = ('quote-card')

    const blockquote = document.createElement('blockquote')
    blockquote.className = ('blockquote')

    const p = document.createElement('p')
    p.className = ('mb-0')
    p.innerText = quote.quote

    const footer = document.createElement('footer')
    footer.className = ('blockquote-footer')
    footer.innerText = quote.author

    const likesBtn = document.createElement('button')
    likesBtn.className = ('btn-success')
    likesBtn.innerHTML = `Likes: <span>${quote.likes.length}</span>`

    const delBtn = document.createElement('button')
    delBtn.className = ('btn-danger')
    delBtn.innerText = 'Delete'

    const br = document.createElement('br')

    li.append(blockquote)

    blockquote.append(p, footer, br, likesBtn, delBtn)

    ul.append(li)

    likesBtn.addEventListener('click', () => {

       let configObj = {
        method: 'Post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify ({
            'quoteId': quote.id,
        })
       }
       
       fetch('http://localhost:3000/likes', configObj)
       .then(res => res.json())
       .then(like => {
           quote.likes.push(like)
            likesBtn.innerHTML = `Likes: <span>${quote.likes.length}</span>`
       })


    })

    delBtn.addEventListener('click', () => {
        let configObj = {
        method: 'delete'
        }

        fetch(baseUrl+ quote.id, configObj)
        li.remove()

    })

};

let form = document.querySelector('form#new-quote-form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let quote = document.getElementById('new-quote').value
    let author = document.getElementById('author').value

    let configObj = {
        method: 'Post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         quote: quote,
         author: author   
        })
    }

    fetch(baseUrl, configObj)
    .then(res => res.json)
    .then(() => fetchQuotes())

    form.reset();
});


