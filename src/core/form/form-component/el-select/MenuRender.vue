<script setup lang="ts">

</script>

<template>
<div class="icon-container">
  <Memo class="icon" />
  <div class="description">选择框</div>
</div>
</template>

<style scoped lang="scss">
.icon-container{
  display: flex;
  cursor: pointer;
  padding: 10px 5px;
  width: 7rem;
  background: #f6f7ff;
  border: 1px solid #f6f7ff;
  border-radius: 5px;
  &:hover{
    border: 1px dashed #ccc;
  }
  .icon{
    width: 15px;
    margin-right: 5px;
  }
  .description{
    line-height: 20px;
  }
}
</style>
