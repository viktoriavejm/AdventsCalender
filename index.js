function getImgs() {
    fetch(`./api/adventKalender.php`)
    .then((response) => response.json())
    .then((data) =>{

        console.log(data); // optional logging

        document.getElementById('home_content_info').style.display = 'none'

        if(data.code == 200) {
            let stringValue = ""
            stringValue += "<div id='home_numbers'>"
            for (let i = 1; i < 25; i++) {
                stringValue += `<img onclick=getIdDoor(${i}) id="door${i}" class='image' src="./imgs/Nummer${i}.png">`
            }
            stringValue += "</div>"
            console.log
            document.getElementById('home_content').innerHTML = stringValue;                    
            
        } else {
            document.querySelector('#home_content_info').innerHTML = "<h2>Fehler beim Laden der Türchen</h2>";
        }
       
    })
    .catch((error)=>{
        console.log(error);
    })
}


getImgs()

function getIdDoor(id) {
    fetch(`./api/adventKalender.php?id=${id}`)
    .then((response) => response.json())
    .then((data) =>{

        console.log(data); // optional logging

        document.getElementById('home_content_info').style.display = 'grid'

        if(data.code == 200) {
            let stringValue = "";
                stringValue += `
                <div class="doors">
                <div class="info_box">
                <div class="info_left">
                    <img onclick="exitInfo()" id="exit" src="./imgs/x.svg" alt="exit">
                    <h3>Du hast: ${data.videos[0].name} gefunden</h3>
                    <p>Hier ist ein kurzes Video zum erinnern!</p>
                    <p>${data.videos[0].description}</p>
                

                    <div onclick="addToFav(${id})" class="home_main_fav"><button>Add to Favorites</button></div>
                </div>
                <div class="info_right">
                    <iframe width="560" height="315" 
                    src="${data.videos[0].youtube_link}" 
                    title="YouTube video player" frameborder="0" web-share" 
                    allowfullscreen></iframe>
                <div>
                </div>    
                </div>
                    `

            document.getElementById(`door${id}`).style.opacity = 0.5        

            document.getElementById('home_content_info').innerHTML = stringValue;
            
        } else {
            document.querySelector('#home_content_info').innerHTML = "<h2>Fehler beim Laden des Türchens</h2>";
        }
       
    })
    .catch((error)=>{
        console.log(error);
    })
}

function addToFav(id) {
    let favoritesA = JSON.parse(localStorage.getItem('Adventskalenderfavs')) || [];
  
    // Check if the spell is already a favorite
    if (!favoritesA.includes(id)) {
      favoritesA.push(id);
      localStorage.setItem('Adventskalenderfavs', JSON.stringify(favoritesA));
    }
}

async function showFavs(){
    document.getElementById('home_content_info').style.display = 'none';
    document.getElementById('home_content').style.display = 'none';
    document.getElementById('favorites').style.display = 'grid';

    let favoritesS = JSON.parse(localStorage.getItem('Adventskalenderfavs')) || [];    
      if (favoritesS.length === 0) {
        document.getElementById("favorites").innerHTML = `
        '<button onclick="backToNumbers()">Back</button>
        <p>No favorite videos added yet!</p>`;
        return;
      }
        let favoritesString = '<button id="backToAll" onclick="backToNumbers()">Back</button>'
        favoritesString += "<div id='favs-wrapper'>";
      
    
      // Load each favorite video from API
      await Promise.all(favoritesS.map(async (id) => {
        try {
          let response = await fetch(`./api/adventKalender.php?id=${id}`);
          let data = await response.json();
    
          if (data.code === 200) {
            favoritesString += `
            <div class="fav_box">
                <div class="fav_left">
                    <h3>${data.videos[0].name}</h3>
                    <p>Hier ist ein kurzes Video zum erinnern!</p>
                    <p>${data.videos[0].description}</p>
                

                    <div onclick="addToFav(${id})" class="home_main_fav"><button>Add to Favorites</button></div>
                </div>
                <div class="fav_right">
                    <iframe width="560" height="315" 
                    src="${data.videos[0].youtube_link}" 
                    title="YouTube video player" frameborder="0" web-share" 
                    allowfullscreen></iframe>
                </div>
                </div> 
                    
            `;
          } else {
            console.error("Error by loading Video:", data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }));
    
      favoritesString += "</div>";

    document.getElementById('favorites').style.display = 'grid';
      // Display all favorite spells in the favorites section
      document.getElementById("favorites").innerHTML = favoritesString;
      

    
}

function getdate() {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth() + 1;
    let y = today.getFullYear();
    
    let dmy = d + "." + m + "." + y;

    document.getElementById('dateee').innerHTML = dmy;
}

getdate()

let audio = new Audio('./sound.mp3');

function playMusik() {
    audio.play();
}

function pauseMusik() {
    audio.pause();
}

function backToNumbers() {
    document.getElementById('home_content_info').style.display = 'none';
    document.getElementById('home_content').style.display = 'grid';
    document.getElementById('favorites').style.display = 'none';
}

function exitInfo() {
    document.getElementById('home_content_info').style.display = 'none';
}

