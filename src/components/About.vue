<template>
  <v-layout>
    <v-flex xs12>
      <v-layout>
        <v-flex xs12 md10 offset-md1>
          <h4 class="primary--text mt-2 mb-5">Sobre o Ice Scream</h4>
        </v-flex>        
      </v-layout>
      <v-layout row wrap mb-5>
        <v-flex xs12 md1 offset-md1 class="text-xs-center">
          <img src="../../static/logo.png" alt="IceScreamerLogo" id="icescreamerLogo" class="mb-5">
        </v-flex>
        <v-flex xs12 md9 offset-md1>
          <p>
            A brincadeira sobre devedores de sorvete já existia antes da construção do software. <br>
            Foi quando a equipe do Centro de Estudos Dart se propôs a planejar e desenvolver um software para controle, de forma voluntária, com muita dedicação os integrantes construíram esta aplicação, o Ice Scream.
          </p>
          <p>Integrantes que participaram da construção do software:</p>
          <v-layout row>
            <v-flex xs6>
              <span class="primary--text">Analista de Requisitos</span>
              <ul class="mb-3">
                <li>Júnior Miquelin</li>
              </ul>
              <span class="primary--text">Analista de Testes</span>
              <ul class="mb-3">
                <li>Carol Perez</li>
                <li>Silvia Rodrigues</li>
              </ul>
              <span class="primary--text">Arquiteto</span>
              <ul class="mb-3">
                <li>Gabriel Bonacim</li>
              </ul>
              <span class="primary--text">Desenvolvedor Backend</span>
              <ul class="mb-3">
                <li>Gabriel Bonacim</li>
                <li>João Costa</li>
                <li>Reginaldo Botelho</li>
              </ul>
            </v-flex>
            <v-flex xs6>
              <span class="primary--text">Desenvolvedor Frontend</span>
              <ul class="mb-3">
                <li>Hugo de Moraes</li>
              </ul>
              <span class="primary--text">Gerente de Contratos</span>
              <ul class="mb-3">
                <li>Carol Perez</li>
              </ul>
              <span class="primary--text">Gerente de Negócios</span>
              <ul class="mb-3">
                <li>Ricardo Figueiredo</li>
              </ul>
              <span class="primary--text">Gerente de Projetos</span>
              <ul>
                <li>Fernanda Neves</li>
                <li>Reginaldo Botelho</li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="text-xs-center">
          <img src="../../static/logo_ced.png" alt="CED" height="280px">
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
