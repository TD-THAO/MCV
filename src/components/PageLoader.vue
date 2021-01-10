<template>
  <div class="page-loader">
    <div class="page-loader__wrp">
      <div class="lds-css ng-scope">
        <div class="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  //
};
</script>

<style lang="scss">

$color1: rgba(149, 104, 213, .77);
$color2: #6114ce;
$black: #000;

.page-loader {
  position: absolute;
  z-index: 9999999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .6);
}

.page-loader__wrp {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

.lds-double-ring {
  position: relative;
  margin: 10px auto;
}

.lds-double-ring div {
  position: absolute;
  width: 160px;
  height: 160px;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  border: 6px solid $black;
  border-color: $color2 transparent;
  -webkit-animation: lds-double-ring 1s linear infinite;
  animation: lds-double-ring 1s linear infinite;
}

.lds-double-ring div:nth-child(2) {
  width: 144px;
  height: 144px;
  top: 28px;
  left: 28px;
  border-color: transparent $color1;
  -webkit-animation: lds-double-ring_reverse 1s linear infinite;
  animation: lds-double-ring_reverse 1s linear infinite;
}

.lds-double-ring {
  width: 50px !important;
  height: 50px !important;
  -webkit-transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
  transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
}

</style>
