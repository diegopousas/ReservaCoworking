<template>
  <div id="welcomeText">
    <p>Bem vindo ao portal de reserva do Coworking Demarco !</p>
    <p>
      Antes de realizar sua reserva você precisa estar devidamente cadastrado.
    </p>
    <p>Se você nunca esteve em nossa casa, logo abaixo segue o endereço.</p>
    <div id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.543808311484!2d-43.96422372796866!3d-19.859246395228823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690665908fa11%3A0xbe08693649539536!2sCoworking%20Demarco!5e0!3m2!1spt-BR!2sbr!4v1694538781021!5m2!1spt-BR!2sbr" width="700" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcomePage",
};
</script>

<style scoped>
#welcomeText {
  text-align: center;
  margin-top: 30px;
  font-family: "Poppins", sans-serif;
}

#map {
    margin-top: 50px
}

</style>
