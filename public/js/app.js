const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const sendLocationButton = document.querySelector('#send-location')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading...."
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
sendLocationButton.addEventListener('click', () => {
    messageOne.textContent="Loading..."
    if (!navigator.geolocation) {
        return console.log('Geolocation is not supported by browser')
    }
    sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/weather?lat=' + encodeURIComponent(position.coords.latitude) + '&long=' + encodeURIComponent(position.coords.longitude)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
        //     socket.emit('sendLocation', {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude
        //     }, () => {
        //         console.log('Location delivered')
        //         sendLocationButton.removeAttribute('disabled')
    })
})
