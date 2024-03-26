const filter = document.querySelector('#filter');
const list = document.querySelector('#list');
let VERBS = [];

async function start() {
    // list.innerHTML = 'Loading...';
    try {
        const resp = await fetch('data.json');
        // console.log(resp)
        const data = await resp.json();
        // console.log(data)
        VERBS = data;
        
    } catch(err) {
        list.style.color = "red";
        list.innerHTML = err.message;
    }
};

start();




filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase();
    if (value.trim() === '') {
        // If the input field is empty, do not render any data
        list.innerHTML = '';
    } else {
        const filteredVerbs = VERBS.filter((verb) => {
            return verb.infinitive.toLowerCase().includes(value);
        });
        render(filteredVerbs);
    }
});




// filter.addEventListener('input', (event) => {
//     const value = event.target.value.toLowerCase();
//     const filteredVerbs = VERBS.filter((verb) => {
//         return verb.infinitive.toLowerCase().includes(value);
//     });
//     render(filteredVerbs);
// });

function render(verbs = []) {
    if(verbs.length === 0) {
        list.innerHTML = 'No results';
    } else {
        const html = verbs.map(toHTML).join('');
        list.innerHTML = html;
        
    } 
}

function toHTML(verb) {
    return `
        <li class="list-group-item">${verb.infinitive}-${verb.past_simple}-${verb.past_participle}</li>
    `
}

