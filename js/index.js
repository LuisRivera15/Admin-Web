const user = JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', () => {
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})

const consultar = document.querySelector('#consultarInfo')

if (consultar) {
    consultar.addEventListener('click', async () => {
        const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/companyInformation", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const info = await response.json();

        const vision = document.getElementById('vision')
        const mision = document.getElementById('mision')
        const nosotros = document.getElementById('nosotros')
        const mensajeBienvenida = document.getElementById('mensajeBienvenida')

        vision.value = info[0].Vision
        mision.value = info[0].Mission
        nosotros.value = info[0].About
        mensajeBienvenida.value = info[0].Welcome

        console.log(info)
    })
}

const guardar = document.querySelector('#guardar')

if (guardar) {
    guardar.addEventListener('click', async () => {
        const vision = document.getElementById('vision').value
        const mision = document.getElementById('mision').value
        const nosotros = document.getElementById('nosotros').value
        const mensajeBienvenida = document.getElementById('mensajeBienvenida').value

        const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/companyInformation", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

        const info = await response.json();

        const data = {
            Vision: vision,
            Mission: mision,
            About: nosotros,
            Welcome: mensajeBienvenida,
            Id: info[0].Id
        }

        const response2 = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/companyInformation/update", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });

        const info2 = await response2.json();

        console.log(info2)

        alert('Información actualizada correctamente')
    })
}

