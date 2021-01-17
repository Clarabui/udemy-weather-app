console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let location = search.value;
  let url = '/weather?address=' + location

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ''

  fetch(url).then(response => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = ''
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.data
      }
    })
  })
})