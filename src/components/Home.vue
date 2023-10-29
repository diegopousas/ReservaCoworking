<template>
  <div id="welcomeText">
    <p>Bem vindo ao portal de reserva do Coworking Demarco.</p>
    <p>Antes de realizar sua reserva você precisa estar devidamente cadastrado.</p>
    <p>Se você nunca esteve em nossa casa, logo abaixo segue o endereço.</p>
    <div id="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.4748623784803!2d-43.97079874550728!3d-19.862160723184136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69058e967ec09%3A0x2ed0732c3ba8b4f2!2sAv.%20Ant%C3%B4nio%20Abrah%C3%A3o%20Caram%2C%20820%20-%20S%C3%A3o%20Jos%C3%A9%2C%20Belo%20Horizonte%20-%20MG%2C%2031275-000!5e0!3m2!1spt-BR!2sbr!4v1695728454497!5m2!1spt-BR!2sbr" width="700" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcomePage",
};
</script>

<style scoped>

@media(max-width: 990px) {
  #welcomeText {
    text-align: center;
    margin-top: 30px;
    font-family: "Poppins", sans-serif;
  }
  
  #map {
      margin-top: 50px
  }
}
#welcomeText {
  text-align: center;
  margin-top: 30px;
  font-family: "Poppins", sans-serif;
}

#map {
    margin-top: 50px
}
</style>
