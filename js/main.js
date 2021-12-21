let templateCard = document.querySelector('#template')
let templatePost = document.querySelector('#templatePost')
let fragment = document.createDocumentFragment()


async function getData(endpoint) {
    let rawData = await fetch (`https://jsonplaceholder.typicode.com/${endpoint}`)
    let data = await rawData.json()
    
    return data
}

; (async () => {
    let users = await getData('users')
    function render (arr, where) {
        arr.forEach(user => {
            let newCard = templateCard.content.cloneNode(true)
            
            newCard.querySelector('.card__layer').dataset.uid = user.id
            newCard.querySelector('.card__id').textContent = user.id
            newCard.querySelector('.card__name').textContent = user.name
            newCard.querySelector('.card__email').textContent = ('Email: ' + user.email)
            newCard.querySelector('.card__city').textContent = ('Country: ' + user.city)
            newCard.querySelector('.card__companyName').textContent = ('Company: ' + user.company)
            newCard.querySelector('.card__website').textContent = ('Website: ' + user.website)
            newCard.querySelector('.card__phone').textContent = ('Phone: ' + user.phone)
            
            
            fragment.append(newCard)
        });
        where.append(fragment)
    }
    render(users,  userWrap)
    
    
    //for rendering single user ||event delegation
    let idStorage = null
    userWrap.addEventListener('click', async event => {
        if (event.target.dataset.type == 'card') {
            let userId = event.target.dataset.uid
            
            if (userId !== idStorage) {
                idStorage = userId
                console.log('ezildi' + userId);            
            }

            
            
            
            let post =  await getData(`users/${userId}/posts`)
            
            
            post.forEach (item => {
                console.log(item);
                
                let newPost = templatePost.content.cloneNode(true)
                // newPost.querySelector('.cardPost__layer').dataset.pid = item.id
                newPost.querySelector('.card__id').textContent = item.userId
                newPost.querySelector('.card__title').textContent = item.title
                newPost.querySelector('.card__body').textContent = item.body
                
                fragment.append(newPost)
                
                let userId = event.target.dataset.uid
                let clickedPost = item.userId

                if (!userId == clickedPost) {
                    newPost.remove()
                }
            });

            
            postWrap.append(fragment)
        }
    })
}) ()

