<template>
  <div :class="'warn'">
    <h2>Внимание!</h2>
    <p :class="'warn-body'">Элемент <strong><i><slot></slot></i></strong> будет удален!</p>
    <div :class="['warn-btn-box']">
      <button :id="'decline'" @click="$emit('decline')">Отмена</button>
      <button :id="'confirm'"
        @click="$emit('confirm')"
      >Подтвердить</button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

button {
  display: inline;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

#confirm, #decline {
  width: 50%;
  float: left;
}

#decline {
  background-color: #ccc;
  color: black;
}

#confirm {
  background-color: #f44336;
}

.warn {
  position: relative;
  background: rgb(255, 255, 255);
  width: 40%;
  margin: auto;
  animation-name: slide-from-top;
  animation-duration: .5s;
  padding: 1em;
  text-align: center;
}

.warn-body {
  padding: .5em;;
}
.warn-btn-box {
  width: 100%;
  background-color: inherit;
  border-top: 1px solid grey;
  padding: .3em 0;
}

.warn-btn-box::after {
  content: "";
  clear: both;
  display: table;
}

@keyframes slide-from-top {
    from { top: -400px }
    to { top: 0; }
}

@media only screen and (max-width: 600px) {
  .warn {
    width: 80%;
  }
}
</style>
