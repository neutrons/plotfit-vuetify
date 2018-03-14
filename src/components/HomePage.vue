<template>
<v-layout row wrap class='home-container'>

  <!-- Documentation Menu -->
  <v-flex xs12 mb-3>
    <v-subheader>
      <div class='headline'>Documentation</div>
    </v-subheader>
    <v-layout row wrap>
      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>fa-book</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Guide</h3>
              <div>Brief run-through of application.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>fa-question</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>FAQs</h3>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>


  <!-- SANS Menu -->
  <v-flex xs12 mb-3>
    <v-subheader>
      <div class='headline'>SANS</div>
    </v-subheader>
    <v-layout row wrap>
      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/SANS/Browse' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>search</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Browse Data</h3>
              <div>Quickly plot data and tag files.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/SANS/Fit' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>trending_up</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Graph Data</h3>
              <div>Plot multiple files and perform fits: Linear, Guinier, Porod, etc.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/SANS/Stitch' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>timeline</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Stitch Data</h3>
              <div>Plot multiple files and stitch two or more lines together.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/SANS/SANS2D' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>dashboard</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Plot 2D</h3>
              <div>Create 2D hexbin plots.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>

  <!-- TAS Menu -->
  <v-flex xs12 mb-3>
    <v-subheader>
      <div class='headline'>TAS</div>
    </v-subheader>
    <v-layout row wrap>
      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/TAS/Browse' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>search</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Browse Data</h3>
              <div>Quickly plot data and tag files.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/TAS/Fit' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>trending_up</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Graph Data</h3>
              <div>Plot multiple files and perform fits: Linear, Gaussian, and Lorentzian.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md2 pa-1>
        <v-card height='100%' hover ripple exact to='/TAS/Combine' dark>
          <v-card-media class='pa-0 pb-3'>
            <v-avatar tile class='primary icon-size'>
              <v-icon x-large dark>merge_type</v-icon>
            </v-avatar>
          </v-card-media>

          <v-card-title class='pt-0'>
            <div>
              <h3 class='headline'>Combine Data</h3>
              <div>Plot and combine multiple files.</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>

</v-layout>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style lang='scss' scoped>
.home-container {
  position: absolute !important;
  top: 15px;
  left: 25px;
}

.card .avatar {
  box-shadow:inset 0 0 0 99999px rgba(255, 255, 255, 0.2);
}

.card:hover .avatar {
  box-shadow:inset 0 0 0 99999px rgba(255, 255, 255, 0);
}

.icon-size {
  width: 100% !important;
  height: 65px !important;
}
</style>