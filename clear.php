<?php

for ($i=1; $i < 5; $i++) {
  setcookie('item-'.$i, "", 1);
}

echo "<script>localStorage.clear();</script><h1>Cache cleared</h1><br><a href='/'>Home</a>";

 ?>
