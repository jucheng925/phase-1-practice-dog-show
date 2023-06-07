document.addEventListener('DOMContentLoaded', () => {
    fetchDog()
})

function fetchDog(){
    fetch("http://localhost:3000/dogs")
    .then (resp => resp.json())
    .then (data => data.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
    const tr = document.createElement("tr")
    tr.innerHTML = `
     <td>${dog.name}</td>
     <td>${dog.breed}</td>
     <td>${dog.sex}</td>
     <td><button>Edit</button></td>`
    tr.querySelector("button").addEventListener("click", ()=>handleEdit(dog))
    document.querySelector("#table-body").append(tr)
}

function handleEdit(dog) {
    const form = document.querySelector("form")
    form.children[0].value = dog.name
    form.children[1].value = dog.breed
    form.children[2].value = dog.sex
    form.addEventListener("submit", (event)=> {
        event.preventDefault()
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({
                "name": `${event.target.name.value}`,
                "breed": `${event.target.breed.value}`,
                "sex": `${event.target.sex.value}`
            }),
        })
        .then(resp => resp.json())
        .then(data => fetchDog())
        document.querySelector("#table-body").textContent= ""
    })
}